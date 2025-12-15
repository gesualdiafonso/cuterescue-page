import 'leaflet/dist/leaflet.css';
import './App.css';
import { useLocation } from 'react-router-dom'; // Importe o hook
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  const location = useLocation();

  // Verifica se a rota atual começa com "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Só renderiza Header e Footer se NÃO for rota admin */}
      {!isAdminRoute && <Header />}
      
      <Layout />
      
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;