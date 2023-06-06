import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Sidebar from "parts/Sidebar";
import ListClassItem from "parts/ListClassItem";

import courses from "constants/api/courses";

import Loading from "parts/Loading";

import {
  statusCourses,
  fetchCourses,
  messageCourse,
} from "store/actions/courses";

function EmptyState() {
  return (
    <section className="relative z-50 flex items-center h-screen bg-white">
      <div className="w-full py-12 mx-auto text-center sm:w-5/12">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/illustration-myclass-empty.jpg`}
          alt="Success join class"
        />
        <h1 className="mt-12 text-3xl text-gray-900">Time to Invest</h1>
        <p className="mx-auto mt-4 mb-8 text-lg text-center text-gray-600">
          It seems you don’t have any class yet so let’s get them and grow your
          skills
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 mt-5 text-white transition-all duration-200 bg-orange-500 shadow-inner hover:bg-orange-400 focus:outline-none"
          href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}
        >
          Cari Kelas
        </a>
      </div>
    </section>
  );
}

export default function MyClass() {
  const dispatch = useDispatch();
  const COURSES = useSelector((state) => state.courses);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(statusCourses("loading"));
    courses
      .mine()
      .then((res) => {
        console.log(res);
        dispatch(fetchCourses(res.data));
      })
      .catch((err) => {
        dispatch(messageCourse(err?.response?.data?.message ?? "error"));
      });
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-4 sm:px-16 ">
          {COURSES.status === "loading" && <Loading></Loading>}
          {COURSES.status === "error" && COURSES.message}
          {COURSES.status === "ok" &&
            (COURSES.total > 0 ? (
              <>
                <section className="flex flex-col pl-12 mt-8 sm:pl-0">
                  <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
                    My Class
                  </h1>
                  <p className="text-sm text-gray-600 sm:text-lg">
                    Continue learning to pursue your dreams
                  </p>
                </section>
                <section className="flex flex-col mt-8">
                  <div className="flex flex-wrap items-center justify-start -mx-4">
                    {Object.values(COURSES.data)?.map?.((item, index) => {
                      return (
                        <ListClassItem
                          data={item.course}
                          key={index}
                        ></ListClassItem>
                      );
                    })}
                  </div>
                </section>
              </>
            ) : (
              <EmptyState></EmptyState>
            ))}
        </div>
      </main>
    </div>
  );
}
