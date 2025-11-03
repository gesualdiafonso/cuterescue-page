import Dashboard from "../pages/Dashboard";
import ProtectedRout from "../components/ProtectedRoute";
import Register from "../pages/Register"
import Login from "../pages/Login"
import Formulario from "../pages/Formulario"
import Eventos from "../pages/Eventos";
import Veterinaria from "../pages/Veterinarias";
import InformePet from "../pages/InformePet";
import DetailsUser from "../pages/DetailsUser";
import Maps from "../pages/Maps";

const routes = [
    {
        path: "/login",
        element: <Login/>,
        title: "Cute Rescue, Autenticación login"
    },
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
        path: "/register",
        element: <Register />,
        title: "Registre en Cute Rescue, la app que conecta a su mascota"
    },
    {
        path: "/formulario",
        element: (
            <ProtectedRout>
                <Formulario/>
            </ProtectedRout>
        ),
        title: "Cute Rescue, Autenticación login"
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
    }
]

export default routes;