import { API_URL } from "../config/api";
import axios from "axios"
import api, { setAuthToken } from "./api";

class AuthService{
    tokenKey = "token";
    userIdKey = "userId";

    constructor(){
        // Inicializa o serviço de API com interceptadores
        const token = localStorage.getItem(this.tokenKey);
        if(token) setAuthToken(token);
    }

    // Login
    async login(email, password){
        try {
            const response = await api.post(`/api/auth/login`, { email, password });
            const { token, user } = response.data;

            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem(this.userIdKey, user.id);
            localStorage.setItem("role", user.role);
            setAuthToken(token);

            return { success: true, user };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Erro ao realizar login"
            };
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

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userIdKey);
        setAuthToken(null);
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
    
    isAdmin(){
        return localStorage.getItem("role") === 'admin';
    }
}

export default new AuthService();