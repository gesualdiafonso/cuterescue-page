import { Link } from "react-router-dom";

function Resgister() {
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
            Crear Cuenta
          </h2>
        </div>

        <form className="w-full flex flex-col gap-8">
          <div className="flex flex-col">
            <label className="font-light text-lg text-white">Email</label>
            <input
              type="email"
              className="bg-white p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-light text-lg text-white">Contraseña</label>
            <input
              type="password"
              className="bg-white p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-light text-lg text-white">Confirmar Contraseña</label>
             <input
              type="password"
              className="bg-white p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-cyan-700 text-center px-10 py-2 text-white font-semibold rounded-md hover:bg-cyan-800 transition-all cursor-pointer"
            >
              Crear Cuenta
            </button>

            <Link
              to="/login"
              className="bg-white text-center text-cyan-700 font-semibold px-10 py-2 rounded-md hover:bg-cyan-100 transition-all"
            >
              Ingresar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resgister;
