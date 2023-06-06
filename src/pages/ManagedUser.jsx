import SidebarAdmin from "parts/SidebarAdmin";
import React from "react";
import ListUser from "parts/Users/ListUser";

export default function ManagedUser() {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-bold text-gray-900 sm:text-4xl">
              Kelola User
            </h1>
          </section>
          <section className="flex flex-col mt-8">
            <ListUser></ListUser>
          </section>
        </div>
      </main>
    </div>
  );
}
