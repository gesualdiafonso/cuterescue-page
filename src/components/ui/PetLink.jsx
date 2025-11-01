import React from "react";

export default function PetLink({ pet }){

    if(!pet){
        return null;
    }

    return(
        <div className="w-1/4 flex gap-2 justify-center items-center">
            <div className="w-10 h-10">
                <img src="/assets/images/simbinha.jpg" alt="Shimbinha" className="bg-gray-200 rounded-full w-full h-full object-cover"/>
            </div>
            <div>
                <span>{pet.nombre}</span>
            </div>
        </div>
    )
}