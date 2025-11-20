import { fetchUserId } from "./UserService";
import { fetchDetailsUserId } from "./UserService";
import { fetchPetsDuenoId } from "./PetService";
import { fetchLocationsPets, fecthAlertsByPet } from "./LocationsPets";
import AuthServices from "./AuthServices";

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

  /**
   * Carga todos los datos relacionado a un usuario
   * UserId será opcion: si no pasado, intenta AuthService.getUser() / localStorage
   */
  async loadAllData(userId) {
    // resuelve el duenoId de forma explicita: usa userId recebido o AuthService/localStorage
    const duenoId = userId || AuthServices.getUserId();
    if(!duenoId){
      // no haya id --> retornar estadio vacio sin lanzar
      console.warn("SavedDataService.loadAllData: duenoId no ha sido fornecido");
      return { user: null, details: null, pets: [], selectedPet: null, location: null, alerts: [] }
    }

    

    try {
      // Hace las llamadas en paralelo cuando posible (user + details + pets)
      // PetService ya viene a tratar 404 y retornar[]
      const [ user, details, pets ] = await Promise.all([
        fetchUserId(duenoId).catch(err => {
          console.error("Erro al fetchUserId: ", err?.message || err);
          return null;
        }),
        fetchDetailsUserId(duenoId).catch(err => {
          console.error("Error fetchDetailsUserId: ", err?.message || err);
          return null;
        }),
        fetchPetsDuenoId(duenoId).catch(err => {
          console.error("Erro fetchPetsDuenoId: ", err?.message || err);

          // si algo inesperado succeder, retornar array vacio
          return []
        })
      ]);


      // si no haver pets, devuelve sin buscar localización/alerts
      if (!pets || pets.length === 0) { 
        this.user, 
        this.details, 
        this.pets = [], 
        this.selectedPet = null, 
        this.location = null, 
        this.alerts = [], 
        this.chip = null
        return { user, details, pets: [], selectedPet: null, location: null, alerts: [] }; 
      };

      // si haber pets, seleccionado o primero y busca locations + alerts
      const selectedPet = pets[0];
      // busca locations y alertas
      const [location, alerts] = await Promise.all([
        fetchLocationsPets(selectedPet.id).catch(err => {
          console.error("Erro fetchLocationsPets:", err?.message || err);
          return null;
        }),
        fecthAlertsByPet(selectedPet.id).catch(err => {
          console.error("Erro fecthAlertsByPet:", err?.message || err);
          return [];
        })
      ]);

      // popula el estado interno
      this.user = user;
      this.details = details;
      this.pets = pets;
      this.selectedPet = selectedPet;
      this.location = location;
      this.alets = alerts;


      return { user, details, pets, selectedPet, location, alerts };
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error.message);
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
