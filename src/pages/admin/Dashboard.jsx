import React, { useEffect} from 'react';
import Header from './components/header';
import Performance from './components/Performance';
import CourseOverview from './components/CourseOverview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminDashboard } from "../../ReduxToolkit/slices/AdminDashboard"
import { fetchAdminProfile } from "../../ReduxToolkit/slices/AdminProfile";



const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { dashboardData, isLoading :dashboardLoading, error: dashboardError } = useSelector(
        (state) => state.adminDashboard 
    );
    const {profileData, isLoading: profileLoading, error: profileError} = useSelector(
        (state)=> state.adminProfile
    )
    useEffect(() => {
    dispatch(fetchAdminDashboard());
    dispatch(fetchAdminProfile());
    }, [dispatch]);

    if (dashboardLoading || profileLoading) return <h2>Loading...</h2>;
    if (dashboardError || profileError)
    return <h2>Error: {dashboardError || profileError || "Failed"}</h2>;
    console.log("profileData:", profileData);
    return (
        <div className="p-0 lg:p-8 flex-col">
        <Header header={dashboardData} admin={profileData}/>
        <div className="px-4 lg:px-0">
        <Performance/>
        <CourseOverview/>
        </div>
        </div>
    );
};

export default AdminDashboard;
