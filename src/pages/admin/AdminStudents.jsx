import React, { useState } from 'react'
import PageHeader from './components/studentComponents/PageHeader';
import Table from './components/studentComponents/Table';

export default function AdminStudents() {
  const [records, setRecords] = useState([
    {
      id: "S-1001",
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "+201012345678",
      dob: "2001-05-14",
      password: "ahmed123",
      avatar: "",
    },
    {
      id: "S-1002",
      name: "Mona Hassan",
      email: "mona@example.com",
      phone: "+201122223333",
      dob: "2002-11-02",
      password: "mona@2025",
      avatar: "",
    }, {
      id: "S-1003",
      name: "Youssef Samy",
      email: "youssef@example.com",
      phone: "+201299998888",
      dob: "2000-01-23",
      password: "y0ussef!",
      avatar: "",
    }, ...Array.from({ length: 10 }, (_, i) => ({
      id: `S-${2000 + i}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      phone: `+20100000${String(1000 + i)}`,
      dob: `200${i % 10}-0${(i % 9) + 1}-1${i % 9}`,
      password: `pass${i + 1}`,
      avatar: "",
    })),
  ]);
  return (
    <div className="p-2 md:p-8 flex-col">
      <PageHeader pageName="Students Records" />
      <Table records={records} columns={["Student Name", "Email", "Phone", "Date of Birth"]} pageName="Students Records" />
    </div>
  )
}
