import React, { createContext, useContext, useEffect, useState } from "react";
import SavedDataService from "../services/SavedDataServices";
import { useAuth } from "./AuthContext";


const SavedDataContext = createContext();


export function SavedDataProvider({ children }) {

  const { userId, isAuthenticated, loading } = useAuth();

  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  //const [localDetails, setLocalDetails] = useState(null);
  const [location, setLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const [loaded, setLoaded] = useState(false); // Novo estado para controlar carregamento


  // Dados iniciais
  useEffect(() => {
    if (loading) return;
    // console.log("SavedDataContext - isAuthenticated:", isAuthenticated, "userId:", userId, "loaded:", loaded);
    if (!isAuthenticated) return;

    // intenta user userId del auth, si no haber, intenta cargar 
    if (loaded) return;

    async function load() {
      try {
        const result = await SavedDataService.loadAllData(userId);

        setUser(result.user);
        setDetails(result.details);

        setPets(result.pets || []);
        setSelectedPet(result.selectedPet || null);
        setLocation(result.location || null);

        setAlerts(result.alerts || []);

      } catch (err) {

        console.error("SavedDataContext.load erro:", err);

      } finally {

        setLoaded(true);

      }
    }

    load();

  }, [isAuthenticated, userId, loaded, loading]);

  const reloadData = () => {
    setLoaded(false); // Reseta para forçar recarregamento
  };
  
  async function handleSelectPet(petId) {
    const { pet, location, alerts } = await SavedDataService.selectPet(petId);
    setSelectedPet(pet);
    setLocation(location);
    setAlerts(alerts)
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
