import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvents } from "../../services/AdminService";

export default function AgregarEvents() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        summary: "",
        locations: "", // Se convertirá a array con split
        schedule: { castracion: "", vacunacion: "" },
        requirements: "", // Se convertirá a array con split
        free: true,
        link: "" // Tu backend pide 'link' como obligatorio en la validación
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Formatear los datos para el backend
        const dataToSend = {
            ...formData,
            locations: formData.locations.split(",").map(item => item.trim()),
            requirements: formData.requirements.split(",").map(item => item.trim())
        };

        try {
            await createEvents(dataToSend);
            alert("Evento creado con éxito");
            navigate("/admin/control-eventos"); // Ajusta a tu ruta de control
        } catch (error) {
            alert("Error al crear: " + error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6">Nuevo Evento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="ID único (ej: evento_001)"
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                    required
                />
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Título del evento"
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                />
                <textarea 
                    className="w-full p-2 border rounded" 
                    placeholder="Resumen"
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    required
                />
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Ubicaciones (separadas por coma)"
                    onChange={(e) => setFormData({...formData, locations: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        className="p-2 border rounded" 
                        placeholder="Horario Castración"
                        onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, castracion: e.target.value}})}
                    />
                    <input 
                        className="p-2 border rounded" 
                        placeholder="Horario Vacunación"
                        onChange={(e) => setFormData({...formData, schedule: {...formData.schedule, vacunacion: e.target.value}})}
                    />
                </div>

                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Requerimientos (separados por coma)"
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                />
                
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Link externo (Requerido por API)"
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    required
                />

                <div className="flex gap-4">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Guardar Evento</button>
                    <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white px-6 py-2 rounded-lg">Cancelar</button>
                </div>
            </form>
        </div>
    );
}