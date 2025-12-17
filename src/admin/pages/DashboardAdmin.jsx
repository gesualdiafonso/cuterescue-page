import React, { useEffect, useState} from "react";
import { getCountPets, getCountUsers, getEvents, getLocations, getCountLocations, getPets, getUsers } from "../../services/AdminService";
import Loading from "../../components/Loading";

// Importações do Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro dos componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function DashboardAdmin(){
    const [stats, setStats] = useState({ 
        countUsers: 0,
        countPets: 0,
        countLocations: 0,
        allUsers: [],
        allPets: [],
        allEvents: [],
        allLocations: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData(){
            try {
                setLoading(true);
                const usersCountData = await getCountUsers();
                const petsCountData = await getCountPets();
                const locationsCountData = await getCountLocations();
                const allUsers = await getUsers();
                const allPets = await getPets();
                const allEvents = await getEvents();
                const allLocations = await getLocations();
                setStats({
                    countUsers: usersCountData,
                    countPets: petsCountData,
                    countLocations: locationsCountData,
                    allUsers: allUsers,
                    allPets: allPets,
                    allEvents,
                    allLocations
                });
            } catch (error) {
                console.error("Erro al cargar los datos del admin")
                console.log(error);
            } finally{
                setLoading(false);
            }
        }

        loadData();
    }, []);

    // Configuração dos dados do gráfico
    const chartData = {
        labels: ['Usuários', 'Pets', 'Localizações'],
        datasets: [
            {
                label: 'Total Registrado',
                data: [stats.countUsers.total, stats.countPets.total, stats.countLocations.total],
                backgroundColor: [
                    'rgba(204, 231, 255, 0.6)', // Azul
                    'rgba(255, 199, 140, 0.6)', // Rosa
                    'rgba(46, 124, 111, 0.6)', // Verde
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Estatísticas Gerais do Sistema' },
        },
    };

    
    if (loading) {
        return <Loading />;
    }

    return(
    <div className="max-w-7xl mx-auto p-0">
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

            {/* AREA DO GRÁFICO */}
            <div className="bg-white p-4 shadow rounded-lg mb-10 w-full" style={{ height: '400px' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10 w-full">
                <div className="p-4 bg-[#2ec6f0] rounded-lg text-center text-[#f8f8f8]">
                    <p className="text-sm">Usuários</p>
                    <p className="text-2xl font-bold">{stats.countUsers.total}</p>
                </div>
                <div className="p-4 bg-[#ffc78c] rounded-lg text-center text-[#f8f8f8]">
                    <p className="text-sm">Pets</p>
                    <p className="text-2xl font-bold">{stats.countPets.total}</p>
                </div>
                <div className="p-4 bg-[#20b2aa] rounded-lg text-center text-[#f8f8f8]">
                    <p className="text-sm">Localizações</p>
                    <p className="text-2xl font-bold">{stats.countLocations.total}</p>
                </div>
            </div>

        </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-8">
                {/* TABELA DE USUÁRIOS */}
                <div className="bg-white shadow-2xl border border-transparent rounded-2xl h-66 overflow-y-auto">
                    <h2 className="mt-6 px-5 text-2xl font-bold mb-6 text-center">Todos Usuarios Registrado</h2>
                    <table className="min-w-full divide-y divide-cyan-500 mt-2 rounded-2xl">
                        <thead>
                            <tr className="bg-[#22677a]">
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats.allUsers.map(user => (
                                <tr key={user._id} className=" hover:bg-cyan-400 hover:text-[#f8f8f8] hover:border-[#007dc4]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><span className="bg-emerald-500 px-4 py-2 rounded-full text-center">{user.activo}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* TABELA DE PETS */}
                <div className="bg-white shadow-2xl border border-transparent rounded-2xl h-66 overflow-y-auto">
                    <h2 className="mt-6 px-5 text-2xl font-bold mb-6 text-center">Todos datos de mascotas</h2>
                    <table className="min-w-full divide-y divide-gray-200 mt-2 rounded-2xl">
                        <thead>
                            <tr className="bg-[#22677a]">
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Espécie</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Dono (ID)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.allPets.map(pet => (
                                <tr key={pet._id} className="hover:bg-cyan-400 hover:text-[#f8f8f8] hover:border-[#007dc4]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{pet.nombre || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{pet.raza || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{pet.dueno_id || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {/* TABELA DE LOCATIONS */}
            <div className="space-y-8">
                <div className="bg-white shadow-2xl border border-transparent rounded-2xl h-66 overflow-y-auto">
                    <h2 className="mt-6 px-5 text-2xl font-bold mb-6 text-center">Control de ubicaicón</h2>
                    <table className="min-w-full divide-y divide-gray-200 mt-2 rounded-2xl">
                        <thead>
                            <tr className="bg-[#22677a]">
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Ubicación</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Pet Id</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Dono (ID)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.allLocations.map(pet => (
                                <tr key={pet._id} className=" hover:bg-cyan-400 hover:text-[#f8f8f8] hover:border-[#007dc4]">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.address || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.pet_id || "N/A"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.dueno_id || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {/* Eventos */}
                    <div className="bg-white shadow-2xl border border-transparent rounded-2xl h-66 overflow-y-auto">
                        <h2 className="mt-6 px-5 text-2xl font-bold mb-6 text-center">Control de Eventos</h2>
                        <table className="min-w-full divide-y divide-gray-200 mt-2 rounded-2xl">
                            <thead>
                                <tr className="bg-[#22677a]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Titulo del evento</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#f8f8f8] uppercase tracking-wider">Fecha de creación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.allEvents.map(pet => (
                                    <tr key={pet._id} className=" hover:bg-cyan-400 hover:text-[#f8f8f8] hover:border-[#007dc4]">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.id || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.title || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pet.createdAt || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
       </div>
    </div>
    )
}