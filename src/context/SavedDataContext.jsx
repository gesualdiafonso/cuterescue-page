import React, { createContext, useContext, useEffect, useState } from "react";
import SavedDataService from "../services/SavedDataServices";
import AuthService from "../services/AuthServices";
import { API_URL } from "../config/api";
import { getUserId } from "../services/UserService";

const SavedDataContext = createContext();

const api = AuthService.getApiInstance();

export function SavedDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [localDetails, setLocalDetails] = useState(null);
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Novo estado para controlar carregamento


  // Dados iniciais
  useEffect(() => {
    if (!AuthService.isAuthenticated() || isDataLoaded) {
      console.log("Usuário não autenticado ou dados já carregados. Pulando.");
      return;
    }
    async function initData() {
      const duenoId = AuthService.getUserId();
      if (!duenoId) {
        console.error("UserId não encontrado.");
        return;
      }
      try {
        const { user, details, pets, selectedPet, location, alerts } = await SavedDataService.loadAllData(duenoId);
        setUser(user);
        setPets(pets);
        setDetails(details);
        setSelectedPet(selectedPet);
        setLocation(location);
        setAlerts(alerts);
        setIsDataLoaded(true); // Marca como carregado
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    initData();
  }, [isDataLoaded]);

  const reloadData = () => {
    setIsDataLoaded(false); // Reseta para forçar recarregamento
  };
  
  async function handleSelectPet(petId) {
    const { pet, location, alerts } = await SavedDataService.selectPet(petId);
    setSelectedPet(pet);
    setLocation(location);
    setAlerts(alerts)
  }


 async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Corrigido: use api.post (Axios trata status automaticamente)
      const response = await api.post(`${API_URL}/api/upload`, formData);
      const data = response.data;
      const newPhotoUrl = `${API_URL}${data.fileUrl}`;
      // Atualiza apenas no estado (remova setLocalDetails se não usado)
      setDetails(prev => ({ ...prev, profilePic: newPhotoUrl }));
    } catch (err) {
      console.error("❌ Erro ao subir imagem:", err.response?.data || err.message);
    }
  }


  // función global para actualizar la foto de perfil
  function updatedProfilePic(newURL){
    setDetails((prev) => {
      const updated = { ...prev, profilePic: newURL };
      localStorage.setItem("userDetails", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <SavedDataContext.Provider
      value={{ 
        user, 
        details, 
        setDetails, 
        pets, 
        selectedPet, 
        location, 
        alerts, 
        handleSelectPet,
        updatedProfilePic,
        reloadData
      }}
    >
      {children}
    </SavedDataContext.Provider>
  );
}

export function useSavedData() {
  return useContext(SavedDataContext);
}
