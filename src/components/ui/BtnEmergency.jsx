import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerEmergency, simulatePetMovement } from "../../services/SimulacionService";
import { useSavedData } from "../../context/SavedDataContext";

export default function BtnEmergency() {
    const { selectedPet, location, setLocation } = useSavedData();
    const navigate = useNavigate();
    const [isAlertActive, setIsAlertActive] = useState(false);

    const handleEmergency = async () => {
        if (!selectedPet || !location) return;

        try {
            // 1. Ativa emergência no Back-end (isso cria o alerta no MongoDB)
            await triggerEmergency(selectedPet.id, location.lat, location.lng);
            
            // 2. Mostrar Alerta Visual (Modal)
            setIsAlertActive(true);

            // 4. Redirecionar para o Mapa após 2 segundos
            setTimeout(() => navigate("/pet-ubication"), 2000);

            // Limpar intervalo após 30 segundos (opcional)
            setTimeout(() => clearInterval(interval), 30000);

        } catch (err) {
            alert("Erro ao iniciar protocolo de emergência", err);
        }
    };

    return (
        <>
            <button onClick={handleEmergency} className="bg-[#fd9b08] rounded-xl py-2 px-8 font-bold text-white hover:bg-[#ff4e0d]  transition-all duration-300">
                Emergencias
            </button>

            {isAlertActive && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-red-500 animate-bounce">
                        <h2 className="text-2xl font-bold text-red-600">🚨 ALERTA DE EMERGÊNCIA</h2>
                        <p className="mt-2 text-gray-700">O pet <strong>{selectedPet.nombre}</strong> saiu da zona segura!</p>
                        <p className="text-sm text-gray-500">Redirecionando para o rastreio...</p>
                        <button onClick={() => setIsAlertActive(false)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg">Fechar</button>
                    </div>
                </div>
            )}
        </>
    );
}