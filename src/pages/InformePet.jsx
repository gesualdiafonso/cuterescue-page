import React from "react";
import PetCards from "../components/ui/PetCards";
import MapPet from "../components/maps/MapPet";
import MapHomePet from "../components/maps/MapHomePet"
import EditPetForm from "../components/forms/EditPetForm";
import BtnViaje from "../components/ui/BtnViaje"
import BtnEmergency from "../components/ui/BtnEmergency";
import BtnPetMove from "../components/ui/BtnPetMove"

export default function InformePet(){
    return(
        <div className="max-w-7xl mx-auto p-0">
            <section className="flex gap-20 mb-10">
                <PetCards/>
                <MapPet/>
            </section>
            <div className="bg-black w-full h-0.5 my-10"/>
            <section className="mb-5 mt-5">
                <EditPetForm />
                <MapHomePet/>
                <div className="flex gap-10 justify-center items-center">
                    <BtnViaje/>
                    <BtnPetMove/>
                    <BtnEmergency/>
                </div>
            </section>
        </div>
    )
}