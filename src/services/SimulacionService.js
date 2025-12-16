import api from "./api";

/** Función que converte Lat/Lng en ubicación usando la API de OpenStreatMap */
async function reverseGeocode(lat, lng){
    try{
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            {
                headers:{
                    'Accept-Language': 'es'
                }
            }
        );
        const data = await response.json();
        return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
    } catch (error){
        console.error("Error en geocodificación inversa:", error);
        return "Ubicación desconocida";
    }
}

/** Genera un deslocamiento de aproximadamente 10 metros */
function generateRandomMovement(lat, lng) {
    const distance = 100; // metros
    const earthRadius = 6378137; // m

    const randomAngle = Math.random() * 2 * Math.PI;

    const newLat = lat + (distance * Math.cos(randomAngle)) / earthRadius * (180 / Math.PI);
    const newLng = lng + (distance * Math.sin(randomAngle)) / (earthRadius * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);

    return { lat: newLat, lng: newLng };
}

/** PUT → Actualiza localización */
async function simulatePetMovement(pet_id, currentLat, currentLng) {
    const { lat, lng } = generateRandomMovement(currentLat, currentLng);

    const address = await reverseGeocode(lat, lng);

    const payload = {
        lat,
        lng,
        address,
        movement_detected: true,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await api.put(`/api/locations/simulacion/${pet_id}`, payload);
        console.log("Movimento atualizado com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao simular movimento:", error);
        throw error;
    }
}

/*
    PUT de emergencia para actualizar la localización de una mascota
    activar un estado de alerta, notificando al usuario sobre la emergencia que estás
    ocurriendo con su mascota.
    /api/locations/emergencia/{$pet_id}
*/
async function triggerEmergency(pet_id, currentLat, currentLng) {
    const { lat, lng } = generateRandomMovement(currentLat, currentLng);

    const address = await reverseGeocode(lat, lng);

    const payload = {
        lat,
        lng,
        address,
        movement_detected: true,
        is_safe_location: false,
        timestamp: new Date().toISOString()
    };

    try{
        const response = await api.put(`/api/locations/emergencia/${pet_id}`, payload);
        console.log("Emergencia activada con éxito:", response.data);
        return response.data;
    } catch (error){
        console.error("Error al activar emergencia:", error);
        throw error;
    }
}

export { simulatePetMovement, triggerEmergency };
