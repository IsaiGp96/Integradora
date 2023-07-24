import React from "react";
import Main from "./components/main.jsx";
import Content from "./components/content.jsx";
import Temperatura from "./components/temperaturas.jsx";
import Tiempo from "./components/tiempos.jsx";
import Base from "./components/base.jsx";
import Lanucz from "./components/lanucz.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
        <header className="App-header">
          <Main />
            <Routes>
              <Route path="/Temperatura" element={<Temperatura />} />
              <Route path="/Tiempo" element={<Tiempo />} />
              <Route path="/Base" element={<Base />} />
              <Route path="/" element={<Content />} />
              <Route path="/Lanucz" element={<Lanucz />} />
            </Routes>
         
        </header>
      </div>
    </Router>
  );
}

export default App;
