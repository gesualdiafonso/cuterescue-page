import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthServices";
import SavedDataService from "../services/SavedDataServices";
import { useState } from "react";
import { useSavedData } from "../context/SavedDataContext";
import { useAuth } from "../context/AuthContext";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { reloadData } = useSavedData;
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    const { success, user, message } = await login(email, password);

    if(!success){
      setError(message);
      return;
    }

    // Carregar dados do usuário após login
    await SavedDataService.loadAllData(user.id);
    reloadData();
    navigate("/");

  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Fundo com imagem */}
      <img
        src="/public/assets/images/elementos/vetorpatas_trama.png"
        alt=""
        className="absolute w-full h-full object-cover -z-10 opacity-30"
      />

      {/* Card de login */}
      <div className="bg-gray-400/50 backdrop-blur-md w-[450px] h-auto rounded-2xl flex flex-col justify-center items-center gap-10 px-10 py-12 shadow-xl">
        <div className="w-full text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Acceder a su cuenta
          </h2>
        </div>

        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-light text-lg text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-light text-lg text-white">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <Link
              href="#"
              className="text-sm text-cyan-100 hover:text-white mt-2 self-end"
            >
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          {error && <p className="text-red-200 text-sm">{error}</p>}
          <div className="flex flex-col gap-4">
            <Link
              to="/register"
              className="bg-cyan-700 text-center px-10 py-2 text-white font-semibold rounded-md hover:bg-cyan-800 transition-all"
            >
              Registrar
            </Link>

            <button
              type="submit"
              className="bg-white text-cyan-700 font-semibold px-10 py-2 rounded-md hover:bg-cyan-100 transition-all"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
