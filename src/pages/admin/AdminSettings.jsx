import React, { useEffect } from 'react'
import PageHeader from './components/dashboardComponents/PageHeader'
import Settings from './components/settings/Settings'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile } from "../../ReduxToolkit/Slices/AdminProfile";
import { SpinnerCustom } from '../../utils/Spinner';

export default function AdminSettings() {
  const dispatch = useDispatch();
  const { profileData, isLoading: profileLoading, error: profileError } = useSelector(
    (state) => state.adminProfile
  )
  useEffect(() => {
    dispatch(fetchAdminProfile());
  }, [dispatch]);
  if (profileLoading) return <div className='flex min-h-screen  justify-center items-center gap-4'><SpinnerCustom className={"text-[#176D69]"} /><p className='text-3xl text-[#176D69] animate-bounce'> Loading... </p></div>;
  if (profileError) return <div className='flex min-h-screen  justify-center items-center gap-4'><p className={"text-[#176D69]"} /><p className='text-4xl text-[#176D69] animate-bounce'>{typeof profileError === "string" ? profileError : "Failed"}</p></div>;
  return (
    <>
      <div className="p-2 md:p-8 flex-col">
        <PageHeader pageName="Settings" admin={profileData} isSearch={"hidden"} />
        <div className="rounded-xl border border-gray-200 bg-white my-6 p-4 w-[100%] ">
          <Settings admin={profileData} />
        </div>

      </div>
    </>
  )
}
