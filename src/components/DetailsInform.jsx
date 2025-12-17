import React, { useState } from "react"; 
import { API_URL } from "../config/api";
import { Link } from "react-router-dom";
import { useSavedData } from "../context/SavedDataContext";
import BtnEditProfile from "./ui/BtnEditProfile";
import Loading from "./Loading";

export default function DetailsInform(){
  const { user, details, setDetails } = useSavedData();
  const[localDetails, setLocalDetails] = useState(details)

  if (!user || !details) return <Loading />;

  const handleUpdate = (updatedData) => {
    setLocalDetails(updatedData);
    setDetails(updatedData)
  };


  const { email } = user;
  const { 
    fecha_nacimiento, 
    ubicacion, 
    documento, 
    telefono, 
    genero, 
    nombre, 
    tipo_documento 
  } = details;

  return (
    <div className="flex gap-10 justify-center items-center">
      <div className="relative bg-gray-200 w-72 h-80 rounded-2xl overflow-hidden">
        <img src={details.profilePic ? `${API_URL}${details.profilePic}` : `${API_URL}/public/images/default-pet.jpg`} alt="#" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-4xl">{nombre}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
          <p><strong>Fecha de nacimiento:</strong> {fecha_nacimiento}</p>
          <p><strong>Ubicación:</strong> {ubicacion?.address || "No especificada"}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Documento:</strong> {tipo_documento}: {documento}</p>
          <p><strong>Género:</strong> {genero}</p>
        </div>
        <div>
          <BtnEditProfile userId={user.id} details={localDetails} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
