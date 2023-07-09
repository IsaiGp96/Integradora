import React from "react";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Temperatura = () => {
    const chartRef = useRef(null);
    const [selectedMode, setSelectedMode] = useState("");
    const chartDataRef = useRef({});

    chartDataRef.current = {
        Modo: {
            labels: ["Anteayer", "Ayer", "Hoy"],
            data: [null, 34, 50],
        },
        Año: {
            labels: [
                "Jan",
                "Feb",
                "March",
                "April",
                "May",
                "June",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            data: [60, 40, 62, 30, 20, 60, 23, 30, 20, 20, 10, 120],
        },
        Mes: {
            labels: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
            data: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
    };

    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js@2.8.0");
        head.appendChild(script);

        let chart = null;

        const newData = chartDataRef.current;

        if (chartRef.current && selectedMode) {
            const modeData = newData[selectedMode];

            if (modeData) {
                const { labels, data } = modeData;

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
        }
        else {
            chart = new Chart(chartRef.current, {
                type: "line",
                data: {
                    labels: newData["Modo"].labels,
                    datasets: [
                        {
                            label: "Temperatura",
                            borderColor: "#0B3954",
                            data: newData["Modo"].data,
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
    }, [selectedMode]);

    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setSelectedMode(selectedMode);
    };

    return (
        <div className="mt-20 p-6 pb-0">
            <card className="flex flex-col max-w-6xl mx-auto space-y-4 ">
                <div className="flex items-center justify-center py-8 px-4">
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
                                                <option className="leading-1">Año</option>
                                                <option className="leading-1">Mes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 graphic">
                            <canvas
                                ref={chartRef}
                                id="myChart"
                                role="img"
                                aria-label="line graph to show selling overview in terms of months and numbers"
                            ></canvas>
                        </div>
                    </div>
                </div>
                <div className="bg-azul rounded-lg py-6 p-3">
                    <h4>Temperatura actual: <span className="text-white/75">0.00°C</span></h4>
                </div>
            </card>
        </div>
    );
};
export default Temperatura;
