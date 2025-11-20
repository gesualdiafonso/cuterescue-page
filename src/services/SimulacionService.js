import api from "./api";

/** Genera un deslocamiento de aproximadamente 10 metros */
function generateRandomMovement(lat, lng) {
    const distance = 10; // metros
    const earthRadius = 6378137; // m

    const randomAngle = Math.random() * 2 * Math.PI;

    const newLat = lat + (distance * Math.cos(randomAngle)) / earthRadius * (180 / Math.PI);
    const newLng = lng + (distance * Math.sin(randomAngle)) / (earthRadius * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);

    return { lat: newLat, lng: newLng };
}

/** PUT → Actualiza localización */
async function simulatePetMovement(pet_id, currentLat, currentLng) {
    const { lat, lng } = generateRandomMovement(currentLat, currentLng);

    const payload = {
        lat,
        lng,
        movement_detected: true,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await api.put(`/api/locations/${pet_id}`, payload);
        console.log("Movimento atualizado com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao simular movimento:", error);
        throw error;
    }
}

export { simulatePetMovement };
