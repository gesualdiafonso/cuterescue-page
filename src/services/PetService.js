import { API_URL } from "../config/api";
import { getUserId } from "./UserService";

async function fetchPet(){
    const response = await fetch(`${API_URL}/api/pets`);
    const data = await response.json();
    return data;
}

async function fetchPetId(petId){
    const response = await fetch(`${API_URL}/api/pets/${petId}`);
    const data = await response.json();
    return data;
}

async function fetchPetsDuenoId(duenoId = getUserId()){
    const response = await fetch(`${API_URL}/api/pets/dueno/${duenoId}`);
    const data = await response.json();
    return data;
}

async function fetchChip(petId){
    const response = await fetch(`${API_URL}/api/pets/chip/${petId}`);
    const data = await response.json();
    return data;
}

export { fetchPet, fetchPetId, fetchPetsDuenoId, fetchChip };