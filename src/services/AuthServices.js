import { API_URL } from "../config/api";
import axios from "axios"

const api = axios.create({
    baseURL: API_URL,
});

// Interceptador para agregar el token en las solicitudes automaticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("Token no interceptor:", token);
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


class AuthService{
    constructor(){
        this.tokenKey = "token";
        this.userIdKey = "userId";
    }

    // Login
    async login(email, password){
        try{
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });

            const { token, user } = response.data;

            // Salva no LocalStorage
            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem(this.userIdKey, user.id);

            return{ success: true, user };
        } catch(error){
            console.error("Erro al realizar login: ", error.response?.data || error.message);
            return {
                success: false,
                message: error.response?.data?.message || "Error de login"
            }
        }
    }

    // Register
    async register(email, password){
        try {
            const response = await axios.post(`${API_URL}/api/user`, {
                email,
                password
            });
            return {
                success: true,
                user: response.data
            }
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.response?.data || error.message); // Corrigido: removido "console.log"
            return { 
                success: false, 
                message: error.response?.data?.message || "Erro ao registrar" 
            };
        }
    }

    // Logout
    logout(){
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userIdKey);
    }

    // Pegar el token
    getToken(){
        return localStorage.getItem(this.tokenKey);
    }

    // Pegar user Id
    getUserId(){
        return localStorage.getItem(this.userIdKey);
    }

    // Verifica se está logando
    isAuthenticated(){
        return !!this.getToken();
    }

    getApiInstance(){
        return api;
    }
}

export default new AuthService();