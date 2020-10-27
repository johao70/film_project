import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { API_URL } from "./components/web-service";

const FilmsRoom = () => {
  const [table_header] = useState({
      sala: "Nombre de la Sala",
      pelicula: "Película",
      horario: "Horario",
    }),
    [filmsRoom, SetFilmsRoom] = useState([]),
    router = useHistory();

  useEffect(() => {
    axios
      .get(`${API_URL}/raw3`)
      .then((response) => {
        SetFilmsRoom(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteData = (value) => {
    axios.delete(`${API_URL}/sala_pelicula/${value}`);
    router.go(0);
  };

  return (
    <div className="px-3 py-4 flex flex-col w-full">
      <div className="flex flex-col px-12">
        <p className="mt-5 text-2xl">Asignar Películas</p>
      </div>
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead className="border-b">
          <tr>
            <th className="text-left p-3 px-5">{table_header.sala}</th>
            <th className="text-left p-3 px-5">{table_header.pelicula}</th>
            <th className="text-left p-3 px-5">{table_header.horario}</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filmsRoom.map((element) => (
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
                  onClick={() => deleteData(element.id)}
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
        onClick={() => router.push("films-room-add")}
      >
        <i className="fas fa-plus-square mr-2"></i>
        Asignar
      </button>
    </div>
  );
};

export default FilmsRoom;
