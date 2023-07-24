import React, {useState} from "react";

const Alert = () => {
    function mostrarAlerta(){
        alert("Hola mundo");
    }

    return (
        <div>
            <button onClick={mostrarAlerta} hidden>Mostrar alerta</button>
        </div>
    );
}
export default Alert;