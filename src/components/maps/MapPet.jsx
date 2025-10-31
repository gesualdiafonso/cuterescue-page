import React from "react";

export default function MapPet(){
    return(
        <div className="w-1/2 h-auto">
            <article className="w-full bg-[#f5dcb3] p-5 rounded-3xl">
                <div className="flex gap-10">
                    <div className="w-full flex flex-col">
                        <h4>Pet Name</h4>
                        <span>last_location</span>
                        <span>Avenida Callao, 2340, Park Callao, Buenos Aires, Argentina</span>
                    </div>
                    <div className="">
                        <span className="bg-[#71dd5b] text-white px-2 text-center rounded-lg font-light">status</span>
                    </div>
                </div>
                <div className="w-full h-full bg-amber-100">
                    mapa
                </div>
            </article>
        </div>
    )
}