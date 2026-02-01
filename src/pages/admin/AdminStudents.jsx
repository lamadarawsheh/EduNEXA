import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from './components/dashboardComponents/PageHeader';
import Table from './components/dashboardComponents/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStudents } from "../../ReduxToolkit/slices/AdminStudents"
import { fetchAdminProfile } from '../../ReduxToolkit/slices/AdminProfile';
import { SpinnerCustom } from '../../utils/Spinner';

export default function AdminStudents() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ key: "userName", direction: "asc" });

  const dispatch = useDispatch();
  const { studentsData, isLoading, error } = useSelector(
    (state) => state.adminStudents ?? { studentsData: [], isLoading: false, error: null }
  );
  const { profileData, isLoading: profileLoading, error: profileError } = useSelector(
    (state) => state.adminProfile
  )

  useEffect(() => {
    dispatch(fetchAdminStudents());
    dispatch(fetchAdminProfile());
  }, [dispatch]);

  useEffect(() => {
    if (studentsData.length > 0) {
      setRecords(studentsData);
    }
  }, [studentsData]);


  const processedRecords = useMemo(() => {
    const data = Array.isArray(studentsData) ? [...studentsData] : [];

    const q = search.trim().toLowerCase();
    let result = !q
      ? data
      : data.filter((s) => {
        const userName = (s.userName ?? "").toLowerCase();
        const email = (s.email ?? "").toLowerCase();
        const phone = (s.phoneNumber ?? "").toLowerCase();
        return (
          userName.includes(q) ||
          email.includes(q) ||
          phone.includes(q)
        );
      });


    const { key, direction } = sortBy || {};
    const dir = direction === "desc" ? -1 : 1;

    const getVal = (s) => {
      const v = s?.[key];
      return v == null ? "" : String(v);
    };
    result.sort((a, b) => {
      const av = getVal(a).toLowerCase();
      const bv = getVal(b).toLowerCase();

      return av.localeCompare(bv) * dir;
    });
    return result;
  }, [studentsData, search, sortBy]);

  useEffect(() => {
    setRecords(processedRecords);
  }, [processedRecords]);


    if (isLoading) return <div className='flex min-h-screen  justify-center items-center gap-4'><SpinnerCustom className={"text-[#176D69]"} /><p className='text-3xl text-[#176D69] animate-bounce'> Loading... </p></div> ;
    if (error) return <div className='flex min-h-screen  justify-center items-center gap-4'><p className={"text-[#176D69]"} /><p className='text-4xl text-[#176D69] animate-bounce'>{typeof error === "string" ? error : "Failed"}</p></div>;

  return (
    <div className="p-2 md:p-8 flex-col">
      <PageHeader pageName="Students Records" input={search} 
        onChange={setSearch} admin={profileData}
        placeholder="Search by Name, Email or Number" />
      <Table records={processedRecords} columns={["Student Name", "Email", "Phone", "Date of Birth"]} isFilter={"hidden"} sortBy={sortBy}
        onSortChange={setSortBy} sortKey="userName" pageName="Students Records" />
    </div>
  )
}
