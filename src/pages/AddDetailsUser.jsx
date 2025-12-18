import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import api from "../services/api";

function AddDetailsUser() {
  const [form, setForm] = useState({
    nombre: "",
    fecha_nacimiento: "",
    genero: "",
    tipo_documento: "",
    documento: "",
    telefono: "",
    ubicacion: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(`${API_URL}/api/user/${userId}/details`, form);
      console.log("Detalhes salvos com sucesso:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Erro ao salvar detalhes:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <img
        src="/assets/images/elementos/vetorpatas_trama.png"
        alt=""
        className="absolute w-full h-full object-cover -z-10 opacity-30"
      />
      <div className="bg-white shadow-xl rounded-lg p-8 w-[450px] flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-cyan-700">
          Completa tus datos
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} className="p-2 border rounded-md" />
          <select name="tipo_documento" value={form.tipo_documento} onChange={handleChange} className="p-2 border rounded-md">
            <option value="">Tipo de documento</option>
            <option value="DNI">DNI</option>
            <option value="Passaporte">Passaporte</option>
            <option value="CUIT">CUIT</option>
            <option value="Otro">Otro</option>
          </select>
          <input type="text" name="documento" placeholder="Número de documento" value={form.documento} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="p-2 border rounded-md" />
          <input type="text" name="ubicacion" placeholder="Ubicación" value={form.ubicacion} onChange={handleChange} className="p-2 border rounded-md" />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" className="bg-cyan-700 text-white p-2 rounded-md hover:bg-cyan-800 transition-all">
            Guardar y continuar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDetailsUser;
