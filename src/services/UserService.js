import { API_URL } from "../config/api";
import AuthServices from "./AuthServices";

const api = AuthServices.getApiInstance();

//-------------------------------------//
//              USER SERVICES         //
//-------------------------------------//


// Fucnión para mudar el userId dinamicamente
export function setUserId(id){
    localStorage.setItem("userId", id)
}

// Pegar el userId actual
export function getUserId(){
    return AuthServices.getUserId();
}

// -----------------------------------//
//              API CALLS              //
//-------------------------------------//

/*async function fetchUser(){
    const response = await fetch(`${API_URL}/api/user`);
    const data = await response.json();
    return data;
}*/

async function fetchUserId(userId = getUserId()){
    const response = await api.get(`${API_URL}/api/user/${userId}`);
    const data = response.data;
    return data;
}

/*async function fetchDetailsUser(){
    const response = await fetch(`${API_URL}/api/user/details`);
    const data = await response.json();
    return data;
}*/

async function fetchDetailsUserId(userId = getUserId()){
    const response = await api.get(`${API_URL}/api/user/${userId}/details`);
    const data = response.data;
    return data;
}

export {fetchUserId, fetchDetailsUserId };