import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Controle de Eventos", path: "/admin/control-eventos" },
    { name: "Agregar eventos", path: "/admin/agregar-eventos" },
    { name: "Controle de usuarios", path: "/admin/control-usuarios" },
    { name: "Mapeo", path: "/admin/todas-localizaciones" }
  ];

  return (
    <nav className="w-full h-full flex justify-center items-center">
      <ul className="flex justify-center items-center py-2 gap-2 bg-white rounded-full shadow-sm">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#3D8E88] text-white shadow-md"
                    : "text-[#3D8E88] hover:bg-[#3D8E88]/10"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
