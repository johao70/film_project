import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar.jsx";
import Header from "./components/header.jsx";
import axios from "axios";

const API = "http://localhost:5000/film/pelicula";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasDisponible: [],
      peliculas: [],
    };
  }

  componentDidMount() {
    axios
      .get(API + "?estado=1")
      .then((response) => {
        this.setState({ peliculasDisponible: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(API)
      .then((response) => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logicDelete = (item) => {
    axios
      .put(`${API}/${item}`, {
        datos: {
          id: item,
          estado: 0,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateMovie = (
    p_id,
    p_titulo,
    p_resumen,
    p_imagen,
    p_categoria,
    p_valorBoleto
  ) => {
    localStorage.setItem("id", p_id);
    localStorage.setItem("titulo", p_titulo);
    localStorage.setItem("resumen", p_resumen);
    localStorage.setItem("imagen", p_imagen);
    localStorage.setItem("categoria", p_categoria);
    localStorage.setItem("valorBoleto", p_valorBoleto);
    window.location.assign("http://localhost:3000/update_movie");
  };

  render() {
    const { peliculasDisponible, peliculas } = this.state;

    return (
      <div className="flex">
        <div className="flex w-1/5 border-r-2 h-screen px-6">
          <Sidebar />
        </div>
        <div className="w-full">
          <div>
            <Header />
          </div>
          <div className="flex flex-col px-12 border-b-2">
            <p className="my-5 text-2xl">Cartelera Disponible</p>
            <div className="flex flex-wrap items-center justify-center py-2">
              {peliculasDisponible.map((element) => (
                <div className="max-w-md flex" key={element.id}>
                  <img
                    className="w-48"
                    src={element.imagen}
                    alt={element.titulo}
                  />
                  <div className="bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <h1 className="font-bold text-2xl py-2">
                        {element.titulo}
                      </h1>
                      <p className="text-gray-700">{element.resumen}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-archive text-2xl mr-2"></i>
                      <div className="text-sm">
                        <p className="leading-none">{element.categoria}</p>
                        <p>Valor: $ {element.valorBoleto}</p>
                      </div>
                    </div>
                    <div className="flex m-3 justify-between">
                      <button
                        className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                        onClick={() =>
                          this.updateMovie(
                            element.id,
                            element.titulo,
                            element.resumen,
                            element.imagen,
                            element.categoria,
                            element.valorBoleto
                          )
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                        onClick={() => this.logicDelete(element.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr />

            <p className="my-5 text-2xl">Historial Cartelera</p>
            <div className="flex flex-wrap items-center justify-center py-2">
              {peliculas.map((element) => (
                <div
                  className="max-w-md flex border rounded-md mx-2"
                  key={element.id}
                >
                  <img
                    className="w-48"
                    src={element.imagen}
                    alt={element.titulo}
                  />
                  <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-black font-bold text-xl mb-2">
                        {element.titulo}
                      </div>
                      <p className="text-grey-darker text-base">
                        {element.resumen}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-archive text-2xl mr-2"></i>
                      <div className="text-sm">
                        <p className="text-black leading-none">
                          {element.categoria}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Movies);
