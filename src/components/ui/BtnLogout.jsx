import React from "react";
import AuthServices from "../../services/AuthServices.js";
import { useNavigate } from "react-router-dom";

export default function BtnLogout(){
    
    const navigate = useNavigate();

    function handleLogout(){
        AuthServices.logout();
        navigate("/login");
    }
    
    return(
        <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#86ddd8] text-white rounded-full hover:bg-[#20b2aa] transition-all duration-300">
            Logout
        </button>
    )
}