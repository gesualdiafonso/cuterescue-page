import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, editEvents, deleteEvents } from "../../services/AdminService";
import Loading from "../../components/Loading";

export default function ControlEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para o Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error("Erro al cargar los eventos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
            await deleteEvents(eventId);
            loadEvents();
        }
    };

    // Abre o modal e preenche o estado com o evento selecionado
    const openEditModal = (event) => {
        setCurrentEvent({ ...event });
        setIsModalOpen(true);
    };

    // Salva as alterações chamando a API
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const mongoId = currentEvent._id.$oid || currentEvent._id;

            const { _id, ...dataToUpdate } = currentEvent

            await editEvents(mongoId, dataToUpdate);
            setIsModalOpen(false);
            loadEvents(); // Recarrega a lista
            alert("Evento atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    };

    if (loading) return <Loading/>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Control de Eventos</h1>
                <Link to="/admin/agregar-eventos" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                    + Agregar Nuevo Evento
                </Link>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 flex-grow">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{event.summary}</p>
                        </div>
                        <div className="bg-gray-50 p-4 border-t flex justify-end gap-2">
                            <button 
                                onClick={() => openEditModal(event)} 
                                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button onClick={() => handleDelete(event.id)} className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL DE EDIÇÃO */}
            {isModalOpen && currentEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-2xl my-8">
                        <h2 className="text-xl font-bold mb-4">Editar Evento: {currentEvent.id}</h2>
                        
                        <form onSubmit={handleUpdate} className="space-y-4">
                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium">Título</label>
                                <input 
                                    className="w-full border rounded p-2"
                                    value={currentEvent.title}
                                    onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                                />
                            </div>

                            {/* Resumo */}
                            <div>
                                <label className="block text-sm font-medium">Resumen</label>
                                <textarea 
                                    className="w-full border rounded p-2 h-24"
                                    value={currentEvent.summary}
                                    onChange={(e) => setCurrentEvent({...currentEvent, summary: e.target.value})}
                                />
                            </div>

                            {/* Schedule (Objeto Aninhado) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Horario Castración</label>
                                    <input 
                                        className="w-full border rounded p-2"
                                        value={currentEvent.schedule.castracion}
                                        onChange={(e) => setCurrentEvent({
                                            ...currentEvent, 
                                            schedule: { ...currentEvent.schedule, castracion: e.target.value }
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Horario Vacunación</label>
                                    <input 
                                        className="w-full border rounded p-2"
                                        value={currentEvent.schedule.vacunacion}
                                        onChange={(e) => setCurrentEvent({
                                            ...currentEvent, 
                                            schedule: { ...currentEvent.schedule, vacunacion: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-sm font-medium">Enlace (URL)</label>
                                <input 
                                    className="w-full border rounded p-2"
                                    value={currentEvent.link}
                                    onChange={(e) => setCurrentEvent({...currentEvent, link: e.target.value})}
                                />
                            </div>

                            {/* Footer do Modal */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}