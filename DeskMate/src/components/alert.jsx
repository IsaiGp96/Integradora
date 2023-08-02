import React, {useEffect, useState} from "react";

const Alert = ({
    tiempo
}) => {
    const [alertar, setAlertar] = useState(false);

    useEffect(() => {
        if (tiempo.horas === 2 && tiempo.minutos === 0 && tiempo.segundos === 0) {
            setAlertar(true);
            setTimeout(() => {
                setAlertar(false);
            }, 10000);
        }
    }, [tiempo])

    return (
        (alertar && <div className="toast">
            ¡Sesión completada!
        </div>)
    );
}
export default Alert;