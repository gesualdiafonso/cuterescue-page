import { API_URL } from "../config/api";

//-------------------------------------//
//              USER SERVICES         //
//-------------------------------------//

let currentUserId = "95667d03c662aec9";

// Fucnión para mudar el userId dinamicamente
export function setUserId(id){
    currentUserId = id;
}

// Pegar el userId actual
export function getUserId(){
    return currentUserId;
}

// -----------------------------------//
//              API CALLS              //
//-------------------------------------//

async function fetchUser(){
    const response = await fetch(`${API_URL}/api/user`);
    const data = await response.json();
    return data;
}

async function fetchUserId(userId = currentUserId){
    const response = await fetch(`${API_URL}/api/user/${userId}`);
    const data = await response.json();
    return data;
}

async function fetchDetailsUser(){
    const response = await fetch(`${API_URL}/api/user/details`);
    const data = await response.json();
    return data;
}

async function fetchDetailsUserId(userId = currentUserId){
    const response = await fetch(`${API_URL}/api/user/${userId}/details`);
    const data = await response.json();
    return data;
}

export { fetchUser, fetchUserId, fetchDetailsUser, fetchDetailsUserId };