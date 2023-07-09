import React from "react";
import Temperatura from "./temperaturas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTemperatureThreeQuarters, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Content = () => {
    return (
        <div className="mt-20 p-6">
            <card className="flex flex-col max-w-6xl mx-auto space-y-4 ">
                {/* Banner */}
                <div id="banner" className="bg-azul rounded-lg h-banner py-6 p-3">
                </div>
                {/* Información relevante */}
                <div className="flex justify-between space-x-5">
                    <div className="flex-col space-y-4 w-full">
                        {/* Temperatura */}
                        <div className="bg-azul-2 rounded-lg h-min p-6 w-full">
                            <h2>Temperatura</h2>
                            <div className="center">
                                <div className="datos">
                                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size="5x" />
                                    <p>00°</p>
                                </div>
                            </div>
                        </div>
                        {/* Tiempo medido */}
                        <div className="bg-azul-3 rounded-lg h-min p-6 w-full">
                            <h2>Tiempo</h2>
                            <div className="center">
                                <div className="datos">
                                    <FontAwesomeIcon icon={faClock} size="5x" />
                                    <p>0:00</p>
                                </div>
                                <br />
                                {/* Barra de progreso */}
                                <div className="mb-2 flex gap-2">
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-black"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-azul-3"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-azul-3"></span>
                                    <span className="mb-2 h-[15px] flex-1 rounded-xl bg-azul-3"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Apartado para trabajar */}
                    <div className="hidden md:inline-block bg-azul rounded-lg py-6 w-full p-3">
                        <h2>Estado: Trabajando o no</h2>
                        <div className="center">
                            {/* Botón para empezar a trabajar */}
                            <button className="relative group overflow-hidden px-6 py-3 rounded-full flex space-x-2 items-center bg-white hover:bg-beige">
                                <span className="relative text-blue">
                                    <FontAwesomeIcon icon={faPlay} size="5x" /> <FontAwesomeIcon icon={faPause} size="5x" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Apartado para trabajar */}
                <div className=" md:hidden bg-azul rounded-lg py-6 w-full p-3">
                    <h3>Estado: Trabajando o no</h3>
                    <div className="center">
                        {/* Botón para empezar a trabajar */}
                        <button className="relative group overflow-hidden px-6 py-3 rounded-full flex space-x-2 items-center bg-white hover:bg-beige">
                            <span className="relative text-blue">
                                <FontAwesomeIcon icon={faPlay} size="5x" /> <FontAwesomeIcon icon={faPause} size="5x" />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="bg-azul-2 rounded-lg py-6 p-3">
                    <h4>Extras</h4>
                    Posiblemente un espacio puramente decorativo
                </div>
                <span className="text-right">Powered by Lanucz</span>
            </card>
        </div>
    );
};
export default Content;
