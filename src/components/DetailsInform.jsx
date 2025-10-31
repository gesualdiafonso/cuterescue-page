import React from "react";
import { Link } from "react-router-dom";

export default function DetailsInform(){
    return(
        <div className="flex gap-10 justify-center items-center">
            <div className="bg-gray-200 w-72 h-80 rounded-2xl">
                <img src="#" alt="#" className="w-full h-full"/>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="font-bold text-4xl">Thayza Taiexeira Alvez</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                    <p><strong>Fecha de nacimiento: </strong> fecha </p>
                    <p><strong>Ubicación: </strong> ubicación </p>
                    <p><strong>Email: </strong> email </p>
                    <p><strong>Telefono: </strong> telefono </p>
                    <p><strong>Documento: </strong> documento </p>
                    <p><strong>Genero: </strong> genero </p>
                    <p><strong>Plan: </strong> Premium <Link to="/planos" className=" ml-3 px-5 bg-[#f7a82a] text-white font-light rounded-2xl"> Cambiar</Link> </p> 
                    <p><strong>GPS Activo: </strong> gps  <Link to="/gps-pets" className="ml-3 px-5 bg-[#22687b] text-white font-light rounded-2xl">Acceder</Link> </p>
                </div>
            </div>
        </div>
    )
}