import React from "react";

export default function EditPetForm(){
    return(
        <div className="flex gap-20 justify-center items-center w-full mb-10">
            <div className="w-60 h-80 bg-gray-200 rounded-2xl">
                <img src="#" alt="#" className="w-full h-full"/>
            </div>
            <form action="#" className="felx flex-col gap-10 w-2/3">
                <div  className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
                    <div className="flex flex-col">
                        <label className="font-light text-lg text-black">Nombre</label>
                        <input
                        type="text"
                        className="border border-[#22687c] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-light text-lg text-black">Subir Foto</label>
                        <input 
                            type="upload" 
                            className="border border-[#22687c] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                            />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-light text-lg text-black">Ubicación</label>
                        <input
                        type="text"
                        className="border border-[#22687c] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-light text-lg text-black">Fecha de Nacimiento</label>
                        <input
                        type="date"
                        className="border border-[#22687c] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-light text-lg text-black">Telefono</label>
                        <input
                        type="text"
                        className="border border-[#22687c] p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                        />
                    </div>

                    <div>
                        sexo
                    </div>
                </div>
                <div className="flex gap-5 w-full">
                    <button className="w-full bg-white border border-[#22687c] font-black py-2 rounded-xl">
                        Editar informes
                    </button>
                    <button className="w-full bg-[#22687c] text-white font-black py-2 rounded-xl ">
                        Borrar Pet
                    </button>
                    <button className="w-full bg-[#fbc68f] text-white font-black py-2 rounded-xl ">Informe Chip</button>
                </div>
            </form>
        </div>
    )
}