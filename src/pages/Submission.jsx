
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Sidebar from "parts/Sidebar";
import SubmissionForm from "parts/SubmissionForm";


export default function Submission() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
              Submission
            </h1>
            <p className="text-sm text-gray-600 sm:text-lg">
              kirim tugas anda disini
            </p>
          </section>
          <SubmissionForm></SubmissionForm>
        </div>
      </main>
    </div>
  )
}
