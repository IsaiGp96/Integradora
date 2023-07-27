import React, { useState, useEffect } from "react";
import Main from "./components/main.jsx";
import Content from "./components/content.jsx";
import Temperatura from "./components/temperaturas.jsx";
import Tiempo from "./components/tiempos.jsx";
import Base from "./components/base.jsx";
import Lanucz from "./components/lanucz.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
    setIsPaused(false);
  };


  const handlePauseClick = () => {
    setIsRunning(false);
    setIsPaused(true);
  }

  const handleResumeClick = () => {
    setIsRunning(true);
    setIsPaused(false);
  }

  const handleStopClick = () => {
    setStartTime(null);
    setIsRunning(false);
    setIsPaused(false);
    setElapsedTime(0);
    setTiempo({ horas: 0, minutos: 0, segundos: 0 });
  };

  return (
    <Router>
      <div className="App">
        <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
        <header className="App-header">
          <Main />
            <Routes>
              <Route path="/Temperatura" element={<Temperatura />} />
              <Route path="/Tiempo" element={<Tiempo startTime={startTime} elapsedTime={elapsedTime} isRunning={isRunning} isPaused={isPaused} tiempo={tiempo} handleStartClick={handleStartClick} handlePauseClick={handlePauseClick} handleResumeClick={handleResumeClick} handleStopClick={handleStopClick} />} />
              <Route path="/Base" element={<Base />} />
              <Route path="/" element={<Content startTime={startTime} elapsedTime={elapsedTime} isRunning={isRunning} isPaused={isPaused} tiempo={tiempo} handleStartClick={handleStartClick} handlePauseClick={handlePauseClick} handleResumeClick={handleResumeClick} handleStopClick={handleStopClick}/>} />
              <Route path="/Lanucz" element={<Lanucz />} />
            </Routes>
        
        </header>
      </div>
    </Router>
  );
}

export default App;
