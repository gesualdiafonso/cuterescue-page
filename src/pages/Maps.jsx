import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSavedData } from "../context/SavedDataContext";
import Modal from "../components/ui/ModalAlert.jsx";


// Ícone padrão do Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente interno para mover o mapa quando a localização muda
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function Map() {
  const { selectedPet, location, alerts } = useSavedData();
  

  if (!selectedPet)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Selecione um pet para ver no mapa
      </div>
    );

  if (!location || !location.lat || !location.lng)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Carregando localização...
      </div>
    );

  const { nombre, activo, chip_id } = selectedPet;
  const chipActivo = chip_id ? true : false;
  const { address } = location;
  const status = activo ? "Activo" : "Inactivo";
  const position = [location.lat, location.lng];

  return (
    <div className="relative max-h-full h-screen w-full flex flex-col">
      {/* Mapa */}
      <div className="flex-1 z-0">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={position} />
          <Marker position={position}>
            <Popup>
              <strong>{nombre}</strong> 🐾
              <br />
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Info superior */}
      <div className="absolute right-0 z-20 w-1/3 bg-[#22687B]/50 p-5 shadow-md flex flex-col justify-center gap-4 rounded-b-lg ">
        <div>
          <h2 className="text-2xl text-white font-semibold">{nombre}</h2>
          <p className="text-xl text-white">
            Última localização: <span className="font-medium">{address}</span>
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <span
            className={`px-3 py-1 rounded-lg text-white font-light ${
              activo ? "bg-[#71dd5b]" : "bg-gray-400"
            }`}
          >
            {status}
          </span>
          <span
            className={`px-3 py-1 rounded-lg text-white font-light ${
              chipActivo ? "bg-[#007bff]" : "bg-red-400"
            }`}
          >
            Chip: {chipActivo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
}
