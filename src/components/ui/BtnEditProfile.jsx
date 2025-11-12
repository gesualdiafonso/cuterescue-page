import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/api";

export default function BtnEditProfile({ userId, details, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    genero: "",
    ubicacion: "",
    fecha_nacimiento: "",
  });
  const [loading, setLoading] = useState(false);

  // Atualiza o form quando details mudar (ex: quando os dados carregam)
  useEffect(() => {
    if (details) {
      setFormData({
        nombre: details?.nombre || "",
        telefono: details?.telefono || "",
        genero: details?.genero || "",
        ubicacion: details?.ubicacion?.address || "",
        fecha_nacimiento: details?.fecha_nacimiento || "",
      });
    }
  }, [details]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/user/${userId}/details`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao atualizar usuário");

      const updated = await response.json();
      onUpdate(updated);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Falha na atualização:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!details) return null; // <-- evita render antes do carregamento

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-[#22687b] rounded-xl py-2 px-8 font-bold text-white 
                   hover:bg-transparent hover:border hover:border-[#22687b] 
                   hover:text-black transition-all duration-300"
      >
        Editar perfil
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="border rounded-lg p-2"
                required
              />
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="border rounded-lg p-2"
              />
              <input
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Ubicación"
                className="border rounded-lg p-2"
              />
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className="border rounded-lg p-2"
              />
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="border rounded-lg p-2"
              >
                <option value="">Seleccionar género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#22687b] text-white font-bold py-2 rounded-xl hover:bg-[#1b5463] transition"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
