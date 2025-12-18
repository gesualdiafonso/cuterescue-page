import React from "react";
import { Navigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";

export default function ProtectedRout({ children, isAdminRequired = false  }){
    const isAuth = AuthServices.isAuthenticated();
    const userRole = AuthServices.getUserRole();

    if (!isAuth){
        return <Navigate to="/login" replace/>;
    }

    if (isAdminRequired && userRole !== "admin"){
        return <Navigate to="/forbidden" replace/>;
    }
    return children
}