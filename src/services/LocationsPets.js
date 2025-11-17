import { API_URL } from "../config/api";
import { fetchPetsDuenoId } from "./PetService";
import { getUserId } from "./UserService";

//-------------------------------------//
//           LOCATIONS PETS SERVICES   //
//-------------------------------------//
async function fetchLocationsPets(pet_id){
    try {
        const response = await fetch(`${API_URL}/api/locations/pets/${pet_id}`);
        if (!response.ok) {
            if (response.status === 404) return null; // Não há localização, retorne null
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erro ao buscar localização:", err);
        return null;
    }
}
async function loadUserPetLocation(duenoId, selectedPetId = null){
    try {
        const pets = await fetchPetsDuenoId(duenoId);
        if (!pets || pets.length === 0) return { pets: [], selectedPet: null, location: null };
        const pet = selectedPetId ? pets.find((p) => p.id === selectedPetId) : pets[0];
        if (!pet) return { pets, selectedPet: null, location: null };
        const location = await fetchLocationsPets(pet.id); // Agora retorna null se 404
        return { pets, selectedPet: pet, location };
    } catch (error) {
        console.error("Erro ao carregar pets e localização:", error);
        return { pets: [], selectedPet: null, location: null };
    }
}

//-----------------------------//
//          Alerts             
//----------------------------//
 async function fecthAlertsByPet(pet_id){
    try{
        const response = await fetch(`${API_URL}/api/alerts/pet/${pet_id}`);
        if(!response.ok) throw new Error("Error al buscar alertas")
        const data = await response.json();
        return data;
    } catch (err){
        console.log("Error al cargar alertas", err)
        return [];
    }
 }

export { loadUserPetLocation, fetchLocationsPets, fecthAlertsByPet }