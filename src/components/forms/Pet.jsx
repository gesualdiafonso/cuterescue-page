import { Link } from "react-router-dom";

function Pet(){
    return(
        <div className="w-full h- flex flex-col lg:flex-row">
            <div className="w-1/2 hidden lg:block h-auto">
                <img src="/public/assets/images/elementos/vetorpatas_trama.png" alt="" className="h-full w-full object-cover"/>
            </div>
            <div className="w-full bg-cyan-800 h-auto px-10 lg:px-25 py-10">
                <div className="mb-25">
                    <h2 className="text-5xl font-bold text-orange-400">Vamos agregar su pet, segui las información abajo</h2>
                </div>
                <div>
                    <form action="#" className="felx flex-col gap-10">
                        <div  className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-10">
                            <div className="flex flex-col">
                                <label className="font-light text-lg text-white">Nombre</label>
                                <input
                                type="text"
                                className="bg-white p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-light text-lg text-white">Subir Foto</label>
                                <input 
                                    type="upload" 
                                    className="bg-white p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                    />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-light text-lg text-white">Ubicación</label>
                                <input
                                type="text"
                                className="bg-white p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-light text-lg text-white">Fecha de Nacimiento</label>
                                <input
                                type="date"
                                className="bg-white p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-light text-lg text-white">Telefono</label>
                                <input
                                type="text"
                                className="bg-white p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                                />
                            </div>

                            <div>
                                sexo
                            </div>  
                        </div>

                        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
                            <Link to="/" className="bg-cyan-700 text-center px-10 py-2 text-white font-semibold hover:rounded-md hover:bg-cyan-800 transition-all">Volver</Link>
                            <button className="bg-orange-400 text-center px-10 py-2 text-white font-semibold hover:rounded-md hover:bg-orange-300 transition-all cursor-pointer">Avanzar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Pet;
