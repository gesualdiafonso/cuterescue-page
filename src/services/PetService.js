import { API_URL } from "../config/api";
import { getUserId } from "./UserService";
import api from "./api";

//-------------------------------------//
//              PET SERVICES          //
//-------------------------------------//

async function fetchPet(){
    const response = await api.get(`/api/pets`);
    const data = response.data;    
    return data;
}

async function fetchPetId(petId){
    const response = await api.get(`/api/pets/${petId}`);
    const data = response.data;
    return data;
}

/**
 * Busca pets por el duneoId
 * Si la API responder 404, retornará array vacio
 * si houver otro erro, se termina
 */

async function fetchPetsDuenoId(duenoId){
    //const response = await api.get(`/api/pets/dueno/${duenoId}`);
    //const data = response.data;
    //return data;
    try{
        const response = await api.get(`/api/pets/dueno/${duenoId}`);
        return response.data || null
    }catch (erro){
        // Si la API retornar 404 --> retornar vacio
        if(erro.response && erro.response.status === 404){
            return[];
        }
        throw erro;
    }
}

async function fetchChip(petId){
    const response = await api.get(`/api/pets/chip/${petId}`);
    const data = response.data;
    return data;
}

export { fetchPet, fetchPetId, fetchPetsDuenoId, fetchChip };