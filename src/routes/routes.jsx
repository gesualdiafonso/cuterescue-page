import Dashboard from "../pages/Dashboard";
import ProtectedRout from "../components/ProtectedRoute";
import Register from "../pages/Register"
import Login from "../pages/Login"
import Eventos from "../pages/Eventos";
import Veterinaria from "../pages/Veterinarias";
import InformePet from "../pages/InformePet";
import DetailsUser from "../pages/DetailsUser";
import Maps from "../pages/Maps";
import AddDetailsUser from "../pages/AddDetailsUser";
import AdminLayout from "../Layout/AdminLayout";
import DashboardAdmin from "../admin/pages/DashboardAdmin";
import ControlEvents from "../admin/pages/ControlEvents";
import ControlUser from "../admin/pages/ControlUser";
import AgregarEvents from "../admin/pages/AgregarEvents";
import UserDetail from "../admin/pages/UserDetail";
import AllLocations from "../admin/pages/AllLocations";

// Rotas usuario
const userRoutes = [
    {
        path: "/",
        element: (
            <ProtectedRout>
                <Dashboard />
            </ProtectedRout>
        ),
        title: "Cute Rescue, la aplicación que te conecta a su mascota"
    },
    {
        path: "/add-detalles",
        element: <AddDetailsUser />,
        title: "Agregar informaciones personales",
    },
    {
        path: "/veterinarias-24hrs",
        element: (
            <ProtectedRout>
                <Veterinaria/>
            </ProtectedRout>
        ),
        title: "Veterinarias 24hrs, según la ubicación que desea"
    },
    {
        path: "/eventos-ba",
        element: (
            <ProtectedRout>
                <Eventos/>
            </ProtectedRout>
        ),
        title: "Eventos en Buenos Aires para su Mascota."
    },
    {
        path: "/informe-pet",
        element: (
            <ProtectedRout>
                <InformePet/>
            </ProtectedRout>
        ),
        title: "Información de los pet"
    },
    {
        path: "/detalles",
        element: (
            <ProtectedRout>
                <DetailsUser/>
            </ProtectedRout>
        ),
        title: "Detalles Usuario"
    },
    {
        path: "/pet-ubication",
        element: (
            <ProtectedRout>
                <Maps/>
            </ProtectedRout>
        ),
        title: "Ubicación de su mascota en el mapa"
    },
]


const adminRoutes = {
    path: "/admin",
    element: (
        <ProtectedRout isAdmin={true}> 
            <AdminLayout /> 
        </ProtectedRout>
    ),
    children: [ // Rotas aninhadas
        {
            path: "dashboard", // Caminho final será /admin/dashboard
            element: <DashboardAdmin />, 
            title: "Admin - Dashboard Principal"
        },
        {
            path: "control-eventos", // Caminho final será /admin/dashboard
            element: <ControlEvents />, 
            title: "Admin - Control de Eventos Principal"
        },
        {
            path: "agregar-eventos",
            element: <AgregarEvents/>,
            title: "Admin - Agregar Nuevo Evento"
        },
        {
            path: "control-usuarios", // Caminho final será /admin/dashboard
            element: <ControlUser />, 
            title: "Admin - Conbtrol de Usuarios Principal"
        },
        {
            path: "detalles-usuario/:userId",
            element: <UserDetail />,
            title: "Admin - Detalles de Usuario"
        },
        {
            path: "todas-localizaciones",
            element: <AllLocations/>,
            title: "Admin - Todas las localizaciones de mascotas"
        }
    ]
}

const authRoute = [
    {
        path: "/login",
        element: <Login/>,
        title: "Cute Rescue, Autenticación login"
    },
    {
        path: "/register",
        element: <Register />,
        title: "Registre en Cute Rescue, la app que conecta a su mascota"
    },
]

const routes = [
    ...authRoute,
    adminRoutes,
    ...userRoutes
]

export default routes;