import { fetchPetsDuenoId } from "./PetService";
import api from "./api";


//-------------------------------------//
//           LOCATIONS PETS SERVICES   //
//-------------------------------------//
async function fetchLocationsPets(pet_id){
    try {
        console.log("Fazendo uma request para:", `/api/locations/pets/${pet_id}`);
        const response = await api.get(`/api/locations/pets/${pet_id}`);
        console.log("Resposta recebida:", response.status, response.data);
        return response.data;
    } catch (err) {
        console.error("Erro ao buscar localização:", err);
        if(err.response?.status === 404){
            console.warn("Nenhuma localização encontrada para o pet com ID:", pet_id);
            return null;
        }
        if(err.response?.status === 401){
            console.warn("Não autorizado. Verifique o token de autenticação.");
        }
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
        const response = await api.get(`/api/alerts/pet/${pet_id}`);
        const data = response.data;
        return data;
    } catch (err){
        console.log("Error al cargar alertas", err)
        return [];
    }
 }

export { loadUserPetLocation, fetchLocationsPets, fecthAlertsByPet }