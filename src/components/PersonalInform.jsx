import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BtnViaje from "./ui/BtnViaje"
import BtnEmergency from "./ui/BtnEmergency"
import { fetchDetailsUserId } from "../services/UserService"
import { API_URL } from "../config/api"

export default function PersonalInform(){
    const [details, setDetails ] = useState(null);

    useEffect(() => {
        async function loadUser(){
            try {
                const data = await fetchDetailsUserId();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        loadUser();
    }, []);

    if (!details) {
        return <div>Loading...</div>;
    }

    const { nombre, ubicacion } = details;
    const [firstName] = nombre.split(" ");

    return(
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <div className="flex gap-5 px-5">
                <span>{ubicacion.address}</span>
                <span>|</span>
                <span>Buenos Aires</span>
            </div>
            <div className="flex flex-col gap-4 px-5 mb-5">
                <h2 className="font-bold text-8xl">{nombre}</h2>
                <div className="flex gap-5">
                   <BtnViaje/>
                   <BtnEmergency/>
                </div>
            </div>
            <div className="flex justify-center items-center gap-5">
                <div className="bg-gray-300 rounded-full w-16 h-16 text-center">
                    <img src={details.profilePic ? `${API_URL}${details.profilePic}` : `${API_URL}/public/images/default-pet.jpg`} alt="#" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                    <h3 className="font-bold text-xl">{firstName}</h3>
                    <Link to="/detalles" className="text-[#d5d5d5] hover:text-gray-700">Visualizar perfil</Link>
                </div>
            </div>
        </div>
    )
}