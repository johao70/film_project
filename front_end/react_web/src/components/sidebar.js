/* eslint-disable jsx-a11y/anchor-is-valid */
import React from'react';
import { Link } from "react-router-dom";

const Sidebar = () => (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <div className="flex items-center flex-no-shrink text-white mr-6 mx-64">

            </div>
            <div className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0">
                <span className="font-semibold text-xl tracking-tight text-black">Cine Yavirac</span>
            </div>
            <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded">
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    <li className="items-center">
                        <Link to="/home">
                            <button className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block">
                                <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>
                                Inicio
                            </button>
                        </Link>
                    </li>
                    <li className="items-center">
                        <Link to="/add_movie">
                            <button className="text-gray-800 text-xs uppercase py-3 font-bold block">
                                <i className="fas fa-newspaper text-gray-900 mr-2 text-sm"></i>
                                Reporte de Compras
                            </button>
                        </Link>
                    </li>
                    <li className="items-center">
                        <div className="text-gray-800 text-xs uppercase py-3 font-bold block">
                            <i className="fas fa-book-open text-gray-900 mr-2 text-sm"></i>
                            Añadir Peliculas
                            {/* <ul>
                                <Link to="/add_book">
                                    <li className="mx-8 hover:text-gray-600">
                                        <i className="fas fa-arrow-circle-right"></i>
                                        Agregar Libro
                                    </li>
                                </Link>
                                <Link to="/virtual_library">
                                    <li className="mx-8 hover:text-gray-600">
                                        <i className="fas fa-arrow-circle-right"></i>
                                        Biblioteca Virtual
                                    </li>
                                </Link>
                            </ul> */}
                        </div>
                    </li>
                    <li className="items-center">
                        <Link to="/reserve">
                            <button className="text-gray-800 text-xs uppercase py-3 font-bold block">
                                <i className="fas fa-check text-gray-900 mr-2 text-sm"></i>
                                Crear y Asignar Sala
                            </button>
                        </Link>
                    </li>
                    {/* <li className="items-center">
                        <Link to="/reserve_history">
                            <button className="text-gray-800 text-xs uppercase py-3 font-bold block">
                                <i className="fas fa-archive text-gray-900 mr-2 text-sm"></i>
                                Historial de Reservas
                            </button>
                        </Link>
                    </li> */}
                </ul>
                <hr />
            </div>
        </div>
    </nav>
)

export default Sidebar;