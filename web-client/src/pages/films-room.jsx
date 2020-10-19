import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { API_URL } from "./components/web-service";

class FilmsRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        sala: "Nombre de la Sala",
        pelicula: "Película",
        horario: "Horario",
      },
      sala_peliculas: [],
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/raw3`)
      .then((response) => {
        this.setState({ sala_peliculas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteData = (value) => {
    axios.delete(`${API_URL}/sala_pelicula/${value}`, {
      data: { id: value },
    });
    window.location.assign("http://localhost:3000/films-room");
  };

  render() {
    const { sala_peliculas } = this.state;

    return (
      <div className="px-3 py-4 flex flex-col w-full">
        <div className="flex flex-col px-12">
          <p className="mt-5 text-2xl">Asignar Películas</p>
        </div>
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="border-b">
            <tr>
              <th className="text-left p-3 px-5">
                {this.state.table_header.sala}
              </th>
              <th className="text-left p-3 px-5">
                {this.state.table_header.pelicula}
              </th>
              <th className="text-left p-3 px-5">
                {this.state.table_header.horario}
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {sala_peliculas.map((element) => (
              <tr
                className="border-b hover:bg-orange-100 bg-gray-100"
                key={element.id}
              >
                <td className="p-2 px-5">{element.idsala_nombre}</td>
                <td className="p-2 px-5">{element.idpelicula_titulo}</td>
                <td className="p-2 px-5">{element.idhorario_hora}</td>
                <td className="p-2 px-5">
                  <button
                    className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                    onClick={() => this.deleteData(element.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 flex items-center w-32"
          onClick={() => this.props.history.push("films_room_add")}
        >
          <i className="fas fa-plus-square mr-2"></i>
          Asignar
        </button>
      </div>
    );
  }
}

export default withRouter(FilmsRoom);
