import React, { useEffect} from 'react';
import Header from './components/header';
import Performance from './components/Performance';
import CourseOverview from './components/CourseOverview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminDashboard } from "../../ReduxToolkit/slices/AdminDashboard"
import { fetchAdminProfile } from "../../ReduxToolkit/slices/AdminProfile";
import { SpinnerCustom } from '../../utils/Spinner';
import { fetchAcceptedCourses } from '../../ReduxToolkit/slices/AdminAcceptedCourses';
import { fetchPendingCourses } from '../../ReduxToolkit/slices/AdminPendingCourses';



const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { dashboardData, isLoading :dashboardLoading, error: dashboardError } = useSelector(
        (state) => state.adminDashboard 
    );
    const {profileData, isLoading: profileLoading, error: profileError} = useSelector(
        (state)=> state.adminProfile
    )
    const {acceptedCoursesData, isLoading:acceptedLoading, error: acceptedError} = useSelector(
        (state)=> state.acceptedCoursesData ??{acceptedCoursesData:[], isLoading:false, error:null}
    )
    const {pendingCoursesData, isLoading, error} = useSelector(
        (state)=> state.pendingCoursesData ??{pendingCoursesData:[], isLoading:false, error:null}
    )
    useEffect(() => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchAdminProfile());
    dispatch(fetchAcceptedCourses())
    dispatch(fetchPendingCourses())
    }, [dispatch]);

        if (dashboardLoading) return <div className='flex min-h-screen  justify-center items-center gap-4'><SpinnerCustom className={"text-[#176D69]"} /><p className='text-3xl text-[#176D69] animate-bounce'> Loading... </p></div> ;
        if (dashboardError) return <div className='flex min-h-screen  justify-center items-center gap-4'><p className={"text-[#176D69]"} /><p className='text-4xl text-[#176D69] animate-bounce'>Error: {dashboardError || profileError || "Failed"}</p></div>;
    return (
        <div className="p-0 lg:p-8 flex-col">
        <Header header={dashboardData} admin={profileData}/>
        <div className="px-4 lg:px-0">
        <Performance courses ={acceptedCoursesData}/>
        <CourseOverview  acceptedCourses ={acceptedCoursesData} pendingCourses={pendingCoursesData}/>
        </div>
        </div>
    );
};

export default AdminDashboard;
