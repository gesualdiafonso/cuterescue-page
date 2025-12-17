import React, {useEffect} from "react"
import PetCards from "../components/ui/PetCards"
import DetailsInform from "../components/DetailsInform"
import { useSavedData } from "../context/SavedDataContext"

export default function DetailsUser(){

     const { pets, selectedPet, handleSelectPet } = useSavedData();
    
     

    return(
        <div className="max-w-7xl mx-auto">
            <section>
                <DetailsInform />
            </section>
            <div className="bg-black w-full h-0.5 my-10"/>
            <section className="py-5 px-3">
                <PetCards
                    pets={pets}
                    selectedPet={selectedPet}
                    setSelectedPet={(pet) => handleSelectPet(pet.id)}
                    />
            </section>
        </div>
    )
}