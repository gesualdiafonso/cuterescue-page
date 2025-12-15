import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/AdminService";

export default function Eventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        // Chama a função que busca os dados do MongoDB
        const data = await getAllEvents();
        
        // Se o MongoDB retornar um array direto, usamos data. 
        // Se retornar { events: [...] }, usamos data.events
        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Error al cargar los eventos desde la base de datos.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <p className="text-center py-10">Cargando eventos...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl w-full mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {events.map((ev) => (
          // Usamos ev._id ou ev.id para a key
          <article key={ev._id?.$oid || ev.id} className="p-8 rounded-2xl bg-[#22687B] shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-center text-white mb-4">{ev.title}</h2>
              <p className="text-sm text-[#d5d5d5] mb-4">{ev.summary}</p>

              <div className="mt-2 text-xs text-white">
                <strong className="text-[#f7a934]">Ubicaciones:</strong>
                <ul className="list-disc ml-4 mb-5">
                  {/* Ajustado: No seu JSON do Mongo, locations é um array de strings simples */}
                  {ev.locations?.map((loc, i) => (
                    <li key={i}>{loc}</li>
                  ))}
                </ul>

                <strong className="text-[#f7a934]">Acceso / Cronograma:</strong>
                <div className="mb-5 italic">
                  {/* Ajustado: Mapeando os campos do objeto 'schedule' do Mongo */}
                  {ev.schedule?.castracion && <p>• Castración: {ev.schedule.castracion}</p>}
                  {ev.schedule?.vacunacion && <p>• Vacunación: {ev.schedule.vacunacion}</p>}
                </div>

                <strong className="text-[#f7a934]">Requisitos rápidos:</strong>
                <ul className="list-disc ml-4 mb-5">
                  {ev.requirements?.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={ev.link} // No seu Mongo o campo é 'link', não 'source_url'
              target="_blank"
              rel="noreferrer"
              className="bg-[#f7a82a] px-5 py-2 rounded-lg text-white text-xs text-center flex justify-center items-center hover:bg-[#e09621] transition-colors"
            >
              Ver más
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}