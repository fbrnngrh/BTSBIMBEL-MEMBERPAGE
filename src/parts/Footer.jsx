import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  function submit() {}

  return (
    <footer className="container px-4 mx-auto ">
      <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/6">
          <h6 className="text-white">Company</h6>
          <ul className="mt-4">
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                API Developer
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                Career
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                Our Story
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                New Soon
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/6">
          <h6 className="text-white">Student</h6>
          <ul className="mt-4">
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                Get Scholarship
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                Our Pathskills
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                All Features
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                className="text-indigo-500 hover:text-secondary hover:underline"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/6">
          <h6 className="text-white">Touch Us</h6>
          <p className="mt-4 leading-loose text-indigo-500">
            Micro Centre <br />
            Alleysi Block X No. 12 <br />
            Jakarta Selatan, Indonesia <br />
            +21 2020 5555
          </p>
        </div>
        <div className="w-full sm:w-2/6">
          <h6 className="text-white">Promotions</h6>
          <p className="mt-4 text-indigo-500">
            Submit your email for new updates
          </p>
          <form onSubmit={submit} className="flex mt-6">
            <input
              type="text"
              className="w-full px-4 py-3 bg-white border-0 focus:outline-none sm:px-6 md:w-1/2"
              placeholder="Your email addres"
            />
            <button className="px-4 py-3 text-white whitespace-no-wrap transition-all duration-200 bg-secondary shadow-inner hover:bg-red-400 focus:outline-none sm:px-6">
              Daftar Now
            </button>
          </form>
        </div>
      </div>
      <div className="pt-8 mt-8 text-center border-t border-gray-800">
        <p className="text-indigo-500">
          2023 Copyright Micro by Febrian Bayu Nugroho. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
