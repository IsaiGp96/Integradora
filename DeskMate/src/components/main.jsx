import React, { useState } from "react";
import Temperatura from "./temperaturas";
import Tiempo from "./tiempos";
import Base from "./base";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  const [componenteActual, setComponenteActual] = useState("Desk Mate");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Navbar start */}
      <nav
        id="navbar"
        className={`fixed top-0 z-40 flex w-full flex-row px-4 sm:justify-between ${menuOpen ? "responsive" : ""}`}
      >
        <Link to="/">
          <ul className="font-sans tracking-wider hover:text-beige cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-150 breadcrumb flex-row items-center py-4 text-lg text-white encabezado"
            onClick={() => setComponenteActual("Inicio")}
          >
            <li
              className= {`inline ${componenteActual === "Desk Mate" ? "font-bold" : ""}`}
            >
              Desk Mate
            </li>
            <li className="inline">
              <span> {componenteActual}</span>
            </li>
          </ul>
        </Link>
        <div id="navlink" className="navlink sm:hidden items-center hidden space-x-8 lg:flex md:flex">
          <a className={`font-sans tracking-wider text-lg flex text-white hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 ${componenteActual === "Temperatura" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Temperatura")}>
            <Link to="/Temperatura">Temperatura</Link>
          </a>

          <a className={`font-sans tracking-wider text-lg flex text-white hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 ${componenteActual === "Tiempo" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Tiempo")}>
            <Link to="/Tiempo">Tiempo</Link>
          </a>

          <a className={`font-sans tracking-wider text-lg flex text-white hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300 ${componenteActual === "Inclinación" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Inclinación")}>
            <Link to="/Base">Inclinación</Link>
          </a>
          <a className={`font-sans tracking-wider text-lg flex text-white hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300  ${componenteActual === "Acerca de Lanucz" ? "font-bold" : ""}`}
            onClick={() => setComponenteActual("Acerca de Lanucz")}>
            <Link to="/Lanucz">Acerca de Lanucz</Link>
          </a>
        </div>
        <div className="lg:hidden md:hidden text-white hover:text-beige">
          <a className="font-sans tracking-wider text-lg flex cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className="dropdown bg-cafe w-full text-white text-left py-2">
          <Link to="/Temperatura">
            <a className="block py-2 hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={() => {
              setComponenteActual("Temperatura");
              toggleMenu();
            }}>
              Temperatura
            </a>
          </Link>
          <Link to="/Tiempo">
            <a className="block py-2 hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={() => {
              setComponenteActual("Tiempo");
              toggleMenu();
            }}>
              Tiempo
            </a>
          </Link>
          <Link to="/Base">
            <a className="block py-2 hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={() => {
              setComponenteActual("Inclinación");
              toggleMenu();
            }}>
              Inclinación
            </a>
          </Link>
          <Link to="/Lanucz">
            <a className="block py-2 hover:text-beige cursor-pointer transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300"
            onClick={() => {
              setComponenteActual("Acerca de Lanucz");
              toggleMenu();
            }}>
              Acerca de Lanucz
            </a>
          </Link>
        </div>
      )}

      {/* {componenteActual === "Temperatura" && <Temperatura />}
      {componenteActual === "Tiempo" && <Tiempo />}
      {componenteActual === "Inclinación" && <Base />} */}
    </div>
  );
};

export default Main;
