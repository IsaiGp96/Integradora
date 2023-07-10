import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Tiempo = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tiempo, setTiempo] = useState({ horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    let intervalo = null;

    if (isRunning) {
      intervalo = setInterval(() => {
        setTiempo((prevState) => {
          let segundos = prevState.segundos + 1;
          let minutos = prevState.minutos;
          let horas = prevState.horas;

          if (segundos >= 60) {
            segundos = 0;
            minutos++;

            if (minutos >= 60) {
              minutos = 0;
              horas++;
            }
          }

          return { horas, minutos, segundos };
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => {
      clearInterval(intervalo);
    };
  }, [isRunning]);

  const handleStartClick = () => {
    setStartTime(new Date());
    setIsRunning(true);
  };

  const handleStopClick = () => {
    setStartTime(null);
    setIsRunning(false);
    setElapsedTime(0);
    setTiempo({ horas: 0, minutos: 0, segundos: 0 });
  };

  const currentDateTime = moment()
    .tz("Mazatlan/Chihuahua")
    .format("YYYY-MM-DDTHH:mm");

  return (
    <div className="mt-20 p-6">
      <div className="flex flex-col max-w-6xl mx-auto space-y-4">
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
                    <td className="px-4 py-3 text-ms font-semibold border">
                      1:19
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ms border">2</td>
                    <td className="px-4 py-3 text-ms border">20/06/2022</td>
                    <td className="px-4 py-3 text-ms border">14:18</td>
                    <td className="px-4 py-3 text-ms border">19:38</td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      5:20
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ms border">3</td>
                    <td className="px-4 py-3 text-ms border">21/03/2023</td>
                    <td className="px-4 py-3 text-ms border">16:07</td>
                    <td className="px-4 py-3 text-ms border">21:06</td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      4:59
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ms border">4</td>
                    <td className="px-4 py-3 text-ms border">29/06/2022</td>
                    <td className="px-4 py-3 text-ms border">0:55</td>
                    <td className="px-4 py-3 text-ms border">11:20</td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      10:25
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ms border">5</td>
                    <td className="px-4 py-3 text-ms border">06/05/2022</td>
                    <td className="px-4 py-3 text-ms border">5:56</td>
                    <td className="px-4 py-3 text-ms border">11:43</td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      5:47
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-ms border">6</td>
                    <td className="px-4 py-3 text-ms border">07/10/2022</td>
                    <td className="px-4 py-3 text-ms border">14:06</td>
                    <td className="px-4 py-3 text-ms border">14:40</td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      0:34
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <div id="btTime" className="bg-azul-3-500 rounded-lg py-6 p-3">
          <div>
            <h1>Cronómetro</h1>
            <p>
              {String(tiempo.horas).padStart(2, "0")}:
              {String(tiempo.minutos).padStart(2, "0")}:
              {String(tiempo.segundos).padStart(2, "0")}
            </p>
          </div>

          <div>
            <input type="datetime-local" value={currentDateTime} disabled />
          </div>
          <div className="botones">
            <button
              className="comenzar hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleStartClick}
              disabled={isRunning}
            >
              Comenzar
            </button>
            <button
              className="detener hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleStopClick}
              disabled={!isRunning}
            >
              Detener
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiempo;
