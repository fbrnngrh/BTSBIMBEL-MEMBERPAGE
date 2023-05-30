import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../parts/Sidebar";

import formatThousand from "../helpers/formatThousand";
import formatDate from "../helpers/formatDate";

import orders from "../constants/api/orders";

import Loading from "../parts/Loading";
import Congratulation from "../parts/Congratulation";
import EmptyState from "../parts/EmptyState";

import { statusOrders, fetchOrders, messageOrder } from "../store/actions/orders";

export default function Transactions() {
  const dispatch = useDispatch();
  const ORDERS = useSelector((state) => state.orders);

  const location = useLocation();

  const params =
    location?.search.length > 0 &&
    location?.search
      ?.substring(1, location.length)
      ?.split?.("&")
      ?.reduce?.((acc, item) => {
        const [key, value] = item.split("=");
        acc[key] = value;
        return acc;
      }, {});

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(statusOrders("loading"));
    orders
      .all()
      .then((res) => {
        console.log(res);
        dispatch(fetchOrders(res.data));
      })
      .catch((err) => {
        dispatch(messageOrder(err?.response?.data?.message ?? "error"));
      });
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          {ORDERS.status === "loading" && <Loading />}
          {ORDERS.status === "error" && ORDERS.message}
          {ORDERS.status === "ok" &&
            (params.order_id ? (
              <Congratulation data={ORDERS.data[params.order_id]} />
            ) : ORDERS.total > 0 ? (
              <>
                <section className="flex flex-col pl-12 mt-8 sm:pl-0">
                  <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
                    Transactions
                  </h1>
                  <p className="text-sm text-gray-600 sm:text-lg">
                    Keep on tract what you've invested
                  </p>
                </section>
                <section className="flex flex-col flex-wrap mt-8">
                  {Object.values(ORDERS.data)?.map?.((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-wrap items-center justify-start mt-5 mb-4 -mx-4 sm:mb-6"
                      >
                        <div className="w-full px-4 sm:w-2/12">
                          <img
                            src={item?.metadata?.course_thumbnail ?? ""}
                            alt={item?.metadata?.course_name ?? "Class name"}
                          />
                        </div>
                        <div className="w-auto px-4 sm:w-3/12">
                          <h6 className="text-lg text-gray-900">
                            {item?.metadata?.course_name ?? "Class name"}
                          </h6>
                          <p className="text-gray-600">
                            {item?.metadata?.course_level ?? "Level"}
                          </p>
                        </div>
                        <div className="w-full px-4 sm:w-2/12">
                          <h6 className="text-lg text-gray-900">
                            Rp.
                            {formatThousand(item?.metadata?.course_price ?? 0)}
                          </h6>
                        </div>
                        <div className="w-auto px-4 sm:w-2/12">
                          <h6 className="text-lg text-gray-900">
                            {item?.created_at
                              ? formatDate(item?.created_at)
                              : "-"}
                          </h6>
                        </div>
                        <div className="flex justify-center w-3/12 px-4">
                          {item?.status === "pending" && (
                            <Link
                              className="px-6 py-3 mt-0 ml-4 text-white whitespace-no-wrap transition-all duration-200 bg-orange-500 hover:bg-orange-400 focus:outline-none sm:mt-4 sm:ml-0"
                              to={`/joined/${item?.course_id}`}
                            >
                              Lunasi
                            </Link>
                          )}
                          {item?.status === "success" && (
                            <Link
                              className="px-6 py-3 mt-0 ml-4 whitespace-no-wrap transition-all duration-200 bg-gray-250 hover:bg-gray-300 focus:outline-none sm:mt-4 sm:ml-0"
                              to={`/courses/${item?.course_id}`}
                            >
                              Lihat kelas
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </section>
              </>
            ) : (
              <EmptyState />
            ))}
        </div>
      </main>
    </div>
  );
}
