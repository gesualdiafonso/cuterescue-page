import React from "react";

export default function PetCards(){
    return(
        <div className="w-full flex gap-10 ">
            <article className="bg-[#22687b] w-full rounded-3xl h-auto p-5 flex justify-center flex-col">
                <div className="w-full h-52 mb-5 bg-gray-50 rounded-xl">
                    <img src="" alt="" />
                </div>
                <div className="text-white flex flex-col justify-center">
                    <h4>Nombre</h4>
                    <span>
                        <strong className="text-orange-300">Status: </strong> 
                        <span className="bg-[#71dd5b] text-white px-2 text-center rounded-lg font-light">status</span>
                    </span>
                    <strong className="text-orange-300">Ubicación:</strong>
                    <span>Avenida Corritens, 1902, Buenos Aires, Capital Federal</span>
                </div>
            </article>

             <article className="bg-[#22687b] w-full rounded-3xl h-auto p-5 flex justify-center flex-col">
                <div className="w-full h-52 mb-5 bg-gray-50 rounded-xl">
                    <img src="" alt="" />
                </div>
                <div className="text-white flex flex-col justify-center">
                    <h4>Nombre</h4>
                    <span>
                        <strong className="text-orange-300">Status: </strong> 
                        <span className="bg-[#71dd5b] text-white px-2 text-center rounded-lg font-light">status</span>
                    </span>
                    <strong className="text-orange-300">Ubicación:</strong>
                    <span>Avenida Corritens, 1902, Buenos Aires, Capital Federal</span>
                </div>
            </article>

            <article className="bg-[#f5f5dc]/50 w-full rounded-3xl flex flex-col justify-center items-center">
                <span>+</span>
                <p>Agregar más pet</p>
            </article>
        </div>
    )
}