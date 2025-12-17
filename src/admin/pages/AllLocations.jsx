import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getLocations, getEnrichedLocationData } from "../../services/AdminService";
import Loading from "../../components/Loading";

// Corrigir o ícone padrão do Leaflet, pois o Webpack/React pode ter problemas
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente principal para a página de todas as localizações
export default function AllLocations(){
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ponto central padrão para o mapa (e.g., Buenos Aires, Argentina - do seu exemplo)
    const defaultCenter = useMemo(() => ([-34.6037, -58.3816]), []); 

    useEffect(() => {
        async function fetchAllLocationsAndDetails() {
            setLoading(true);
            setError(null);
            try {
                // 1. Buscar todas as localizações base
                const rawLocations = await getLocations();

                // 2. Enriquecer cada localização com os dados do Pet e do Dono
                // Usamos Promise.all para executar todas as chamadas em paralelo, o que é mais rápido.
                const enrichedLocationsPromises = rawLocations.map(loc => 
                    getEnrichedLocationData(loc)
                );
                
                const enrichedLocations = await Promise.all(enrichedLocationsPromises);
                
                setLocations(enrichedLocations);

            } catch (err) {
                console.error("Falha ao buscar ou enriquecer localizações:", err);
                setError("Não foi possível carregar os dados de todas as localizações.");
            } finally {
                setLoading(false);
            }
        }

        fetchAllLocationsAndDetails();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div style={{ padding: "20px", color: "red" }}>Erro: {error}</div>;
    }
    
    // O mapa só é renderizado se tivermos dados
    return(
        <div className="w-full h-screen relative">
            <div className="bg-[#007dc4]/50 absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-md text-white text-center shadow-lg max-w-md">
                <h2>📍 Todas las localizaciones de las Mascotas Registradas Con Id de usuarios</h2>
                <p>Total : <strong className="text-[#ffca2e]">{locations.length}</strong></p>
            </div>
            
            <div className="relative z-10 w-full h-full">
                <MapContainer 
                    center={defaultCenter} 
                    zoom={10} 
                    style={{ height: "100%", width: "100%"}}
                    scrollWheelZoom={true} // Permitir zoom com a roda do mouse
                >
                    {/* Camada base do OpenStreetMap */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* Renderizar os marcadores para cada localização */}
                    {locations.map((location) => (
                        <Marker 
                            key={location._id.$oid || location._id} 
                            position={[location.lat, location.lng]}
                        >
                            {/* Popup que aparece ao clicar no marcador */}
                            <Popup>
                                <div>
                                    <h4>Mascota: {location.pet_name}</h4>
                                    <p>Dueño: {location.dueno_name}</p>
                                    <p>Endereço: {location.address}</p>
                                    <p>Localización segura: {location.is_safe_location ? "Sim" : "Não"}</p>
                                    <small>ID Pet: {location.pet_id}</small><br/>
                                    <small>ID Dono: {location.dueno_id}</small>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}