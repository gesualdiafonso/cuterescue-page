import { fetchUserId } from "./UserService";
import { fetchDetailsUserId } from "./UserService";
import { fetchPetsDuenoId } from "./PetService";
import { fetchLocationsPets, fecthAlertsByPet } from "./LocationsPets";


class SavedDataService {
  constructor() {
    this.user = null;
    this.details = null;
    this.pets = [];
    this.selectedPet = null;
    this.location = null;
    this.chip = null;
    this.alets = [];
  }

  async loadAllData(duenoId) {
    try {
      const user = await fetchUserId(duenoId);
      const pets = await fetchPetsDuenoId(duenoId);
      const details = await fetchDetailsUserId(duenoId);

      if (!pets.length) return { user, details, pets: [], selectedPet: null, location: null, alerts: [], chip: null  };

      const selectedPet = pets[0];
      const location = await fetchLocationsPets(selectedPet.id);
      const alerts = await fecthAlertsByPet(selectedPet.id);

      this.user = user;
      this.pets = pets;
      this.details = details;
      this.selectedPet = selectedPet;
      this.location = location;
      this.alets = alerts;


      return { user, details, pets, selectedPet, location, alerts };
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      return { user: null, details: null, pets: [], selectedPet: null, location: null, alerts: null };
    } 
  }

  async selectPet(petId) {
    const pet = this.pets.find(p => p.id === petId);
    if (!pet) return;

    const location = await fetchLocationsPets(pet.id);
    const alerts = await fecthAlertsByPet(pet.id);

    this.selectedPet = pet;
    this.location = location;
    this.alerts = alerts;

    return { pet, location, alerts };
  }
}

export default new SavedDataService();
