import React, { createContext, useContext, useEffect, useState } from "react";
import SavedDataService from "../services/SavedDataServices";
import AuthService from "../services/AuthServices";
import { API_URL } from "../config/api";
import { getUserId } from "../services/UserService";

const SavedDataContext = createContext();

export function SavedDataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function initData() {
      const duenoId = AuthService.getUserId(); // pode vir de localStorage
      const { user, details, pets, selectedPet, location, alerts } = await SavedDataService.loadAllData(duenoId);
      setUser(user);
      setPets(pets);
      setDetails(details);
      setSelectedPet(selectedPet);
      setLocation(location);
      setAlerts(alerts);
    }
    initData();
  }, []);

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
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no upload");

      const newPhotoUrl = `${API_URL}${data.fileUrl}`;

      // Atualiza local e globalmente
      setLocalDetails(prev => ({ ...prev, profilePic: newPhotoUrl }));
      setDetails(prev => ({ ...prev, profilePic: newPhotoUrl }));

    } catch (err) {
      console.error("❌ Erro ao subir imagem:", err);
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
        updatedProfilePic
      }}
    >
      {children}
    </SavedDataContext.Provider>
  );
}

export function useSavedData() {
  return useContext(SavedDataContext);
}
