import React from "react";
import { API_URL } from "../../config/api";

export default function PetLink({ pet }){

    if(!pet){
        return null;
    }

    return(
        <div className="w-1/4 flex gap-2 justify-center items-center">
            <div className="w-10 h-10">
                <img src={pet.foto_url ? `${API_URL}${pet.foto_url}` : `/public/assets/images/default-pet.jpg`} alt="Shimbinha" className="bg-gray-200 rounded-full w-full h-full object-cover"/>
            </div>
            <div>
                <span>{pet.nombre}</span>
            </div>
        </div>
    )
}