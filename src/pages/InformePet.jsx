import React, {useEffect, useState} from "react";
import PetCards from "../components/ui/PetCards";
import MapPet from "../components/maps/MapPet";
import MapHomePet from "../components/maps/MapHomePet"
import EditPetForm from "../components/forms/EditPetForm";
import BtnViaje from "../components/ui/BtnViaje"
import BtnEmergency from "../components/ui/BtnEmergency";
import BtnPetMove from "../components/ui/BtnPetMove"
import ModalEditPet from "../components/modals/ModalEditPet";
import { useSavedData } from "../context/SavedDataContext"

export default function InformePet(){
    
    const { pets, location, selectedPet, handleSelectPet } = useSavedData();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    

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
                <EditPetForm pets={pets} selectedPet={selectedPet} setSelectedPet={(pet) => handleSelectPet(pet.id)} onEditClick={() => setIsEditModalOpen(true)} onDeleteClick={() => setIsDeleteModalOpen(true)} />
                <MapHomePet selectedPet={selectedPet} location={location} />
                <div className="flex gap-10 justify-center items-center">
                    <BtnViaje/>
                    <BtnPetMove/>
                    <BtnEmergency/>
                </div>
            </section>

           {/* Modal de edição */}
            {isEditModalOpen && (
                <ModalEditPet
                pet={selectedPet}
                onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {/* Modal de exclusão */}
            {isDeleteModalOpen && (
                <ModalDeletePet
                pet={selectedPet}
                onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    )
}