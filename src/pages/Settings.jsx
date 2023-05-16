import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import Sidebar from "../parts/Sidebar";
import SettingForm from "../parts/SettingForm";
export default function Settings() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const DETAILS = useSelector((state) => state.users);

  return (
    <div className="flex">
      <Sidebar></Sidebar>

      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
              Settings
            </h1>
            <p className="text-sm text-gray-600 sm:text-lg">
              Secure your data informations
            </p>
          </section>

          <SettingForm details={DETAILS}></SettingForm>
        </div>
      </main>
    </div>
  );
}
