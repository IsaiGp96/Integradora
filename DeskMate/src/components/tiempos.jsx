import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { db, set } from "../utils/firebase";
import { onValue, ref, query, orderByChild } from "firebase/database";

const Tiempo = ({
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
  const pageSize = 5;
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentDataDisplayed, setCurrentDataDisplayed] = useState({sessions: [],});
  const [previousAllowed, setPreviousAllowed] = useState(false);
  const [nextAllowed, setNextAllowed] = useState(true);
  const columns = ["No. de sesión", "Fecha", "Hora de inicio", "Hora de término", "Tiempo"];

  useEffect(() => {
    const q = query(ref(db, "Tiempo_registros"), orderByChild("Id"));

    return onValue(q, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        if (data !== "") {
          setSessions(Object.values(data.reverse()));
          setNumberOfPages(Math.ceil((data?.length-1) / pageSize));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (tiempo.horas === 2) {
      const ledsRef = ref(db, 'sensor');
      set(ledsRef, "1");
      setTimeout(() => set(ledsRef, "0"), 10000);
    }
}, [tiempo.horas]);

  useEffect(() => {
    sessions &&
      setCurrentDataDisplayed(() => {
        const page = sessions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return { sessions: page };
      });
    setPreviousAllowed(() => currentPage > 1);
    setNextAllowed(() => currentPage < numberOfPages);
  }, [currentPage, sessions]);

  const handlePagination = (action) => {
    if (action === "prev") {
      if (!previousAllowed) return;
      setCurrentPage((prevState) => (prevState -= 1));
    }
    if (action === "next") {
      if (!nextAllowed) return;
      setCurrentPage((prevState) => (prevState += 1));
    }
  };

  const currentDateTime = moment()
    .tz("America/Mazatlan")
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
                    {columns.map((column) => (
                      <th className="px-4 py-3" key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {currentDataDisplayed
                    ? currentDataDisplayed.sessions?.map((session, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-ms border">{session.Id}</td>
                          <td className="px-4 py-3 text-ms border">{session.Fecha}</td>
                          <td className="px-4 py-3 text-ms border">{session.Hora_inicio}</td>
                          <td className="px-4 py-3 text-ms border">{session.Hora_fin}</td>
                          <td className="px-4 py-3 text-ms font-semibold border">{session.Tiempo_op}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="botones">
              <button
                className="comenzar hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => handlePagination("prev")}
                disabled={!previousAllowed}
              >
                Anterior
              </button>
              <div>
                <p className="text-center px-2">
                  Mostrando{" "}
                  <span>{sessions.length !== 0? pageSize * (currentPage - 1) + 1: sessions.length}</span>{" "}
                  -{" "}
                  <span>
                    {currentDataDisplayed &&
                      currentDataDisplayed.sessions &&
                      currentDataDisplayed.sessions.length +
                        (currentPage - 1) * pageSize}
                  </span>{" "}
                  de <span>{sessions?.length}</span>{" "}
                  resultados
                </p>
              </div>
              <button
                className="detener hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => handlePagination("next")}
                disabled={!nextAllowed}
              >
                Siguiente
              </button>
            </div>
          </div> 
          <br />
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
              onClick={isRunning? handlePauseClick: (isPaused? handleResumeClick: handleStartClick)}
            >
              {isRunning? "Pausar": (isPaused? "Reanudar": "Comenzar")}
            </button>
            <button
              className="detener hover:bg-azul-2 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleStopClick}
              disabled={!isRunning && !isPaused}
            >
              Detener
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiempo;