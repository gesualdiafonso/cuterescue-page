// Importante al login, cuando hay token, cuando no lo hay, cuando está cargando, cuando es´ta terminado

import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthServices";
import { setAuthToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [token, setToken] = useState(AuthService.getToken());
    const [userId, setUserId] = useState(AuthService.getUserId());
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);

        const t = AuthService.getToken();
        const u = AuthService.getUserId();

        if (t) setAuthToken(t);
        setToken(t);
        setUserId(u);

        setLoading(false);
    }, []);

    async function login(email, password){
        const result = await AuthService.login(email, password);

        if(result.success){
            const newToken = AuthService.getToken();
            const userId = AuthService.getUserId();
            setToken(newToken);
            setUserId(userId);
        }
        
        return result;
    }

    function logout(){
        AuthService.logout();
        setToken(null);
        setUserId(null);
    }

    return(
        <AuthContext.Provider
            value={{
                token,
                userId,
                login,
                logout,
                loading,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}