import React from 'react'
import PageHeader from './components/studentComponents/PageHeader'
import Course from './components/courses/Course'

export default function AdminCourses() {
  return (
    <div className="p-2 md:p-8 flex-col">
         <PageHeader />
         <Course />
       </div>
  )
}
