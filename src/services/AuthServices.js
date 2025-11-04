import { API_URL } from "../config/api";
import axios from "axios"

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
            console.logconsole.error("Erro ao registrar usuário:", error.response?.data || error.message);
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
    getTonken(){
        return localStorage.getItem(this.tokenKey);
    }

    // Pegar user Id
    getUserId(){
        return localStorage.getItem(this.userIdKey);
    }

    // Verifica se está logando
    isAuthenticated(){
        return !!this.getTonken();
    }
}

export default new AuthService();