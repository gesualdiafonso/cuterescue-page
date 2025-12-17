import { Link } from "react-router-dom";
import NavBar from "./ui/Navbar";
import BtnLogout from "../../components/ui/BtnLogout";
import AuthServices from "../../services/AuthServices";
import Logo from "../../../public/assets/images/logo/isotipoLogo.png"
import LogoText from "../../../public/assets/images/logo/logoColor.png"



function HeaderAdmin(){

    const user = "admin";

    const isAuth = AuthServices.isAuthenticated();


    return(
        <header className="flex flex-row gap-10 w-full h-auto px-10 py-5 fixed top-0 left-0 bg-white shadow-md z-50 justify-between items-center">
            <div className="flex flex-row gap-10 lg:gap-5 justify-center items-center mx-auto w-full lg:w-1/2">
                <div>
                    <Link to="/admin/dashboard">
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div>
                    <Link to="/admin/dashboard">
                        <img src={LogoText} alt="" />
                    </Link>
                </div>
            </div>

            {isAuth && (
                <>
                    <div className="flex justify-center items-center w-full">
                        <NavBar />
                    </div>
                    <div>
                        {/* Nombre del admin */}
                        <p className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <BtnLogout/>
                    </div>
                </>
            )}
        </header>
    )
}

export default HeaderAdmin;