import React, { useState } from "react"; 
import { API_URL } from "../config/api";
import { Link } from "react-router-dom";
import { useSavedData } from "../context/SavedDataContext";
import BtnEditProfile from "./ui/BtnEditProfile";

export default function DetailsInform(){
  const { user, details, setDetails, updatedProfilePic } = useSavedData();
  const[localDetails, setLocalDetails] = useState(details)

  if (!user || !details) return <div>Loading...</div>;

  const handleUpdate = (updatedData) => {
    setLocalDetails(updatedData);
    setDetails(updatedData)
  };

  const userId = details.userId;

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("name", file.name);

    try {
      const res = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no upload");

      // Atualiza a foto local
      const newPhotoUrl = `${API_URL}${data.fileUrl}`;
      updatedProfilePic(newPhotoUrl);

      //actualiza en el banco
      await fetch(`${API_URL}/api/user/${userId}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilePic: newPhotoUrl }),
      });

      // Sincroniza o frontend corretamente
      setDetails(prev => ({ ...prev, profilePic: newPhotoUrl }));
      setLocalDetails(prev => ({ ...prev, profilePic: newPhotoUrl }));



    } catch (err) {
      console.error("❌ Erro ao subir imagem:", err);
    }
  }


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
        <label
          htmlFor="profileUpload"
          className="absolute bottom-0 left-0 right-0 bg-[#22687b]/80 text-white text-center py-2 cursor-pointer font-semibold hover:bg-[#1b5463]/90 transition"
        >
          Cambiar foto de perfil
        </label>
        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
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
