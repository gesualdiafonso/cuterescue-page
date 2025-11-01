import 'leaflet/dist/leaflet.css';
import './App.css';
import { SavedDataProvider } from './context/SavedDataContext';
import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <SavedDataProvider>
      <Header />
      <Layout />
      <Footer />
    </SavedDataProvider>
  );
}

export default App;
