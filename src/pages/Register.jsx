import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../services/AuthServices";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const { success, message } = await AuthServices.register(email, password);
    if (!success) {
      setError(message);
      return;
    }

    navigate("/login");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <img
        src="/public/assets/images/elementos/vetorpatas_trama.png"
        alt=""
        className="absolute w-full h-full object-cover -z-10 opacity-30"
      />

      <div className="bg-gray-400/50 backdrop-blur-md w-[450px] rounded-2xl flex flex-col justify-center items-center gap-10 px-10 py-12 shadow-xl">
        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center">
          Crear Cuenta
        </h2>

        <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />

          {error && <p className="text-red-200 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-cyan-700 text-white px-10 py-2 rounded-md hover:bg-cyan-800 transition-all"
          >
            Crear Cuenta
          </button>

          <Link
            to="/login"
            className="bg-white text-cyan-700 text-center px-10 py-2 rounded-md hover:bg-cyan-100 transition-all"
          >
            Ingresar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
