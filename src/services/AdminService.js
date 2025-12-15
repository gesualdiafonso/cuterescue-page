// Servicio contemplado para Admin de la API
import AuthServices from "./AuthServices";
import api from "./api";

// ***************************** //
//         Control Usuarios      //
// ***************************** //

// Pegar todos los usuarios desde API Users
export async function getUsers(){
    const response = await api.get("/api/user");
    return response.data;
}

// Pegar el numero total de usuarios desde API Admin
export async function getCountUsers(){
    const response = await api.get("/api/admin/user");
    return response.data;
}

// Pegar e ir até o usuario Id para ver, dede API de Usuarios :id
export async function getUserById(userId){
    const response = await api.get(`/api/user/${userId}`);
    return response.data
}

// Función para obtener detalles adicionales del usuario desde la API
// inlcuye pets id, asociados a ese usuario
export async function getUserDetails(userId){
    // Note: Esta rota requer o 'verifyToken', então garanta que o 'api' lida com isso.
    const response = await api.get(`/api/user/${userId}/details`); 
    return response.data;
}

// ***************************** //
//      Control Mascotas/Pets    //
// ***************************** //


// Pegar todos las mascotas desde API Pets
export async function getPets(){
    const response = await api.get("/api/pets");
    return response.data; 
}

// Pegar total de las mascotas desde API admin
export async function getCountPets(){
    const response = await api.get("/api/admin/pets");
    return response.data;
}

// Pegar todo mascota desde API Pets según sú :id
export async function getPetById(petId){
    const response = await api.get(`/api/pets/${petId}`);
    return response.data
}

// Pega todas las mascotasa según el Id de usuarios
export async function getPetsByUser(userId){
    const response = await api.get(`/api/admin/pets/by-user/${userId}`);
    return response.data;
}

// ***************************** //
//       Control Locations       //
// ***************************** //

// Pega todos los valores de localización de toda mascota
// NOTE: la idea es hacer con que renderize la ubicación en mapa
// mostre la ubicación que están 
export async function getLocations(){
    const response = await api.get("/api/locations");
    return response.data;
}

export async function getCountLocations(){
    const response = await api.get("/api/admin/locations");
    return response.data;
}

// Idea también es crear una función a parte que traga información de mascota según id para la ubicación
// y información del usuario según el id de cada locations adentro de MongoDB
export async function informeByLocation(){}

// Função para buscar e juntar os detalhes do Pet e do Usuário para UMA localização
export async function getEnrichedLocationData(location) {
    try {
        // 1. Buscar detalhes do Pet
        const petData = await getPetById(location.pet_id);
        const petName = petData ? petData.nombre : "Pet Desconhecido"; // Assumindo que 'petData' tem um campo 'name'

        // 2. Buscar detalhes do Usuário (Dono)
        // Usamos getUserDetails que você mencionou que traz informações detalhadas.
        const userData = await getUserDetails(location.dueno_id);
        const duenoName = userData ? userData.nombre : "Dono Desconhecido"; // Assumindo que 'userData' tem um campo 'name'

        // Retorna a localização original enriquecida
        return {
            ...location,
            pet_name: petName,
            dueno_name: duenoName,
        };
    } catch (error) {
        console.error("Erro ao enriquecer dados da localização:", location._id, error);
        // Retorna a localização original com nomes de fallback em caso de falha
        return {
            ...location,
            pet_name: "ERRO: Pet/Info",
            dueno_name: "ERRO: Dono/Info",
        };
    }
}

// ***************************** //
//       Control Eventos         //
// ***************************** //

// pegar todos los eventos en amdmin y también llevar el evento hacia usuarios
export async function getEvents(){
    const response = await api.get("/api/admin/events");
    return response.data;
}

export async function getAllEvents(){
    const response = await api.get("/api/eventos");
    return response.data;
}

// Crear eventos
export async function createEvents(eventData){
    const response = await api.post("/api/admin/events", eventData);
    return response.data;
}

// Editar un evento
export async function editEvents(eventId, eventData){
    const response = await api.put(`/api/admin/events/${eventId}`, eventData);
    return response.data;
}

// Deletar a un Evento
export async function deleteEvents(eventId){
    const response = await api.delete(`/api/admin/events/${eventId}`);
    return response.data;
}

