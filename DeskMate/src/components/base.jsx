import React, { useEffect, useState } from "react";
import angulo from "../img/angulo.png";

const Base = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("Hafiz Haziq");

  const handleEditClick = () => {
    setOpen(!open);
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  const handleSaveClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://unpkg.com/alpinejs@3.9.1/dist/cdn.min.js"
    );
    head.appendChild(script);
    return () => {
      head.removeChild(script);
    };
  }, []);

  const grados = ["25", "35", "45"];

  const grado = () => {
    return grados[0];
  };

  const handleDecreaseClick = () => {
    const currentIndex = grados.indexOf(inputValue);
    if (currentIndex > 0) {
      setInputValue(grados[currentIndex - 1]); // Disminuir el valor
    }
  };

  const handleIncreaseClick = () => {
    const currentIndex = grados.indexOf(inputValue);
    if (currentIndex < grados.length - 1) {
      setInputValue(grados[currentIndex + 1]); // Aumentar el valor
    }
  };

  return (
    <div className="mt-20 p-6">
      <card className="flex flex-col max-w-6xl mx-auto space-y-4 ">
        <div className="flex flex-col justify-between h-full">
          <h1>Ajuste de la base</h1>
          <img src={angulo} alt="Ángulo" className="image p-6 centrar" />
          <div className="w-96 rounded border bg-white p-2 shadow centrar">
            {!open && (
              <div className="flex items-center justify-between">
                <div className="ml-2">{inputValue}</div>
                <button
                  type="button"
                  className="btn rounded bg-azul-2-200 px-4 py-2 font-medium hover:bg-azul-2-300"
                  onClick={handleEditClick}
                >
                  {open ? "Cancel" : "Edit"}
                </button>
              </div>
            )}
            
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  className="mr-4 w-full rounded border bg-gray-100 p-2 focus:border-azul-2-500 focus:outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <button
                  className="font-semibold border-l bg-blue-700 hover:bg-blue-600 text-white border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer"
                  onClick={handleIncreaseClick}
                >
                  <span className="m-auto">+</span>
                </button>
                <div className="absolute flex flex-col p-2 w-32 md:w-full mt-6 md:mt-8 mt-10 flex items-start justify-center">
                  <svg
                    width="10"
                    height="10"
                    className="fill-current ml-5 md:mx-auto"
                  >
                    <polygon points="0 10, 10 10, 5 0" />
                  </svg>
                </div>
              </div>
          </div>),
        </div>
      </card>
    </div>
  );
};

export default Base;
