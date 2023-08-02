import React, { useState, useEffect } from 'react';
import { db2 } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const Lanucz = () => {

    const [wordWrapperContent, setWordWrapperContent] = useState('');
    const words = ['Acerca de Lanucz']; // Arreglo que contiene las palabras a mostrar
    const [addingWord, setAddingWord] = useState(false); // Variable que indica si se está agregando una palabra o eliminando caracteres
    const [data, setData] = useState({});
    const [items, setItems] = useState(null);

    useEffect(() => {
        const getDataFromFirebase = async () => {
            const dataRef = doc(db2, 'Descripciones', 'HV37fj07NiI77IPpNCP6');
            const docSnap = await getDoc(dataRef);
            if (docSnap.exists()) {
                setItems(docSnap.data());
            } else {
                console.log("Error al obtener datos desde Firebase");
            };
        };
        getDataFromFirebase();
    }, []);

    const historia = items && items.Historia ? items.Historia : '';
    const mision = items && items.Mision ? items.Mision : '';
    const vision = items && items.Vision ? items.Vision : '';
    const politicas = items && items.Politicas ? items.Politicas : '';
    const valores = items && items.Valores ? items.Valores : [];
    const integrantes = items && items.Integrantes ? items.Integrantes : [];
    const puestos = items && items.Puestos ? items.Puestos : [];

    useEffect(() => {
        const wordWrapper = document.getElementById('word');
        if (wordWrapper) {
            setWordWrapperContent(wordWrapper.innerHTML);
            let counter = 0;
            let addingWord = false;
            const interval = setInterval(() => {
                if (wordWrapperContent.length > 15 && !addingWord) {
                    setWordWrapperContent(wordWrapper.innerHTML);
                } else {
                    addingWord = true;
                }
                if (addingWord) {
                    if (wordWrapperContent.length < words[counter].length) {
                        wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
                        setWordWrapperContent(wordWrapper.innerHTML);
                    } else {
                        if (counter < words.length) {
                            counter++;
                        } else {
                            counter = 0;
                        }
                        addingWord = false;
                    }
                }
            }, 20);
            return () => clearInterval(interval);
        }
    }, [wordWrapperContent, addingWord]);
    return (
        <div className="mt-20 p-6">
            <card className="flex-col max-w-6xl mx-auto space-y-4 ">
                <div className="white rounded-lg py-6 p-3">
                    <div className="text-center">
                        ㅤ<h1 className='animate-bounce tracking-wide text-2xl -mt-8' id='word'></h1>
                    </div>
                    <div className="mx-auto mt-6 flex justify-center">
                        <span className="inline-block h-1 w-40 rounded-full bg-azul" />
                        <span className="mx-1 inline-block h-1 w-40 rounded-full bg-azul" />
                    </div>
                </div>
            </card>
            <div>
                <section className="bg-white rounded-lg bg-azul">
                    <div className="container mx-auto px-6 py-10">
                        <h2 className="text-center text-xl font-semibold capitalize text-gray-800 dark:text-white lg:text-xl tracking-wide">Historia</h2>
                        <p className="mt-4 text-justify font-sans tracking-wider text-gray-600 dark:text-gray-300">{historia}</p>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
                            <div>
                                <img className="h-96 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-800 dark:text-white">Misión</h3>
                                <p className="mt-2 text-justify font-sans tracking-wider text-gray-600 dark:text-gray-300">{mision}</p>
                            </div>
                            <div>
                                <img className="h-96 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-800 dark:text-white">Visión</h3>
                                <p className="mt-2 text-justify font-sans tracking-wider text-gray-600 dark:text-gray-300">{vision}</p>
                            </div>
                            <div>
                                <img className="h-96 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-800 dark:text-white">Valores</h3>
                                <ul className="mt-2 font-sans tracking-wider text-gray-600 dark:text-gray-300 valores">
                                    {valores.map((valor, index) => <li key={index}>{valor}</li>)}
                                </ul>
                            </div>
                        </div>
                        <br />
                        <h2 className="text-center text-xl font-semibold capitalize text-gray-800 dark:text-white lg:text-xl tracking-wide">Políticas</h2>
                        <p className="mt-4 text-justify font-sans tracking-wider text-gray-600 dark:text-gray-300">{politicas}</p>
                    </div>
                </section>
                <section className="mt-6 rounded-lg bg-white bg-azul">

                    <div className="rounded-lg">
                        <div className="container mx-auto px-6 pt-8">
                            <h2 className="text-center text-xl font-semibold  text-gray-800 dark:text-white lg:text-xl">Miembros del equipo</h2>
                            <div className="mx-auto mt-6 flex justify-center">
                                <span className="inline-block h-1 w-40 rounded-full bg-white" />
                                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-white" />
                                <span className="inline-block h-1 w-1 rounded-full bg-white" />
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 pt-0 pb-6">
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                            <div className="flex flex-col items-center rounded-xl p-4 bg-white-60 sm:p-6">
                                <img className="aspect-square w-full rounded-xl object-cover" src="../pinguinos/Pinguino09.png" />
                                {integrantes.length > 0 && (
                                    <h3 className="mt-4 text-lg font-semibold capitalize text-gray-900">{integrantes[0]}</h3>
                                )}
                                {puestos.length > 0 && (
                                    <p className="mt-2 capitalize text-gray-800">{puestos[1]}</p>
                                )}
                                <div className="-mx-2 mt-3 flex">
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Reddit">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Facebook">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Github">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col items-center rounded-xl p-4 bg-white-60 sm:p-6">
                                <img className="aspect-square w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-900">{integrantes[2]}</h3>

                                <p className="mt-2 capitalize text-gray-800">{puestos[0]}</p>

                                <div className="-mx-2 mt-3 flex">
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Reddit">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Facebook">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Github">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col items-center rounded-xl p-4 bg-white-60 sm:p-6">
                                <img className="aspect-square w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-900">{integrantes[1]}</h3>
                                <p className="mt-2 capitalize text-gray-800">{puestos[0]}</p>
                                <div className="-mx-2 mt-3 flex">
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Reddit">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Facebook">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Github">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col items-center rounded-xl p-4 bg-white-60 sm:p-6">
                                <img className="aspect-square w-full rounded-xl object-cover" src="https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2luZyUyMHBlbmd1aW58ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt />
                                <h3 className="mt-4 text-lg font-semibold capitalize text-gray-900">{integrantes[3]}</h3>
                                <p className="mt-2 capitalize text-gray-800">{puestos[2]}</p>
                                <div className="-mx-2 mt-3 flex">
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Reddit">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Facebook">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                    <a href="#" className="mx-2 text-gray-800 transition-colors duration-300 hover:text-gray-600" aria-label="Github">
                                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="mt-3.5 rounded-lg bg-white dark:bg-gray-900">
                    <div className="container  mx-auto px-6 py-12">
                        <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">Contactanos</p>
                                <div className="mt-5 flex flex-col items-start space-y-2">
                                    <a href="#" className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">+880 768 473 4978</a>
                                    <a href="#" className="text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400">info@merakiui.com</a>
                                </div>
                            </div>
                        </div>
                        <hr className="my-6 border-gray-200 dark:border-gray-700 md:my-10" />
                        <div className="flex flex-col items-center justify-between sm:flex-row">
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 sm:mt-0">© Copyright 2023. Lanucz Inc.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div >
    );
}
export default Lanucz;