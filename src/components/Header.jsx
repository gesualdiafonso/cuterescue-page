import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBarAdmin from "./ui/NavBarAdmin";
import PetLink from "./ui/PetLink";
import BtnLogout from "./ui/BtnLogout";



function Header(){
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
        <header className="flex flex-row gap-10 w-full h-auto px-10 py-5">
            <div className="flex flex-row gap-10 lg:gap-5 justify-center items-center mx-auto w-full lg:w-1/2">
                <div>
                    <Link to="/">
                        <img src="/public/assets/images/logo/isotipoLogo.png" alt="" />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <img src="/public/assets/images/logo/logoColor.png" alt="" />
                    </Link>
                </div>
            </div>

            <div className="flex justify-center items-center w-full">
                <NavBarAdmin />
                <PetLink/>
            </div>
            <div className="flex justify-center items-center">
                <BtnLogout/>
            </div>
        </header>
    )
}

export default Header;