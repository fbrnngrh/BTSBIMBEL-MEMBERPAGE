import React from 'react'
import SidebarAdmin from 'parts/SidebarAdmin'
import ListCourse from 'parts/Course/ListCourse'

export default function ManagedCourse() {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
              Course List
            </h1>
            <p className="text-sm text-gray-600 sm:text-lg">
              Kelola semua data course
            </p>
          </section>
          <section className="flex flex-col mt-8">
            <ListCourse></ListCourse>
          </section>
        </div>
      </main>
    </div>
  )
}
