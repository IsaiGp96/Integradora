import React, { useState } from "react";
import Temperatura from "./temperaturas";
import Tiempo from "./tiempos";
import Base from "./base";
import { Link } from "react-router-dom";

const Main = () => {
  const [componenteActual, setComponenteActual] = useState("Desk Mate");

  return (
    <div>
      {/* Navbar start */}
      <nav
        id="navbar"
        className="fixed top-0 z-40 flex w-full flex-row justify-end bg-gray-700 px-4 sm:justify-between"
      >
        <ul className="breadcrumb hidden flex-row items-center py-4 text-lg text-white sm:flex encabezado">
          <li
            className={`inline ${componenteActual === "Desk Mate" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Inicio")}
          >
            <Link to="/">Desk Mate</Link>
          </li>
          <li className="inline">
            <span>{componenteActual}</span>
          </li>
        </ul>
        <div id="navlink" className="items-center hidden space-x-8 lg:flex">
          <a className={`flex text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ${componenteActual === "Desk Mate" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Temperatura")}>
            <Link to="/Temperatura">Temperatura</Link>
          </a>

          <a className={`flex text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ${componenteActual === "Desk Mate" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Tiempo")}>
            <Link to="/Tiempo">Tiempo</Link>
          </a>

          <a className={`flex text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ${componenteActual === "Desk Mate" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Inclinación")}>
            <Link to="/Base">Inclinación</Link>
          </a>
          <a className="flex text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
            Acerca de Lanucz
          </a>
        </div>
      </nav>
      {/* {componenteActual === "Temperatura" && <Temperatura />}
      {componenteActual === "Tiempo" && <Tiempo />}
      {componenteActual === "Inclinación" && <Base />} */}
    </div>
  );
};

export default Main;
