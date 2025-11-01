import Home from "../pages/Home";
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
        path: "/",
        element: <Home />,
        title: "Cute Rescue, la aplicación que te conecta a su mascota"
    },
    {
        path: "/register",
        element: <Register />,
        title: "Registre en Cute Rescue, la app que conecta a su mascota"
    },
    {
        path: "/login",
        element: <Login/>,
        title: "Cute Rescue, Autenticación login"
    },
    {
        path: "/formulario",
        element: <Formulario/>,
        title: "Cute Rescue, Autenticación login"
    },
    {
        path: "/veterinarias-24hrs",
        element: <Veterinaria/>,
        title: "Veterinarias 24hrs, según la ubicación que desea"
    },
    {
        path: "/eventos-ba",
        element: <Eventos/>,
        title: "Eventos en Buenos Aires para su Mascota."
    },
    {
        path: "/informe-pet",
        element: <InformePet/>,
        title: "Información de los pet"
    },
    {
        path: "/detalles",
        element: <DetailsUser/>,
        title: "Detalles Usuario"
    },
    {
        path: "/pet-ubication",
        element: <Maps/>,
        title: "Ubicación de su mascota en el mapa"
    }
]

export default routes;