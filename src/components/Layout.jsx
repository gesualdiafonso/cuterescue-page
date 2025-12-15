import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "../routes/routes";

function Layout() {
  const location = useLocation();

  // Lógica para o título da página
  useEffect(() => {
    // Função recursiva para achar o título mesmo em rotas filhas
    const findTitle = (rts, path) => {
      for (const route of rts) {
        if (route.path === path || (route.path.startsWith('/') && path.startsWith(route.path))) {
          if (route.children) {
            const child = route.children.find(c => `${route.path}/${c.path}`.replace(/\/+/g, '/') === path);
            if (child) return child.title;
          }
          return route.title;
        }
      }
      return "Meu App";
    };

    document.title = findTitle(routes, location.pathname);
  }, [location]);

  return (
    <main className={location.pathname.startsWith('/admin') ? "" : "mt-36"}>
      <Routes>
        {routes.map((route, index) => {
          // Se a rota tiver filhos (ex: Admin)
          if (route.children) {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {route.children.map((child, childIdx) => (
                  <Route
                    key={childIdx}
                    path={child.path} // Caminho relativo: "dashboard"
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }

          // Se for uma rota simples (ex: Login, Register)
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </main>
  );
}

export default Layout;
