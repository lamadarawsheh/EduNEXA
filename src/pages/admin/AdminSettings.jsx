import React, { useEffect } from 'react'
import PageHeader from './components/dashboardComponents/PageHeader'
import Settings from './components/settings/Settings'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile } from "../../ReduxToolkit/slices/AdminProfile";

export default function AdminSettings() {
      const dispatch = useDispatch();
      const {profileData, isLoading: profileLoading, error: profileError} = useSelector(
        (state)=> state.adminProfile
      )
    useEffect(() => {
    dispatch(fetchAdminProfile());
    }, [dispatch]);
      if ( profileLoading) return <h2>Loading...</h2>;
      if ( profileError) return <h2>Error: {profileError || "Failed"}</h2>;
    return (
    <>
      <div className="p-2 md:p-8 flex-col">
        <PageHeader pageName="Settings" admin={profileData} />
        <div className="rounded-xl border border-gray-200 bg-white my-6 p-4 w-[100%] ">
          <Settings admin={profileData}/>
        </div>

      </div>
    </>
  )
}
