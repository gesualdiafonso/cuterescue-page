import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import routes from "../routes/routes";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    document.title =
      routes.find((r) => r.path === location.pathname)?.title || "Meu App";
  }, [location]);

  return (
    <main>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </main>
  );
}

export default Layout;