import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSavedData } from "../context/SavedDataContext";
import NavBarAdmin from "./ui/NavBarAdmin";
import PetLink from "./ui/PetLink";
import BtnLogout from "./ui/BtnLogout";
import AuthServices from "../services/AuthServices";
import Logo from "../../public/assets/images/logo/isotipoLogo.png"
import LogoText from "../../public/assets/images/logo/logoColor.png"



function Header(){

    const isAuth = AuthServices.isAuthenticated();

    const { selectedPet } = useSavedData();

    const location = useLocation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToSection = (id) =>{
        const section = document.getElementById(id);
        if(section){
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleNavClick = (id) =>{
        if(location.pathname !== "/"){
            // Vuelve a la home normalmente despues del scrool
            navigate("/");
            setTimeout(() => scrollToSection(id), 300);
        } else {
            scrollToSection(id);
        }
    }

    return(
        <header className="flex flex-row gap-10 w-full h-auto px-10 py-5 fixed top-0 left-0 bg-white shadow-md z-50 justify-between items-center">
            <div className="flex flex-row gap-10 lg:gap-5 justify-center items-center mx-auto w-full lg:w-1/2">
                <div>
                    <Link to="/">
                        <img src="/assets/images/logo/isotipoLogo.png" alt="Logo" />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <img src="/assets/images/logo/logoColor.png" alt="Logo Texto" />
                    </Link>
                </div>
            </div>

            {isAuth && (
                <>
                    <div className="flex justify-center items-center w-full">
                        <NavBarAdmin />
                        <PetLink pet={selectedPet}/>
                    </div>
                    <div className="flex justify-center items-center">
                        <BtnLogout/>
                    </div>
                </>
            )}
        </header>
    )
}

export default Header;