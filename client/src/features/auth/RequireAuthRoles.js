import React from 'react'
import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken,selectCurrentRoles } from "./authSlice";

const RequireAuthRoles = ({ allowedRoles }) => {
    
    const roles = useSelector(selectCurrentRoles)
    console.log(roles)
    const location = useLocation();
  return (
    roles?.find(role => allowedRoles?.includes(role))?<Outlet/>:<Navigate to="/unauthorized" state={{from:location}} replace />

  )
}

export default RequireAuthRoles