import React from "react"
import { useNavigate } from "react-router-dom"
import { simulatePetMovement } from "../../services/SimulacionService"
import { useSavedData } from "../../context/SavedDataContext"


export default function BtnSimulacion(){
    const navigate = useNavigate();
    const { selectedPet, location, setLocation } = useSavedData();

    const handleSimulate = async() =>{
        if (!selectedPet || !location) {
            console.warn("No hay mascota seleccionada para ubicación ser cargada");
            return;
        }

        navigate("/pet-ubication");

        let currentLat = location.lat;
        let currentLng = location.lng;
        let count = 0;

        const interval = setInterval(async () => {
            try {
                const response = await simulatePetMovement(
                    selectedPet.id,
                    currentLat,
                    currentLng
                );

                // O axios retorna o body em response. O seu Controller retorna { message, data }
                // Portanto, a localização real está em response.data
                const updatedLocation = response.data; 

                if (updatedLocation) {
                    // CORREÇÃO: Passar o objeto direto, não {updatedLocation}
                    setLocation(updatedLocation); 
                    
                    currentLat = updatedLocation.lat;
                    currentLng = updatedLocation.lng;
                }

                count++;
                if (count >= 10) clearInterval(interval);
            } catch (err) {
                console.error("Falla al simular movimiento", err);
                clearInterval(interval);
            }
        }, 1000);
    }
    
    return (
        <button 
            onClick={handleSimulate}    
            className="bg-[#22687b] rounded-xl py-2 px-8 font-bold text-white hover:bg-transparent hover:border hover:border-[#22687b] hover:text-black transition-all duration-300"
        >
            Simular movimiento
        </button>
    )
}