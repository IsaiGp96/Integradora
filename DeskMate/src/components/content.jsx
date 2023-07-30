import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTemperatureThreeQuarters, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { db } from "../utils/firebase";
import { onValue, ref, query, limitToLast } from "firebase/database";
import { useEffect, useState } from 'react';

const Content = ({
    startTime,
    elapsedTime,
    isRunning,
    isPaused,
    tiempo,
    handleStartClick,
    handlePauseClick,
    handleResumeClick,
    handleStopClick
}) => {
    const [temperature, setTemperature] = useState(0);

    useEffect(()=>{
        const q = query(ref(db, "Temperatura_prueba"), limitToLast(1));

        onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                const lastRecord = Object.values(data);
                setTemperature(lastRecord[0].Centigrados);
            }
        });
    })

    return (
        <div className="mt-20 p-6">
            <card className="flex flex-col max-w-6xl mx-auto space-y-4 ">
                {/* Información relevante */}
                <div className="flex justify-between space-x-5">
                    <div className="flex-col space-y-4 w-full">
                        {/* Temperatura */}
                        <div className="bg-azul-2 rounded-lg h-min p-6 w-full">
                            <h2>Temperatura</h2>
                            <div className="center">
                                <div className="datos">
                                    <FontAwesomeIcon icon={faTemperatureThreeQuarters} size="5x" />
                                    <p>{temperature}°</p>
                                </div>
                            </div>
                        </div>
                        {/* Tiempo medido */}
                        <div className="bg-azul-3 rounded-lg h-min p-6 w-full">
                            <h2>Tiempo</h2>
                            <div className="center">
                                <div className="datos">
                                    <FontAwesomeIcon icon={faClock} size="5x" />
                                    <p>
                                        {String(tiempo.horas).padStart(2, "0")}:
                                        {String(tiempo.minutos).padStart(2, "0")}:
                                        {String(tiempo.segundos).padStart(2, "0")}
                                    </p>
                                </div>
                                <br />
                                {/* Barra de progreso */}
                                <div className="mb-2 flex gap-2">
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.segundos > 0 || tiempo.minutos > 0 || tiempo.horas > 0? "bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 13 || tiempo.horas > 0? "bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 26 || tiempo.horas > 0? "bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 40 || tiempo.horas > 0? "bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 53 || tiempo.horas > 0? "bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0? tiempo.horas === 1? tiempo.minutos >= 6? "bg-black": "bg-azul-3" :"bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0? tiempo.horas === 1? tiempo.minutos >= 20? "bg-black": "bg-azul-3" :"bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0? tiempo.horas === 1? tiempo.minutos >= 33? "bg-black": "bg-azul-3" :"bg-black": "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0? tiempo.horas === 1? tiempo.minutos >= 46? "bg-black": "bg-azul-3" :"bg-black": "bg-azul-3"}`}></span>
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
