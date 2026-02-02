import React, { useEffect, useState} from 'react'
import PageHeader from './components/dashboardComponents/PageHeader'
import Course from './components/courses/Course'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAcceptedCourses } from '../../ReduxToolkit/slices/AdminAcceptedCourses';
import { SpinnerCustom } from './../../utils/Spinner';
import { fetchAdminProfile } from '../../ReduxToolkit/slices/AdminProfile';
import { fetchPendingCourses } from '../../ReduxToolkit/slices/AdminPendingCourses';

export default function AdminCourses() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const {profileData, isLoading: profileLoading, error: profileError} = useSelector(
          (state)=> state.adminProfile
      )
  const {acceptedCoursesData, isLoading:acceptedLoading, error: acceptedError} = useSelector(
    (state)=> state.acceptedCoursesData ??{acceptedCoursesData:[], isLoading:false, error:null}
  )
   const {pendingCoursesData, isLoading, error} = useSelector(
    (state)=> state.pendingCoursesData ??{pendingCoursesData:[], isLoading:false, error:null}
  )
  useEffect(()=>{
    dispatch(fetchAdminProfile());
    dispatch(fetchAcceptedCourses())
    dispatch(fetchPendingCourses())
  },[dispatch]);

    if (isLoading) return <div className='flex min-h-screen  justify-center items-center gap-4'><SpinnerCustom className={"text-[#176D69]"} /><p className='text-3xl text-[#176D69] animate-bounce'> Loading... </p></div> ;
    if (error) return <div className='flex min-h-screen  justify-center items-center gap-4'><p className={"text-[#176D69]"} /><p className='text-4xl text-[#176D69] animate-bounce'>Error: {typeof error === "string" ? error : "Failed"}</p></div>;
  return (
    <div className="p-2 md:p-8 flex-col">
        <PageHeader admin={profileData} placeholder="Search by Course or Instructor Name"  input={search}
        onChange={setSearch}  />
        <Course acceptedCourses ={acceptedCoursesData} pendingCourses={pendingCoursesData} search={search} />
      </div>
  )
}
