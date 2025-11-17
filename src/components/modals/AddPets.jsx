import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useSavedData } from "../../context/SavedDataContext";

export default function AddPets({ onPetAdded }) {
  const { user } = useSavedData();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    dueno_id: "",
    nombre: "",
    especie: "",
    raza: "",
    fecha_nacimiento: "",
    edad: "",
    sexo: "",
    color: "",
    estado_salud: "",
    home_location: "",
    foto_url: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({ ...prev, dueno_id: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto_url" && files?.[0]) {
      setForm({ ...form, foto: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!form.dueno_id) throw new Error("User ID não carregado.");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Se tiver foto, envia o File
    // Se NÃO tiver, envia null e o back ignora
    if (form.foto_url instanceof File) {
      data.append("foto", form.foto_url); // <-- nome esperado pelo multer
    }

    const res = await fetch(`${API_URL}/api/pets`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Erro ao criar pet");

    alert("Pet adicionado com sucesso!");
    setShowModal(false);
    onPetAdded?.(result);
    
  } catch (err) {
    console.error(err);
    alert("Falha ao adicionar pet: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <article
        className="mx-auto bg-[#f5f5dc]/50 w-[256px] flex-shrink-0 rounded-3xl h-[250px] p-5 flex justify-center items-center flex-col cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setShowModal(true)}
      >
        <span className="text-3xl font-bold text-[#22687b]">+</span>
        <p className="text-[#22687b] mt-2">Agregar más pet</p>
      </article>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex gap-20 justify-center items-center w-full z-50">
          <div className="bg-[#22687b] rounded-2xl p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-white hover:text-blue-400"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">
              Agregar nuevo Pet
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-10 max-h-[80vh] overflow-y-auto"
            >
              <input type="text" name="nombre" placeholder="Nombre" required value={form.nombre} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="text" name="especie" placeholder="Especie" required value={form.especie} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="text" name="raza" placeholder="Raza" value={form.raza} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="number" name="edad" placeholder="Edad" value={form.edad} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />

              <select name="sexo" value={form.sexo} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white">
                <option value="">Sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>

              <input type="text" name="color" placeholder="Color" value={form.color} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="text" name="estado_salud" placeholder="Estado de salud" value={form.estado_salud} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
              <input type="text" name="home_location" placeholder="Ubicación" value={form.home_location} onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />

              <div>
                <label className="block mb-1 text-sm text-white">Foto</label>
                <input type="file" name="foto_url" accept="image/*" onChange={handleChange} className="w-full border border-[#fd9b08] p-2 bg-white" />
                {preview && <img src={preview} className="mt-2 w-32 h-32 object-cover rounded-xl" />}
              </div>

              <button type="submit" disabled={loading} className="bg-[#fd9b08] text-white py-2 rounded-lg hover:bg-orange-300 transition-colors">
                {loading ? "Guardando..." : "Guardar Pet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
