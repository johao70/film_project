import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <nav>
        <div className="text-left text-gray-700 whitespace-no-wrap uppercase p-4">
          <h1 className="font-bold text-2xl tracking-tight">Proyecto Cine</h1>
        </div>
        <ul className="flex flex-col list-none">
          {/* <li className="items-center">
            <Link to="/report">
              <button className="text-gray-900 text-xs uppercase py-3 font-bold block">
                <i className="fas fa-newspaper mr-2 text-sm"></i>
                Reporte de Compras
              </button>
            </Link>
          </li> */}
          <li className="items-center">
            <p className="text-gray-900 text-xs uppercase py-3 font-bold block">
              <i className="fas fa-book-open mr-2 text-sm"></i>
              Películas
            </p>
            <ul>
              <Link to="/add_movie">
                <li className="mx-8 text-gray-600 hover:text-gray-900">
                  <i className="fas fa-arrow-circle-right"></i>
                  Crear Película
                </li>
              </Link>
            </ul>
            <ul>
              <Link to="/movies">
                <li className="mx-8 text-gray-600 hover:text-gray-900">
                  <i className="fas fa-arrow-circle-right"></i>
                  Catálogo
                </li>
              </Link>
            </ul>
          </li>

          <li className="items-center">
            <p className="text-gray-900 text-xs uppercase py-3 font-bold block">
              <i className="fas fa-check mr-2 text-sm"></i>
              Crear y Asignar
            </p>
            <ul>
              <Link to="/rooms">
                <li className="mx-8 text-gray-600 hover:text-gray-900">
                  <i className="fas fa-arrow-circle-right"></i>
                  Crear Salas
                </li>
              </Link>
            </ul>
            <ul>
              <Link to="/schedules">
                <li className="mx-8 text-gray-600 hover:text-gray-900">
                  <i className="fas fa-arrow-circle-right"></i>
                  Crear Horarios
                </li>
              </Link>
            </ul>
            <ul>
              <Link to="/films_room">
                <li className="mx-8 text-gray-600 hover:text-gray-900">
                  <i className="fas fa-arrow-circle-right"></i>
                  Asignar Peliculas
                </li>
              </Link>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);
