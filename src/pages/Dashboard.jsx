import React, { useEffect } from "react";
import MapHomePet from "../components/maps/MapHomePet";
import MapPet from "../components/maps/MapPet";
import PersonalInform from "../components/PersonalInform";
import PetCards from "../components/ui/PetCards";
import BtnPetMove from "../components/ui/BtnPetMove";
import { useSavedData } from "../context/SavedDataContext";

function Home() {
  const { pets, selectedPet, location, handleSelectPet } = useSavedData();

 

  return (
    <div className="max-w-7xl mx-auto p-0">
      <section className="flex gap-20 mb-10 w-full">
        <PersonalInform />
        <div className="flex flex-col gap-5 w-1/2">
          <MapHomePet selectedPet={selectedPet} location={location} />
          <BtnPetMove />
        </div>
      </section>

      <div className="bg-black w-full h-0.5 my-10" />

      <section className="flex gap-20 mb-10 w-full justify-center items-center">
        <PetCards
          pets={pets}
          selectedPet={selectedPet}
          setSelectedPet={(pet) => handleSelectPet(pet.id)}
        />
        <MapPet selectedPet={selectedPet} location={location} />
      </section>
    </div>
  );
}

export default Home;
