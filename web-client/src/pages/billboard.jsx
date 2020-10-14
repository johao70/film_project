import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { API_URL } from "./components/web-service";

const Billboard = () => {
  const [availableMovies, SetAvailableMovies] = useState([]),
    router = useHistory()

  useEffect(() => {
    axios
      .get(`${API_URL}/pelicula?estado=1`)
      .then((response) => {
        SetAvailableMovies(response.data.datos)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  const logicDelete = (item) => {
    axios
      .put(`${API_URL}/pelicula/${item}`, {
        datos: {
          id: item,
          estado: 0,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateMovie = (
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
    router.push("/billboard/update-movie");
  };


    return (
      <div className="w-full flex xl:flex-row lg:flex-row flex-col">
        <div className="flex flex-col xl:px-12 lg:px-12 w-full">
          <p className="py-3 text-2xl text-center">Billboard Available</p>
          <div className="flex flex-wrap items-center justify-center">
            {availableMovies.map((element) => (
              <div
                className="max-w-md border-2 mx-2 my-2 px-2 py-2"
                key={element.id}
              >
                <div className="flex">
                  <div className="w-1/2">
                    <img
                      className="w-full h-64"
                      src={element.imagen}
                      alt={element.titulo}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <h1 className="font-bold text-2xl">{element.titulo}</h1>
                    <div className="flex flex-col">
                      <div className="flex py-6">
                        <i className="fas fa-archive text-2xl mr-2"></i>
                        <div className="text-sm">
                          <p className="leading-none">{element.categoria}</p>
                          <p>Valor: $ {element.valorBoleto}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="py-1">
                          <button
                            className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                            onClick={() =>
                              updateMovie(
                                element.id,
                                element.titulo,
                                element.resumen,
                                element.imagen,
                                element.categoria,
                                element.valorBoleto
                              )
                            }
                          >
                            <i className="fas fa-edit mr-2"></i>
                            Modificar
                          </button>
                        </div>
                        <div className="py-1">
                          <button
                            className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                            onClick={() => logicDelete(element.id)}
                          >
                            <i className="fas fa-trash-alt mr-2"></i>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 text-justify">
                    {element.resumen}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  
}

export default Billboard;
