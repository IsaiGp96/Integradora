import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTemperatureThreeQuarters, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from 'react';
import logo from "../img/Logo01.png"


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
    const [wordWrapperContent, setWordWrapperContent] = useState('');
    const words = [' Powered by Lanucz', ' Powered by Lanucz', ' Powered by Lanucz']; // Arreglo que contiene las palabras a mostrar
    const [addingWord, setAddingWord] = useState(false); // Variable que indica si se está agregando una palabra o eliminando caracteres
    let counter = 1; // Contador para recorrer las palabras del arreglo

    useEffect(() => {
        const wordWrapper = document.getElementById('word');
        if (wordWrapper) {
            setWordWrapperContent(wordWrapper.innerHTML); // Guarda el contenido actual del elemento HTML

            const interval = setInterval(() => {
                if (wordWrapperContent.length > 0 && !addingWord) {
                    wordWrapper.innerHTML = wordWrapperContent.slice(0, -1); // Elimina el último caracter del contenido
                    setWordWrapperContent(wordWrapper.innerHTML); // Actualiza el contenido guardado
                } else {
                    setAddingWord(true); // Cambia el estado a agregar una palabra
                }

                // Comienza el ciclo para agregar palabras
                if (addingWord) {
                    if (wordWrapperContent.length < words[counter].length) {
                        wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1); // Agrega el siguiente caracter de la palabra actual
                        setWordWrapperContent(wordWrapper.innerHTML); // Actualiza el contenido guardado
                    } else {
                        if (counter < words.length) {
                            counter++; // Pasa a la siguiente palabra en el arreglo
                        }
                        setAddingWord(false); // Cambia el estado a eliminar caracteres
                    }
                }

                if (counter === words.length) {
                    counter = 0; // Reinicia el contador si ha llegado al final del arreglo
                }
            }, 150);

            return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
        }
    }, [wordWrapperContent, addingWord]);

    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        const q = ref(db, "Temperatura");

        onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                const lastRecord = Object.values(data);
                setTemperature(lastRecord[0]);
                if (lastRecord[0] < 0) {
                    setTemperature(0);
                }
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
                                    <p>{temperature}°C</p>
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
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.segundos > 0 || tiempo.minutos > 0 || tiempo.horas > 0 ? "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 13 || tiempo.horas > 0 ? "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 26 || tiempo.horas > 0 ? "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 40 || tiempo.horas > 0 ? "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.minutos >= 53 || tiempo.horas > 0 ? "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0 ? tiempo.horas === 1 ? tiempo.minutos >= 6 ? "bg-black" : "bg-azul-3" : "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0 ? tiempo.horas === 1 ? tiempo.minutos >= 20 ? "bg-black" : "bg-azul-3" : "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0 ? tiempo.horas === 1 ? tiempo.minutos >= 33 ? "bg-black" : "bg-azul-3" : "bg-black" : "bg-azul-3"}`}></span>
                                    <span className={`mb-2 h-[15px] flex-1 rounded-xl ${tiempo.horas > 0 ? tiempo.horas === 1 ? tiempo.minutos >= 46 ? "bg-black" : "bg-azul-3" : "bg-black" : "bg-azul-3"}`}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Apartado para trabajar */}
                    <div className="hidden md:inline-block bg-azul rounded-lg py-6 w-full p-3">
                        <div className="center">
                            <img src={logo} className="bg-white-60 rounded-lg" style={{ maxHeight: 375 }} alt="" />
                        </div>
                    </div>
                </div>
                {/* Apartado para trabajar */}
                <div className=" md:hidden bg-azul rounded-lg py-6 w-full p-3">
                    <div className="center">
                        <img src={logo} className="bg-white-60 rounded-lg" style={{ maxHeight: 375 }} alt="" />
                    </div>
                </div>
                <div className="bg-azul-2 rounded-lg py-6 p-3 items-center">
                    <div style={{ textAlign: '-webkit-center' }} >
                    <div className="text-center pb-2">
                        ㅤ<span id='word'></span>
                    </div>
                        <span classname="rounded-2xl">
                            <img style={{ borderRadius: 10 }} src="https://2.bp.blogspot.com/--lVNVU5jiQI/UwtdT6vgT0I/AAAAAAAAJ_4/9odEuWh3h00/s1600/5.gif" />

                        </span>
                    </div>

                </div>
                
            </card>
        </div>
    );
};
export default Content;
