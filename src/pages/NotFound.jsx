import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className="max-w-4xl h-96 mx-auto p-4 flex items-center justify-center">
            <img
                src="/assets/images/elementos/vetorpatas_trama.png"
                alt=""
                className="absolute w-full h-96 object-cover -z-10 opacity-30"
            />
            <div className="bg-white shadow-xl rounded-lg p-8 w-[450px] flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-center text-cyan-700">404 - Página no encontrada</h1>
                <p className="text-gray-600">Lo sentimos, la página que estás buscando no existe.</p>
                <Link to="/" className="text-center text-[#ffaa2e] hover:text-[#ffc78c] font-medium">
                    &larr; Volver a la Página Principal
                </Link>
            </div>
        </div>
    )
}