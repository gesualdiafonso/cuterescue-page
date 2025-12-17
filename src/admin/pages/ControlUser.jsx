import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/AdminService";// Assumindo que este caminho está correto
import { Link, useNavigate } from "react-router-dom"; // Importar hooks de navegação
import Loading from "../../components/Loading";

export default function ControlUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Função para carregar os usuários
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                // A API de /api/user retorna uma lista de objetos User
                setUsers(data); 
            } catch (err) {
                console.error("Erro ao buscar usuários:", err);
                setError("Não foi possível carregar a lista de usuários.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleViewDetails = (userId) => {
        // Navega para a rota de detalhes do usuário
        navigate(`/admin/detalles-usuario/${userId}`);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="p-4 text-red-600">Erro: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">
                Controle de Usuários
            </h2>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID do Usuário
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            // Assumindo que o objeto user tem as propriedades 'userId' e 'email'
                            <tr key={user.id}> 
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetails(user.id)}
                                        className="text-[#007dc4] hover:text-[#2ec6f0] hover:bg-[#007dc4] font-semibold py-1 px-3 border border-[#cce7ff] rounded-md transition duration-150 ease-in-out"
                                    >
                                        Ver Usuário
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {users.length === 0 && !loading && (
                <p className="p-4 text-gray-500">Nenhum usuário encontrado.</p>
            )}

        </div>
    );
}