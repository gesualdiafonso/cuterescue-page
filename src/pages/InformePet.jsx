import React, {useEffect, useState} from "react";
import PetCards from "../components/ui/PetCards";
import MapPet from "../components/maps/MapPet";
import MapHomePet from "../components/maps/MapHomePet"
import EditPetForm from "../components/forms/EditPetForm";
import { useSavedData } from "../context/SavedDataContext"


export default function InformePet(){
    
    const { pets, location, selectedPet, handleSelectPet } = useSavedData();

    // Função para recarregar os dados do pet selecionado
    async function loadPet() {
        if (selectedPet) {
            handleSelectPet(selectedPet.id);
        }
    }

    useEffect(() => {
        loadPet();
    }, [selectedPet?.id]);

    return(
        <div className="max-w-7xl mx-auto p-0">
            <section className="flex gap-20 mb-10">
                <PetCards
                    pets={pets}
                    selectedPet={selectedPet}
                    setSelectedPet={(pet) => handleSelectPet(pet.id)}
                />
                <MapPet selectedPet={selectedPet} location={location} />
            </section>
            <div className="bg-black w-full h-0.5 my-10"/>
            <section className="mb-5 mt-5">
                <EditPetForm pets={pets} selectedPet={selectedPet} onUpdate={loadPet} />
                <MapHomePet selectedPet={selectedPet} location={location} />
            </section>

        </div>
    )
}