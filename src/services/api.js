// API de instacia ya con el servicio del token cargado
// automaticamente, interceptador en AuthServices.js
import axios from "axios";
import { API_URL } from "../config/api";

const api = axios.create({
    baseURL: API_URL,
});

// Carga el token salvo
export function setAuthToken(token){
    if(token){
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

// Interceptador para agregar el token en las solicitudes automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        //console.log("Token no interceptor:", token);
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Header Authorization adicionado:", config.headers.Authorization);
        } else{
            console.warn("Nenhum token encontrado no localStorage.");
        }
        return config;
    },
    (error) => { return Promise.reject(error); }
);

export default api;