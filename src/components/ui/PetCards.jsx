import React from "react";

export default function PetCards({ pets = [], selectedPet, setSelectedPet }) {
  if (!pets || pets.length === 0) return <div>Loading pets...</div>;

  return (
    <div className="w-full flex gap-10">
      {pets.map((pet) => {
        const { nombre, activo, home_location } = pet;
        const ubicacion = home_location ? home_location.address : "Ubicación no disponible";
        const status = activo ? "Activo" : "Inactivo";

        const isSelected = selectedPet?.id === pet.id;

        return (
          <article
            key={pet._id}
            onClick={() => setSelectedPet(pet)}
            className={`bg-[#22687b] w-full rounded-3xl h-auto p-5 flex justify-center flex-col cursor-pointer hover:scale-105 transition-transform
              ${isSelected ? "ring-4 ring-[#71dd5b]/40" : ""}`}
          >
            <div className="w-full h-52 mb-5 bg-gray-50 rounded-xl overflow-hidden">
              <img src={pet.foto_url || "#"} alt={nombre} className="w-full h-full object-cover" />
            </div>
            <div className="text-white flex flex-col justify-center">
              <h4>{nombre}</h4>
              <span>
                <strong className="text-orange-300">Status: </strong>
                <span className="bg-[#71dd5b] text-white px-2 text-center rounded-lg font-light">{status}</span>
              </span>
              <strong className="text-orange-300">Ubicación:</strong>
              <span>{ubicacion}</span>
            </div>
          </article>
        );
      })}

      <article className="bg-[#f5f5dc]/50 w-full rounded-3xl flex flex-col justify-center items-center">
        <span>+</span>
        <p>Agregar más pet</p>
      </article>
    </div>
  );
}
