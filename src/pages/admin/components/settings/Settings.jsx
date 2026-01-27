import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import Avatar from '../Avatar'
import Toggle from './Toggle';
import PasswordInput from './PasswordInput';

export default function Settings({admin}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col">
          <h4 className="text-md lg:text-2xl font-semibold">Profile Information</h4>
          <p className="text-sm text-gray-600 mb-4">Manage Your personal details and keep your contact info up to date</p>
        </div>
        <div className='flex justify-start items-start gap-4'>
          <div className="flex flex-col">
            <button className="rounded-3xl text-white text-[12px] px-2 py-3 bg-[#176D69] cursor-pointer hover:bg-white hover:text-[#176D69] hover:border-1">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] lg:w-[40%] items-center justify-between my-4">
        <h4 className="text-md ">Profile Picture</h4>
        <div className='flex justify-start items-center gap-4'>
          <Avatar name={admin?.fullName} src={admin?.imageUrl} size={50} />
          <div className="flex gap-2">
            <button className="text-[12px] lg:text-[14px] text-gray-500 cursor-pointer hover:text-red-800">Delete</button>
            <button className="text-[12px] lg:text-[14px] text-gray-500 cursor-pointer hover:text-[#176D69]">Update</button>
          </div>
        </div>
      </div>
      <div className='border-b-1 border-gray-200'>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='adminName'>Name</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='text' id='adminName' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100' value={admin.fullName} />
          </div>
        </div>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='adminEmail'>Email</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='email' id='adminEmail' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100' value={admin.email} />
          </div>
        </div>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='adminPhone'>Phone Number</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='number' id='adminPhone' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100' value={admin.phoneNumber} />
          </div>
        </div>
      </div>

      <div className='border-b-1 border-gray-200'>
        <div className="flex flex-col my-4 ">
          <h4 className="text-md lg:text-2xl font-semibold">Security</h4>
          <p className="text-sm text-gray-600 mb-4">Keep your account secure with extra authentication and alerts</p>
        </div>

        <div className="flex w-[100%] lg:w-[60%] items-start justify-between my-4">
          <label className="text-sm lg:text-md w-[30%] lg:w-[40%]">Multi-Factor Authentication</label>
          <div className='flex justify-start items-start gap-2 lg:gap-4 w-[70%] lg:w-[60%]'>
            <div className="flex flex-col gap-1 items-start justify-start">
              <Toggle value={isActive} onChange={setIsActive} />
              <p className="text-[12px] text-gray-500">Add an extra Layer of security to your account</p>
            </div>
          </div>
        </div>

        <div className="flex w-[100%] lg:w-[60%] items-start justify-between my-4">
          <label className="text-md w-[30%] lg:w-[40%]">Login Alert Notification</label>
          <div className='flex justify-start items-start gap-2 lg:gap-4 w-[70%] lg:w-[60%]'>
            <div className="flex flex-col gap-1 items-start justify-start">
              <Toggle value={isActive} onChange={setIsActive} />
              <p className="text-[12px] text-gray-500">Get Notified when your account is accessed from a new device</p>
            </div>
          </div>
        </div>



      </div>

      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col">
          <h4 className="text-md lg:text-2xl font-semibold">Security</h4>
          <p className="text-sm text-gray-600 mb-4">Password Manger</p>
        </div>
      </div>
      <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
        <label className="text-md " htmlFor='oldPassword'>Old Password</label>
        <div className='flex justify-start items-center gap-4 w-[60%]'>
          <PasswordInput value={admin?.password} id={"oldPassword"} />
        </div>
      </div>

      <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
        <label className="text-md " htmlFor='newPassword'>New Password</label>
        <div className='flex justify-start items-center gap-4 w-[60%]'>
          <PasswordInput value={admin?.password} id={"newPassword"} />
        </div>
      </div>
    </>
  )
}
