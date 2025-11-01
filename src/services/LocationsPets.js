import { API_URL } from "../config/api";
import { fetchPetsDuenoId } from "./PetService";
import { getUserId } from "./UserService";

//-------------------------------------//
//           LOCATIONS PETS SERVICES   //
//-------------------------------------//
async function fetchLocationsPets(pet_id){
    const response = await fetch(`${API_URL}/api/locations/pets/${pet_id}`);
    const data = await response.json();
    return data;
}

async function loadUserPetLocation(duenoId, selectedPetId = null){
    try{
        // Vamos bucar todos los pets del dueno

        const pets = await fetchPetsDuenoId(duenoId);

        if(!pets || pets.length === 0) return { pets: [], location: null };

        // Define el pet selecionado
        const pet = selectedPetId ? pets.find((p) => p.id === selectedPetId) : pets[0];

        if(!pet) return { pets, location: null };

        // Busca la ubicación del pet selecionado
        const location = await fetchLocationsPets(pet.id);

        return{ pets, selectedPet: pet, location };
    } catch(error){
        console.error("Erro al cargar los pets y su ubicación", error);
        return { pets: [], selectedPet: null, location: null };
    }
}

export { loadUserPetLocation, fetchLocationsPets }