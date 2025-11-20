import React from "react"
import { simulatePetMovement } from "../../services/SimulacionService"
import { useSavedData } from "../../context/SavedDataContext"


export default function BtnSimulacion(){
    const { selectedPet, location, setLocation } = useSavedData();

    const handleSimulate = async() =>{
        if (!selectedPet || !location) {
            console.warn("No hay mascota seleccionada para ubicación ser cargada");
            return;
        }

        try{
            const update = await simulatePetMovement(
                selectedPet.id,
                location.lat,
                location.lng
            );

            setLocation(update);
        } catch (err){
            console.error("Falla al simular movimiento", err)
        }
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