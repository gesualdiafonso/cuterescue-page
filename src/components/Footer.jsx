import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer className="max-w-7xl mx-auto mt-10">
            <div>
                <Link to="/">
                    <img src="/public/assets/images/logo/logoColor.png" alt="" />
                </Link>
            </div>
            <div className="flex justify-center items-center">
                <p>© 2024 <strong>Cute Rescue</strong>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}

export default Footer;
