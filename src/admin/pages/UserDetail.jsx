import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails, getPetById } from "../../services/AdminService";
import Loading from "../../components/Loading"

export default function UserDetail() {
    const { userId } = useParams(); // Pega o :id da URL (que é o userId)
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [petsDetails, setPetsDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Função principal de orquestração
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // 1. Busca os detalhes do usuário (que inclui a lista de IDs de pets)
                const detailsData = await getUserDetails(userId);
                setUserDetails(detailsData);
                
                // 2. Processa a busca dos detalhes dos pets
                if (detailsData.pets && detailsData.pets.length > 0) {
                    // Mapeia os IDs dos pets para uma lista de Promises de busca de detalhes
                    const petsPromises = detailsData.pets.map(petId => getPetById(petId));
                    
                    // Espera que todas as Promises de pets resolvam (busca paralela)
                    const resolvedPets = await Promise.all(petsPromises);
                    setPetsDetails(resolvedPets);
                }
            } catch (err) {
                console.error(`Erro ao buscar detalhes do usuário ${userId}:`, err);
                setError("Não foi possível carregar os detalhes do usuário ou dos pets.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]); // Executa novamente se o userId mudar

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="max-w-4xl mx-auto p-4 text-red-600">Erro: {error}</div>;
    }
    
    if (!userDetails) {
        return <div className="max-w-4xl mx-auto p-4 text-gray-500">Detalles de usuarios no fue encontrado.</div>;
    }

    // Estruturação dos dados para exibição
    const { nombre, fecha_nacimiento, genero, documento, telefono, ubicacion } = userDetails;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-[#ffaa2e] hover:text-[#ffc78c] font-medium"
            >
                &larr; Volver para la Lista de Usuarios
            </button>
            
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">
                Detalles del Usuario: {nombre}
            </h2>

            {/* --- Dados Pessoais --- */}
            <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Informaciones Personales</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="font-medium text-gray-500">Id:</dt>
                    <dd className="text-gray-900 break-all">{userId}</dd>

                    <dt className="font-medium text-gray-500">Nombre Completo:</dt>
                    <dd className="text-gray-900">{nombre}</dd>

                    <dt className="font-medium text-gray-500">Data de Nascimiento:</dt>
                    <dd className="text-gray-900">{fecha_nacimiento}</dd>

                    <dt className="font-medium text-gray-500">Genero:</dt>
                    <dd className="text-gray-900">{genero}</dd>

                    <dt className="font-medium text-gray-500">Documento ({userDetails.tipo_documento}):</dt>
                    <dd className="text-gray-900">{documento}</dd>

                    <dt className="font-medium text-gray-500">Teléfone:</dt>
                    <dd className="text-gray-900">{telefono}</dd>
                </dl>
            </div>

            {/* --- Localização --- */}
            <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Ubicación</h3>
                <p className="text-gray-900">{ubicacion.address}</p>
                <p className="text-sm text-gray-500 mt-1">
                    Lat: {ubicacion.lat}, Lng: {ubicacion.lng}
                </p>
            </div>

            {/* --- Detalhes dos Pets --- */}
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Mascotas Registradas</h3>
                {petsDetails.length === 0 ? (
                    <p className="text-gray-500">Este usuario no pose mascotas registrada todavía.</p>
                ) : (
                    <ul className="list-disc ml-5 space-y-2">
                        {petsDetails.map((pet, index) => (
                            // Assumindo que o objeto pet retornado por getPetById tem uma propriedade 'nombre' e 'petId'
                            <li key={pet._id || index} className="text-gray-900">
                                <span className="font-medium">{pet.nombre}</span> (ID: {pet.petId || pet._id})
                                {/* Você pode adicionar um botão para ver detalhes do pet aqui, se necessário */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}