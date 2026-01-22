import React, { useState } from 'react'
import PageHeader from './components/studentComponents/PageHeader';
import Table from './components/studentComponents/Table';

export default function AdminTeachers() {
  const [records, setrecord] = useState([
    {
      id: "S-1001",
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      specialization: "Computer Science",
      rate: "4.5",
      noOfCourses: 2,
      avatar: "",
    },
    {
      id: "S-1002",
      name: "Mona Hassan",
      email: "mona@example.com",
      specialization: "Mathematics",
      rate: "4.2",
      noOfCourses: 2,
      password: "mona@2025",
      avatar: "",
    }, {
      id: "S-1003",
      name: "Youssef Samy",
      email: "youssef@example.com",
      specialization: "Physics",
      rate: "4.0",
      noOfCourses: 1,
      avatar: "",
    }, ...Array.from({ length: 10 }, (_, i) => ({
      id: `S-${2000 + i}`,
      name: `Teacher ${i + 1}`,
      email: `student${i + 1}@example.com`,
      specialization: `Specialization ${i + 1}`,
      rate: `4.${i % 10}`,
      noOfCourses: i % 5,
      avatar: "",
    })),
  ]);
  return (
    <div className="p-2 md:p-8 flex-col">
      <PageHeader pageName="Teachers Records" />
      <Table records={records} columns={["Teacher Name", "Email", "Specialization", "Rate", "No of Courses"]} noOfCourses={"Courses"} pageName="Teachers Records" />
    </div>
  )
}

