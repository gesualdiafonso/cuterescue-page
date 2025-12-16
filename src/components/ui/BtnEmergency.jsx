import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { triggerEmergency, simulatePetMovement } from "../../services/SimulacionService";
import { useSavedData } from "../../context/SavedDataContext";

export default function BtnEmergency() {
    const { selectedPet, location, setLocation } = useSavedData();
    const navigate = useNavigate();
    const [isAlertActive, setIsAlertActive] = useState(false);
    
    // Usamos useRef para conseguir limpar o intervalo mesmo se o componente desmontar
    const intervalRef = useRef(null);

    const handleEmergency = async () => {
        if (!selectedPet || !location) return;

        try {
            // 1. Primeiro disparo: Ativa o estado de emergência e cria o Alerta no Mongo
            const initialUpdate = await triggerEmergency(selectedPet.id, location.lat, location.lng);
            
            // Atualiza o contexto global com a primeira posição da emergência
            if (initialUpdate.data) setLocation(initialUpdate.data);

            setIsAlertActive(true);

            // 2. Redirecionar para o Mapa/Ubicación após 2 segundos
            setTimeout(() => navigate("/pet-ubication"), 2000);

            // 3. Simulação de Movimento em Tempo Real
            let currentLat = initialUpdate.data?.lat || location.lat;
            let currentLng = initialUpdate.data?.lng || location.lng;

            // Limpa qualquer intervalo anterior se existir
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(async () => {
                try {
                    // Chamamos a simulação normal para continuar o percurso
                    const moveUpdate = await simulatePetMovement(selectedPet.id, currentLat, currentLng);
                    
                    const newPos = moveUpdate.data || moveUpdate;
                    
                    // Atualiza referências para o próximo salto
                    currentLat = newPos.lat;
                    currentLng = newPos.lng;

                    // Atualiza o contexto para o mapa se mover em tempo real
                    setLocation(newPos);
                    
                    console.log("Simulando passo da emergência:", newPos);
                } catch (err) {
                    console.error("Erro no percurso de emergência:", err);
                    clearInterval(intervalRef.current);
                }
            }, 3000); // Move o pet a cada 3 segundos

            // 4. Autostop: Para a simulação após 1 minuto para não sobrecarregar o banco
            setTimeout(() => {
                clearInterval(intervalRef.current);
                console.log("Simulação de emergência encerrada automaticamente.");
            }, 60000);

        } catch (err) {
            console.error("Erro ao iniciar protocolo de emergência", err);
            alert("Falla ao iniciar sistema de emergência.");
        }
    };

    return (
        <>
            <button onClick={handleEmergency} className="bg-[#fd9b08] rounded-xl py-2 px-8 font-bold text-white hover:bg-[#ff4e0d] transition-all duration-300">
                Emergencias
            </button>

            {isAlertActive && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-red-500 text-center">
                        <h2 className="text-2xl font-bold text-red-600 animate-pulse">🚨 MODO EMERGÊNCIA ATIVADO</h2>
                        <p className="mt-2 text-gray-700">Rastreando <strong>{selectedPet.nombre}</strong> em tempo real...</p>
                        <div className="mt-4 flex justify-center">
                             <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}