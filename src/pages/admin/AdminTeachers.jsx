import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from './components/dashboardComponents/PageHeader';
import Table from './components/dashboardComponents/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminTeachers } from '../../ReduxToolkit/slices/AdminTeachers';
import { SpinnerCustom } from '../../utils/Spinner';
import { fetchAdminProfile } from '../../ReduxToolkit/slices/AdminProfile';
import UsePagination from './components/dashboardComponents/UsePagination';
import Pagination from './components/dashboardComponents/Pagination';

export default function AdminTeachers() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ key: "fullName", direction: "asc" });
  const dispatch = useDispatch()
  const { teachersData, isLoading, error } = useSelector(
    (state) => state.adminTeachers ?? { teachersData: [], isLoading: false, error: null }
  )
      const {profileData, isLoading: profileLoading, error: profileError} = useSelector(
        (state)=> state.adminProfile
    )

  useEffect(() => {
    dispatch(fetchAdminTeachers());
    dispatch(fetchAdminProfile())
  }, [dispatch]
  )
 

  const processedRecords = useMemo(() => {
    const data = Array.isArray(teachersData) ? [...teachersData] : [];

    const q = search.trim().toLowerCase();
    let result = !q
      ? data
      : data.filter((s) => {
        const fullName = (s.fullName ?? "").toLowerCase();
        const email = (s.email ?? "").toLowerCase();
        const phone = (s.phoneNumber ?? "").toLowerCase();
        return (
          fullName.includes(q) ||
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
  }, [teachersData, search, sortBy]);
const { page, totalPages, currentItems, goTo, reset } = UsePagination(processedRecords, 12);

useEffect(() => {
  reset();
}, [search, sortBy]);
    if (isLoading) return <div className='flex min-h-screen  justify-center items-center gap-4'><SpinnerCustom className={"text-[#176D69]"} /><p className='text-3xl text-[#176D69] animate-bounce'> Loading... </p></div> ;
    if (error) return <div className='flex min-h-screen  justify-center items-center gap-4'><p className={"text-[#176D69]"} /><p className='text-4xl text-[#176D69] animate-bounce'>Error: {typeof error === "string" ? error : "Failed"}</p></div>;

  return (
    <div className="p-2 md:p-8 flex-col">
      <PageHeader pageName="Teachers Records" input={search}
        onChange={setSearch}  admin={profileData}
        placeholder="Search by Name, Email or Course"/>
      <Table records={currentItems} columns={["Teacher Name", "Email", "Specialization", "Rate", "No of Courses"]} noOfCourses={"Courses"} pageName="Teachers Records" sortBy={sortBy}
        sortKey="fullName" onSortChange={setSortBy} />
      <Pagination page={page} totalPages={totalPages} onPageChange={goTo} />
    </div>
  )
}

