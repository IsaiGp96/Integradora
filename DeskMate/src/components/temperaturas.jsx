import React from "react";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { db } from "../utils/firebase";
import { onValue, ref, query, limitToLast, endAt, orderByChild, startAt, update, set } from "firebase/database";
import moment from "moment-timezone";

const Temperatura = () => {
    const [records, setRecords] = useState([]);
    const [records2, setRecords2] = useState([]);
    const [records3, setRecords3] = useState([]);
    const [days, setDays] = useState([]);
    const [temperature, setTemperature] = useState(0);
    const [lastDate, setLastDate] = useState("");
    const [lastId, setLastId] = useState(-1);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const q = ref(db, "Temperatura");

        onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                const newRecord = Object.values(data);
                setTemperature(newRecord[0]);
                if(newRecord[0] < 0){
                    setTemperature(0);
                }
            }
        });
    }, [])

    useEffect(()=>{
        const q = query(ref(db, "Temperatura_prueba"), orderByChild("Id"), limitToLast(1));

        onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                const lastRecord = Object.values(data);
                setLastDate(lastRecord[0].Fecha);
                setLastId(lastRecord[0].Id);
            }
        }, {onlyOnce: true});        
    })

    useEffect(() => {
        if (lastId !== -1) {
            if (lastDate === moment().tz("America/Mazatlan").format("DD/MM/YYYY").toString()) {
                update(ref(db, 'Temperatura_prueba/' + lastId), {
                    Centigrados: temperature
                });
            } else {
                set(ref(db, 'Temperatura_prueba/' + (lastId + 1)), {
                    Centigrados: temperature,
                    Fecha: moment().tz("America/Mazatlan").format("DD/MM/YYYY"),
                    Id: Number(lastId + 1),
                });
            }
        }
    })

    useEffect(() => {
        const q = query(ref(db, "Temperatura_prueba"), limitToLast(3));

        onValue(q, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                const results = Object.values(data).reverse();
                let index2 = 0;
                let newRecords = [];
                for (let index = 0; index < results.length; index++) {
                    if (results[index2].Fecha === moment().tz("America/Mazatlan").subtract(index, "days").format("DD/MM/YYYY").toString()) {
                        newRecords.unshift(results[index2].Centigrados);
                        index2++;
                    }
                    else {
                        newRecords.unshift(null);
                    }
                }
                console.log(newRecords);
                setRecords(newRecords);
            }
        });
    }, [])

    useEffect(() => {
        daysPerMonth();
        const q = query(
            ref(db, "Temperatura_prueba"),
            orderByChild("Fecha"),
            // limitToLast(Number(moment().tz("America/Mazatlan").format("DD")))
            startAt(
                moment().tz("America/Mazatlan").startOf("month").format("DD/MM/YYYY")
            ),
            endAt(
                moment().tz("America/Mazatlan").endOf("month").format("DD/MM/YYYY")
            )
        );
        let newRecords = [];

        onValue(q, (snapshot) => {
            const data = snapshot.val();
            
            if (snapshot.exists()) {
                const results = Object.values(data).reverse();
                let index2 = 0;
                for (let index = 0; index < Number(moment().tz("America/Mazatlan").format("DD")); index++) {
                    if (results[index2].Fecha === moment().tz("America/Mazatlan").subtract(index, "days").format("DD/MM/YYYY").toString()) {
                        newRecords.unshift(results[index2].Centigrados);
                        index2++;
                    }
                    else {
                        newRecords.unshift(null);
                    }
                }
                console.log(newRecords);
                setRecords2(newRecords);
            }
        });
    },[])

    useEffect(() => {
        let months = Number(moment().tz("America/Mazatlan").format("MM"));
        let newRecords = [];

        for (let index2 = 0; index2 < months; index2++) {
            const q = query(ref(db, "Temperatura_prueba"),
                orderByChild("Fecha"),
                startAt(moment().tz("America/Mazatlan").subtract(index2, "month").startOf("month").format("DD/MM/YYYY")),
                endAt(moment().tz("America/Mazatlan").subtract(index2, "month").endOf("month").format("DD/MM/YYYY")));

            onValue(q, (snapshot) => {
                const data = snapshot.val();

                if (snapshot.exists()) {
                    const results = Object.values(data);
                    let suma = 0;
                    let cont = 0;

                    for (let index = 0; index < results.length; index++) {
                        if ((results[index].Fecha).substring(3) === moment().tz("America/Mazatlan").subtract(index2, "month").format("MM/YYYY").toString()){
                            suma = suma + Number(results[index].Centigrados);
                            cont++;
                        }
                    }

                    if (cont !== 0) {
                        newRecords.unshift(suma / cont);
                    } else {
                        newRecords.unshift(null);
                    }
                }
            });
        }

        console.log(newRecords);
        setRecords3(newRecords);
    }, [])

    const daysPerMonth = () => {
        const number = moment().tz("America/Mazatlan").daysInMonth();
        let values = [];
        for (let index = 1; index <= number; index++) {
            values.push(index);
        }
        setDays(values);
    }

    const chartRef = useRef(null);
    const [selectedMode, setSelectedMode] = useState("");
    const chartDataRef = useRef({});

    chartDataRef.current = {
        "Tres días": {
            labels: ["Anteayer", "Ayer", "Hoy"],
            data: records,
        },
        Año: {
            labels: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
            ],
            data: records3,
        },
        Mes: {
            labels: days,
            data: records2,
        },
    };

    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js@2.8.0");
        head.appendChild(script);

        let chart = null;
        
        const newData = chartDataRef.current;

        if (chartRef.current && selectedMode && newData[selectedMode]) {
            const { labels, data } = newData[selectedMode];

                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }

                chart = new Chart(chartRef.current, {
                    type: "line",
                    data: {
                        labels: labels || [],
                        datasets: [
                            {
                                label: "Temperatura",
                                borderColor: "#0B3954",
                                data: data || [],
                                fill: false,
                                pointBackgroundColor: "#0B3954",
                                borderWidth: "3",
                                pointBorderWidth: "4",
                                pointHoverRadius: "6",
                                pointHoverBorderWidth: "8",
                                pointHoverBorderColor: "rgb(74,85,104,0.2)",
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false,
                        },
                    },
                });

                chartRef.current.chart = chart;
            }
        

        return () => {
            head.removeChild(script);
            if (chart) {
                chart.destroy();
            }
        };
    }, [selectedMode, isSelected]);

    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setSelectedMode(selectedMode);
        setIsSelected(true);
    };

    return (
        <div className="mt-20 p-6">
            <div className="flex flex-col max-w-6xl mx-auto space-y-4 ">
                <div className="flex items-center justify-center px-4">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="lg:flex w-full justify-between">
                                <h1 id="titulo">Registro de temperaturas</h1>
                                <div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                                    <div className="lg:ml-14">
                                        <div className="bg-azul ease-in duration-150 hover:bg-gray-200 pb-2 pt-1 px-3 rounded-sm">
                                            <select
                                                aria-label="select year"
                                                className="text-xs bg-transparent"
                                                value={selectedMode}
                                                onChange={handleModeChange}
                                            >
                                                <option className="leading-1">Modo</option>
                                                <option className="leading-1">Tres días</option>
                                                <option className="leading-1">Año</option>
                                                <option className="leading-1">Mes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 graphic">
                            {isSelected && selectedMode!=="Modo" ? (
                                <canvas
                                    ref={(ref)=>(chartRef.current = ref)}
                                    id="myChart"
                                    role="img"
                                    aria-label="line graph to show selling overview in terms of months and numbers"
                                ></canvas>
                            ) : (
                                <p className="datos text-xl">Por favor seleccione una opción</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-azul rounded-lg py-6 p-3">
                    <h4>Temperatura actual: <span className="text-white/75">{temperature}°C</span></h4>
                </div>
            </div>
        </div>
    );
};
export default Temperatura;
