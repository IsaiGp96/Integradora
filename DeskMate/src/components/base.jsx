import React, { useEffect, useState } from "react";
import angulo from "../img/angulo.png";

const Base = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("0");

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

  const grados = ["0", "25", "35", "45"];

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
          <div className="rounded border bg-white p-2 shadow centrar">
            <div className="flex items-center justify-between">
              <button
                className="font-semibold border-l bg-azul-2-900 hover:bg-azul-2 border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer"
                onClick={handleDecreaseClick}
              >
                <span className="m-auto">-</span>
              </button>
              <input
                type="text"
                className="mx-4 w-full rounded border bg-gray-100 p-2 focus:border-azul-2-500 focus:outline-none center"
                value={inputValue + "°"}
                onChange={(e) => setInputValue(e.target.value)}
                disabled
              />
              <button
                className="font-semibold border-l bg-azul-2-900 hover:bg-azul-2 border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer"
                onClick={handleIncreaseClick}
              >
                <span className="m-auto">+</span>
              </button>
            </div>
          </div>
        </div>
      </card>
    </div>
  );
};

export default Base;
