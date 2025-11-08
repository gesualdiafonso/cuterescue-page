import React from "react";

export default function Modal({ alert, onClose }) {
  const colors = {
    emergency_escape: "bg-red-600",
    walking_simulation: "bg-yellow-500",
    last_movement_simulation: "bg-blue-500",
  };

  const titles = {
    emergency_escape: "🚨 Emergência!",
    walking_simulation: "🐾 Movimento detectado",
    last_movement_simulation: "📍 Último movimento",
  };

  const color = colors[alert.type] || "bg-gray-500";
  const title = titles[alert.type] || "Alerta";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-xl shadow-lg text-white ${color} w-96`}>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-lg">{alert.message}</p>
        {alert.location && (
          <p className="mt-2 text-sm opacity-80">
            Local: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
          </p>
        )}
        <button
          className="mt-4 bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
