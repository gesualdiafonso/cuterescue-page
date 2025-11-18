import React, { useState } from "react";
import ModalEditPet from "../modals/ModalEditPet.jsx";
import ModalDeletePet from "../modals/ModalDeletePet";
import { API_URL } from "../../config/api.js";
import AuthServices from "../../services/AuthServices.js";

const api = AuthServices.getApiInstance();

export default function EditPetForm({ selectedPet, onUpdate }) {  // Adicione onUpdate como prop opcional
  if (!selectedPet) return <div className="flex justify-center items-center"><h2 className="text-3xl font-black text-center my-10">Todavía el Pet no ha sido agregado</h2></div>;
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { nombre, especie, raza, fecha_nacimiento, edad, sexo, color, estado_salud, foto_url } = selectedPet;

  // -------------------- API: PUT --------------------
  async function handleUpdatePet(updatedPet) {
    try {
      const response = await api.put(`${API_URL}/api/pets/${selectedPet.id}`, updatedPet);
      console.log("Pet atualizado com sucesso:", response.data);
      
      // Recarregar dados após salvar (se onUpdate for passado)
      if (onUpdate) {
        onUpdate();  // Chame uma função para recarregar o pet do backend
      }
    } catch (err) {
      console.error("Erro no PUT:", err.response?.data || err.message);
      alert("Erro ao atualizar pet: " + (err.response?.data?.message || err.message));
    }
  }

  // -------------------- API: DELETE --------------------
  async function handleDeletePet(id) {
    try {
      const response = await api.delete(`${API_URL}/api/pets/${id}`);
      console.log("Pet deletado com sucesso:", response.data);
      
      // Recarregar dados após deletar (se onUpdate for passado)
      if (onUpdate) {
        onUpdate();  // Chame para atualizar a lista de pets
      }
    } catch (err) {
      console.error("Erro no DELETE:", err.response?.data || err.message);
      alert("Erro ao deletar pet: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div className="flex gap-20 justify-center items-center w-full mb-10">
      <div className="w-60 h-80 bg-gray-200 rounded-2xl">
        <img src={foto_url ? `${API_URL}${foto_url}` : `${API_URL}/public/images/default-pet.jpg`} alt={nombre} className="w-full h-full" />
      </div>
      <form className="flex flex-col gap-10 w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Nombre</label>
            <input type="text" value={nombre} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Especie</label>
            <input type="text" value={especie} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Raza</label>
            <input type="text" value={raza} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Fecha de Nacimiento</label>
            <input type="text" value={fecha_nacimiento} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Edad</label>
            <input type="text" value={edad} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Sexo</label>
            <input type="text" value={sexo} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Color</label>
            <input type="text" value={color} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
          <div className="flex flex-col">
            <label className="font-light text-lg text-black">Estado de salud</label>
            <input type="text" value={estado_salud} disabled className="border border-[#22687c] p-2 mt-2 bg-gray-100 text-gray-700" />
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <button type="button" onClick={() => setIsEditModalOpen(true)} className="w-full bg-white border border-[#22687c] font-black py-2 rounded-xl">
            Editar informes
          </button>
          <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="w-full bg-[#22687c] text-white font-black py-2 rounded-xl">
            Borrar Pet
          </button>
        </div>
        {/* Modal de edição */}
        {isEditModalOpen && (
          <ModalEditPet pet={selectedPet} onClose={() => setIsEditModalOpen(false)} onSave={handleUpdatePet} />
        )}
        {/* Modal de exclusão */}
        {isDeleteModalOpen && (
          <ModalDeletePet pet={selectedPet} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeletePet} />
        )}
      </form>
    </div>
  );
}