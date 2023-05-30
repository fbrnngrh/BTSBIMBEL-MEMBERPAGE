import React from "react";
import Sidebar from "parts/Sidebar";
import SidebarAdmin from "parts/SidebarAdmin";

function EmptyState() {
  return (
    <section className="relative z-50 flex items-center h-screen bg-white">
      <div className="w-full py-12 mx-auto text-center sm:w-5/12">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/illustration-admin.jpg`}
          alt="Success join class"
          className="w-11/12 mx-auto mb-8"
        />
        <h1 className="mt-12 text-3xl text-gray-900">Welcome Admin</h1>
        <p className="mx-auto mt-4 mb-8 text-lg text-center text-gray-600">
          You can manage all the data here
        </p>
      </div>
    </section>
  );
}

export default function DashboardAdmin() {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1">
       <div className="max-w-6xl px-4 pb-10 mx-auto sm:px-8 xl:px-0">
          <EmptyState></EmptyState>
       </div>
      </main>
    </div>
  );
}
