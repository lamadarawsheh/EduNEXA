import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import Avatar from '../Avatar'
import Toggle from './Toggle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile } from '../../../../ReduxToolkit/slices/AdminProfile';
import { putUpdateProfile, resetUpdateProfileState } from './../../../../ReduxToolkit/slices/AdminUpdateProfile';
import Popup from './../../../../components/common/Popup';
import UnderDevelopmentPopup from '../../../../components/common/UnderDevelopmentPopup';

export default function Settings({ admin }) {
  const [isActive, setIsActive] = useState(false);
  const [isSecondActive, setIsSecondActive] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const { loading: updateLoading, error: updateError, success } = useSelector(
    (state) => state.updateProfile
  );
  useEffect(() => {
    if (admin) {
      setForm({
        fullName: admin?.fullName || "",
        email: admin?.email || "",
        phoneNumber: admin?.phoneNumber || "",
      });
    }
  }, [admin]);

  useEffect(() => {
    if (updateError) {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message:
          typeof updateError === "string"
            ? updateError
            : updateError?.message || "Update failed",
      });

      const t = setTimeout(() => {
        setPopup((p) => ({ ...p, isOpen: false }));
        dispatch(resetUpdateProfileState());
      }, 2500);

      return () => clearTimeout(t);
    }
  }, [updateError, dispatch]);
  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const onSave = async (e) => {
    e?.preventDefault?.();

    try {
      await dispatch(putUpdateProfile(form)).unwrap();

      setPopup({
        isOpen: true,
        type: "success",
        title: "Updated Successfully",
        message: "Your profile has been updated.",
      });

      setTimeout(() => {
        setPopup((p) => ({ ...p, isOpen: false }));
        dispatch(fetchAdminProfile());
      }, 2000);

    } catch (err) {
      setPopup({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: err?.message || "Update failed",
      });
    }
  };

  return (
    <>
      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={() => setPopup((p) => ({ ...p, isOpen: false }))}
        actionLabel="OK"
      />
      <div className="mt-4 flex flex-wrap gap-4 justify-between">
        <div className="flex flex-col">
          <h4 className="text-md lg:text-2xl font-semibold">Profile Information</h4>
          <p className="text-sm text-gray-600 mb-4">Manage Your personal details and keep your contact info up to date</p>
          {updateError && (
            <p className="text-sm text-red-600">
              {typeof updateError === "string"
                ? updateError
                : updateError?.message || "Update failed"}
            </p>
          )}
        </div>
        <div className='flex justify-start items-start gap-4'>
          <div className="flex flex-col">
            <button
              onClick={onSave}
              disabled={updateLoading}
              className="rounded-3xl text-white text-[12px] px-2 py-3 bg-[#176D69] cursor-pointer hover:bg-white hover:text-[#176D69] hover:border-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {updateLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
        <h4 className="text-md ">Profile Picture</h4>
        <div className='flex justify-start items-center gap-4 w-[60%]'>
          <Avatar name={admin?.fullName} src={admin?.imageUrl} size={50} />
        </div>
      </div>
      <div className='border-b-1 border-gray-200'>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='fullName'>Name</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='text' id='fullName' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100'
              value={form.fullName}
              onChange={onChange}
              placeholder={admin?.fullName || ""} />
          </div>
        </div>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='email'>Email</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='email' id='email' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100'
              value={form.email}
              onChange={onChange} />
          </div>
        </div>
        <div className="flex w-[100%] lg:w-[60%] items-center justify-between my-4">
          <label className="text-md " htmlFor='phoneNumber'>Phone Number</label>
          <div className='flex justify-start items-center gap-4 w-[60%]'>
            <input type='number' id='phoneNumber' className='border-1 border-gray-200 rounded-md py-2 px-2 w-[100%] lg:w-[80%] text-sm text-gray-500 outline-none transition
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-200
                  disabled:cursor-not-allowed disabled:bg-gray-100'
              value={form.phoneNumber}
              onChange={onChange} />
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
              <Toggle value={isActive}
                onChange={setIsActive}
                afterToggle={() => setOpenPopup(true)} />
              <p className="text-[12px] text-gray-500">Add an extra Layer of security to your account</p>
            </div>
          </div>
        </div>

        <div className="flex w-[100%] lg:w-[60%] items-start justify-between my-4">
          <label className="text-md w-[30%] lg:w-[40%]">Login Alert Notification</label>
          <div className='flex justify-start items-start gap-2 lg:gap-4 w-[70%] lg:w-[60%]'>
            <div className="flex flex-col gap-1 items-start justify-start">
              <Toggle value={isSecondActive}
                onChange={setIsSecondActive}
                afterToggle={() => setOpenPopup(true)} />
              <p className="text-[12px] text-gray-500">Get Notified when your account is accessed from a new device</p>
            </div>
          </div>
        </div>
      </div>
      <UnderDevelopmentPopup
        isOpen={openPopup}
        onClose={() => setOpenPopup(false)}
      />
    </>
  )
}
