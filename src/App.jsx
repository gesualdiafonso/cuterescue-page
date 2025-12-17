import 'leaflet/dist/leaflet.css';
import './App.css';
import { useLocation } from 'react-router-dom'; // Importe o hook
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import Loading from './components/Loading';
import { useSavedData } from './context/SavedDataContext';
import { useAuth } from './context/AuthContext';

function App() {
  const location = useLocation();
  const { loaded: dataLoaded } = useSavedData();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Verifica se a rota atual começa com "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showLoading = authLoading || (isAuthenticated && !dataLoaded);

  if(showLoading){
    return <Loading />
  }

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