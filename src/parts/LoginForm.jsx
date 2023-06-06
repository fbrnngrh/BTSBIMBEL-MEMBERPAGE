import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import users from "../constants/api/users";

import { toast, ToastContainer } from "react-toastify";

import { setAuthorizationHeader } from "../configs/axios";

import { populateProfile } from "../store/actions/users";

import useForm from "helpers/hooks/useForm";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [{ email, password }, setState] = useForm({
    email: "",
    password: "",
  });

  function submit(e) {
    e.preventDefault();

    users
      .login({ email, password })
      .then((res) => {
        console.log(res);
        setAuthorizationHeader(res.data.token);
        users.details().then((detail) => {
          dispatch(populateProfile(detail.data));

          const production =
            process.env.REACT_APP_FRONTPAGE_URL ===
            "https://bts-bimbel.vercel.app"
              ? "Domain = bts-bimbel.vercel.app; Secure; SameSite=None"
              : "";
          localStorage.setItem(
            "BTSBIMBEL:token",
            JSON.stringify({
              ...res.data,
              email: email,
            })
          );

          const redirect = localStorage.getItem("BTSBIMBEL:redirect");
          const userCookie = {
            name: detail.data.name,
            thumbnail: detail.data.avatar,
          };

          const expires = new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          );

          document.cookie = `BTSBIMBEL:user=${JSON.stringify(
            userCookie
          )}; expires=${expires.toUTCString()}; path:/; ${production}`;

          navigate(redirect || "/");
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(
          {
            message: err.response.data.message,
          }
        );
      });
  }

  return (
    <div className="flex items-center justify-center pb-24">
      <div className="w-full sm:w-3/12">
        <h1 className="mb-6 text-4xl text-gray-900">
          <span className="font-bold">Continue</span> Study, <br />
          Finish your <span className="font-bold">Goals</span>
        </h1>
        <form onSubmit={submit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 text-lg">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              onChange={setState}
              className="w-1/2 w-full px-6 py-3 bg-white border border-gray-600 l focus:outline-none focus:border-secondary"
              value={email}
              placeholder="Your email address"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2 text-lg">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={setState}
              className="w-1/2 w-full px-6 py-3 bg-white border border-gray-600 focus:outline-none focus:border-secondary"
              value={password}
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 text-white transition-all duration-200 shadow-inner bg-secondary hover:bg-red-300 focus:outline-none"
          >
            Masuk
          </button>
          <ToastContainer />
        </form>
      </div>

      <div className="hidden w-1/12 sm:block"></div>

      <div className="justify-end hidden w-5/12 pt-24 pr-16 sm:block">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute left-0 -mt-8 -ml-16 border-2 border-secondary"
            style={{ width: 324, height: 374 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img
              src="/assets/images/tamara caem.jpg"
              alt="Mbak tamara caem juga"
            />
          </div>
          <div
            className="absolute bottom-0 right-0 z-10 px-4 py-3 -mr-12 bg-white"
            style={{ width: 290 }}
          >
            <p className="mb-2 text-gray-900">
              Metode belajar yang santai seperti nonton drakor di Netflix
            </p>
            <span className="text-gray-600">Alyssa, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
