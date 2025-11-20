import { API_URL } from "../config/api";
import AuthServices from "./AuthServices";
import api from "./api";

//-------------------------------------//
//              USER SERVICES         //
//-------------------------------------//


// Fucnión para mudar el userId dinamicamente
export function setUserId(id){
    localStorage.setItem("userId", id)
}

// Pegar el userId actual
export function getUserId(){
    // hagamos un AuthServices
    if (AuthServices && typeof AuthServices.getUserId === "function"){
        const id = AuthServices.getUserId();
        if (id) return id;
    }

    //fallback al localStorage
    return localStorage.getItem("userId");
}

// -----------------------------------//
//              API CALLS              //
//-------------------------------------//

async function fetchUserId(userId = getUserId()){
    const response = await api.get(`/api/user/${userId}`);
    const data = response.data;
    return data;
}


async function fetchDetailsUserId(userId = getUserId()){
    const response = await api.get(`/api/user/${userId}/details`);
    const data = response.data;
    return data;
}

export {fetchUserId, fetchDetailsUserId };