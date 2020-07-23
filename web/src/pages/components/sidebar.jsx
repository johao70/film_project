import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <nav>
        <div className="text-gray-700 whitespace-no-wrap uppercase p-4">
          <h1 className="font-bold text-2xl tracking-tight">Proyecto Cine</h1>
        </div>
        <ul className="flex flex-col">
          <li className="py-4">
            <p className="text-gray-900 text-md uppercase py-3 font-bold">
              <i className="fas fa-film mr-2 text-md"></i>
              Películas
            </p>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("add_movie");
                }}
              >
                <i className="fas fa-plus mr-2"></i>
                Crear Película
              </button>
            </ul>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("movies");
                }}
              >
                <i className="fas fa-ticket-alt mr-2"></i>
                Catálogo
              </button>
            </ul>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("report");
                }}
              >
                <i className="fas fa-newspaper mr-2"></i>
                Reporte Compras
              </button>
            </ul>
          </li>

          <li className="py-2">
            <p className="text-gray-900 text-md uppercase py-3 font-bold">
              <i className="fas fa-check mr-2 text-md"></i>
              Crear y Asignar
            </p>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("rooms");
                }}
              >
                <i className="fas fa-person-booth mr-2"></i>
                Crear Salas
              </button>
            </ul>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("schedules");
                }}
              >
                <i className="fas fa-calendar-plus mr-2"></i>
                Crear Horarios
              </button>
            </ul>
            <ul>
              <button
                className="mx-6 text-gray-600 hover:text-gray-900"
                onClick={() => {
                  this.props.history.push("films_room");
                }}
              >
                <i className="fas fa-map-signs mr-2"></i>
                Asignar Peliculas
              </button>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);
