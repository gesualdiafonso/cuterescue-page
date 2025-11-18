import { API_URL } from "../config/api";
import { getUserId } from "./UserService";
import AuthServices from "./AuthServices";

const api = AuthServices.getApiInstance();

//-------------------------------------//
//              PET SERVICES          //
//-------------------------------------//

async function fetchPet(){
    const response = await api.get(`${API_URL}/api/pets`);
    const data = response.data;    
    return data;
}

async function fetchPetId(petId){
    const response = await api.get(`${API_URL}/api/pets/${petId}`);
    const data = response.data;
    return data;
}

async function fetchPetsDuenoId(duenoId = getUserId()){
    const response = await api.get(`${API_URL}/api/pets/dueno/${duenoId}`);
    const data = response.data;
    return data;
}

async function fetchChip(petId){
    const response = await api.get(`${API_URL}/api/pets/chip/${petId}`);
    const data = response.data;
    return data;
}

export { fetchPet, fetchPetId, fetchPetsDuenoId, fetchChip };