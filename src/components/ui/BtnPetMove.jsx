import React from "react";
import { Link } from "react-router-dom";

export default function BtnPetMove(){
    return (
    <Link to="/pet-ubication" className="bg-[#22687b] text-center rounded-xl py-2 px-8 font-bold text-white hover:bg-transparent hover:border hover:border-[#22687b] hover:text-black transition-all duration-300">
        Ubicame
    </Link>
    )
}