import React, { createContext, useContext, useEffect, useState } from "react";
import SavedDataService from "../services/SavedDataServices";
import AuthService from "../services/AuthServices";
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

  return (
    <SavedDataContext.Provider
      value={{ user, details, pets, selectedPet, location, alerts, handleSelectPet }}
    >
      {children}
    </SavedDataContext.Provider>
  );
}

export function useSavedData() {
  return useContext(SavedDataContext);
}
