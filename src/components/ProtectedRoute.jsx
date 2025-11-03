import React from "react";
import { Navigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";

export default function ProtectedRout({ children }){
    const isAuth = AuthServices.isAuthenticated();
    return isAuth ? children : <Navigate to="/login" replace/>
}