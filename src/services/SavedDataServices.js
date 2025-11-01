import { fetchUserId } from "./UserService";
import { fetchDetailsUserId } from "./UserService";
import { fetchPetsDuenoId } from "./PetService";
import { fetchLocationsPets } from "./LocationsPets";

class SavedDataService {
  constructor() {
    this.user = null;
    this.details = null;
    this.pets = [];
    this.selectedPet = null;
    this.location = null;
  }

  async loadAllData(duenoId) {
    try {
      const user = await fetchUserId(duenoId);
      const pets = await fetchPetsDuenoId(duenoId);
      const details = await fetchDetailsUserId(duenoId);

      if (!pets.length) return { user, details, pets: [], selectedPet: null, location: null };

      const selectedPet = pets[0];
      const location = await fetchLocationsPets(selectedPet.id);

      this.user = user;
      this.pets = pets;
      this.details = details;
      this.selectedPet = selectedPet;
      this.location = location;

      return { user, details, pets, selectedPet, location };
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      return { user: null, details: null, pets: [], selectedPet: null, location: null };
    }
  }

  async selectPet(petId) {
    const pet = this.pets.find(p => p.id === petId);
    if (!pet) return;

    const location = await fetchLocationsPets(pet.id);
    this.selectedPet = pet;
    this.location = location;

    return { pet, location };
  }
}

export default new SavedDataService();
