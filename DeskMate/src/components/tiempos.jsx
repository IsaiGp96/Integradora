import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Tiempo = () => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    //var tiem = ["Segundos", "Minutos", "Horas"];
    //const [element, estadoTiempo] = useState();
    const handleStartClick = () => {
        setStartTime(new Date());
        setIsRunning(true);
        //estadoTiempo();
    };
    const handleStopClick = () => {
        setStartTime(null);
        setIsRunning(false);
        setElapsedTime(0);
        //estadoTiempo(null);
    };
   
    useEffect(() => {
        if (startTime && isRunning) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                var elapsed = Math.round((currentTime - startTime) / 1000);
                
                if (elapsed >= 60) {
                    elapsed = Math.floor(elapsed / 60);
                    
                } else if (elapsed > 3600) {
                    elapsed = Math.floor(elapsed / 60);
                    
                } else if(elapsed < 60) {

                }
                //estadoTiemp(elapsed);
                setElapsedTime(elapsed);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [startTime, isRunning]);

    const currentDateTime = moment().tz("Mazatlan/Chihuahua").format("YYYY-MM-DDTHH:mm");

    return (
        <div className="mt-20 p-6 pb-0">
            <card className="flex flex-col max-w-6xl mx-auto space-y-4 ">
                <section className="container mx-auto">
                    <h1>Registro de tiempos</h1>
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-md font-semibold tracking-wide text-left bg-azul-3-500 border-b border-gray-600">
                                        <th className="px-4 py-3">No. de sesión</th>
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Hora de inicio</th>
                                        <th className="px-4 py-3">Hora de término</th>
                                        <th className="px-4 py-3">Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">1</td>
                                        <td className="px-4 py-3 text-ms border">09/05/2023</td>
                                        <td className="px-4 py-3 text-ms border">8:39</td>
                                        <td className="px-4 py-3 text-ms border">9:58</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">1:19</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">2</td>
                                        <td className="px-4 py-3 text-ms border">20/06/2022</td>
                                        <td className="px-4 py-3 text-ms border">14:18</td>
                                        <td className="px-4 py-3 text-ms border">19:38</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">5:20</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">3</td>
                                        <td className="px-4 py-3 text-ms border">21/03/2023</td>
                                        <td className="px-4 py-3 text-ms border">16:07</td>
                                        <td className="px-4 py-3 text-ms border">21:06</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">4:59</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">4</td>
                                        <td className="px-4 py-3 text-ms border">29/06/2022</td>
                                        <td className="px-4 py-3 text-ms border">0:55</td>
                                        <td className="px-4 py-3 text-ms border">11:20</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">10:25</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">5</td>
                                        <td className="px-4 py-3 text-ms border">06/05/2022</td>
                                        <td className="px-4 py-3 text-ms border">5:56</td>
                                        <td className="px-4 py-3 text-ms border">11:43</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">5:47</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-ms border">6</td>
                                        <td className="px-4 py-3 text-ms border">07/10/2022</td>
                                        <td className="px-4 py-3 text-ms border">14:06</td>
                                        <td className="px-4 py-3 text-ms border">14:40</td>
                                        <td className="px-4 py-3 text-ms font-semibold border">0:34</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <div id="btTime" className="bg-azul-3-500 rounded-lg py-6 p-3">
                    <h4>
                        Tiempo transcurrido en la sesión actual:  {elapsedTime} {elapsedTime.elapsed < 60 ? " segundos" : "minutos"} 
                    </h4>
                    <div>
                        <input type="datetime-local" value={currentDateTime} disabled />
                    </div>
                    <div className="botones">
                        <button className="comenzar hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full" onClick={handleStartClick}>
                            Comenzar
                        </button>
                        <button className="detener hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full" onClick={handleStopClick}>
                            Detener
                        </button>
                    </div>
                </div>
            </card>
        </div>
    );
};
export default Tiempo;
