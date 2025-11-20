import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import api from "../../services/api";

export default function BtnEditProfile({ userId, details, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    genero: "",
    ubicacion: "",
    fecha_nacimiento: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(details?.profilePic || "");

  useEffect(() => {
    if (details) {
      setFormData({
        nombre: details.nombre || "",
        telefono: details.telefono || "",
        genero: details.genero || "",
        ubicacion: details.ubicacion?.address || "",
        fecha_nacimiento: details.fecha_nacimiento || "",
      });
      setPreview(details.profilePic || "");
    }
  }, [details]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    if (!selectedImage) return null;

    const fd = new FormData();
    fd.append("file", selectedImage);
    fd.append("userId", userId);
    fd.append("name", selectedImage.name);

    const res = await api.post(`/api/uploads`, fd);

    return res.data.fileUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let newPhotoUrl = null;

      // 1) Faz upload da imagem, se houver
      if (selectedImage) {
        newPhotoUrl = await uploadImage();
      }

      // 2) Envia tudo para o back
      const payload = {
        ...formData,
        profilePic: newPhotoUrl || details.profilePic,
      };

      const response = await api.put(`/api/user/${userId}/details`, payload);

      const updated = response.data;
      onUpdate(updated);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Erro geral:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  }

  if (!details) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#22687b] rounded-xl py-2 px-8 font-bold text-white 
                   hover:bg-transparent hover:border hover:border-[#22687b] 
                   hover:text-black transition-all duration-300"
      >
        Editar perfil
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 relative">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4 text-center text-[#22687b]">
              Editar Perfil
            </h3>

            {/* Pré-visualização da imagem */}
            <div className="w-full flex justify-center mb-4">
              <label className="cursor-pointer">
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-full border"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <input name="nombre" value={formData.nombre}
                onChange={handleChange} placeholder="Nombre" className="border p-2 rounded-lg" />

              <input name="telefono" value={formData.telefono}
                onChange={handleChange} placeholder="Teléfono" className="border p-2 rounded-lg" />

              <input name="ubicacion" value={formData.ubicacion}
                onChange={handleChange} placeholder="Ubicación" className="border p-2 rounded-lg" />

              <input type="date" name="fecha_nacimiento"
                value={formData.fecha_nacimiento} onChange={handleChange}
                className="border p-2 rounded-lg" />

              <select name="genero" value={formData.genero}
                onChange={handleChange} className="border p-2 rounded-lg">
                <option value="">Seleccionar género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>

              <button type="submit" disabled={loading}
                className="bg-[#22687b] text-white font-bold py-2 rounded-xl hover:bg-[#1b5463] transition">
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
