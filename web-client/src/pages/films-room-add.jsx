import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { API_URL } from "./components/web-service";

const FilmsRoomAdd = () => {
  const [rooms, SetRooms] = useState([]),
    [films, SetFilms] = useState([]),
    [schedules, SetSchedules] = useState([]),
    [roomID, SetRoomID] = useState(""),
    [filmID, SetFilmID] = useState(""),
    [scheduleID, SetScheduleID] = useState(""),
    router = useHistory();

  useEffect(() => {
    axios
      .get(`${API_URL}/sala`)
      .then((response) => {
        SetRooms(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/pelicula?estado=1`)
      .then((response) => {
        SetFilms(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/horario`)
      .then((response) => {
        SetSchedules(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const saveData = (event) => {
    event.preventDefault();

    let post = {
      datos: {
        idsala: roomID,
        idpelicula: filmID,
        idhorario: scheduleID,
      },
    };

    if (roomID === "" || filmID === "" || scheduleID === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${API_URL}/sala_pelicula`, post)
        .then((response) => {
          if (response.data.ok) {
            router.push("films-room");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="flex flex-col px-12">
      <p className="my-5 text-2xl">Asignar Peliculas.</p>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8 w-full"
        onSubmit={saveData}
      >
        <div className="-mx-3 md:flex mb-6 ">
          <div className="md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="roomID"
            >
              Sala
            </label>
            <select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              value={roomID}
              onChange={(event) => SetRoomID(event.target.value)}
            >
              <option className="text-sm text-gray-600">
                Seleccione sala....
              </option>
              {rooms.map((element) => (
                <option key={element.id} value={element.id}>
                  {" "}
                  {element.nombre}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="filmID"
            >
              Pelicula
            </label>
            <select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              value={filmID}
              onChange={(event) => SetFilmID(event.target.value)}
            >
              <option className="text-sm text-gray-600">
                Seleccione pelicula....
              </option>
              {films.map((element) => (
                <option key={element.id} value={element.id}>
                  {" "}
                  {element.titulo}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="scheduleID"
            >
              Horario
            </label>
            <select
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              value={scheduleID}
              onChange={(event) => SetScheduleID(event.target.value)}
            >
              <option className="text-sm text-gray-600">
                Seleccione horario....
              </option>
              {schedules.map((element) => (
                <option key={element.id} value={element.id}>
                  {" "}
                  {element.hora}{" "}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
            type="submit"
          >
            <i className="fas fa-save mr-2"></i>
            Grabar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilmsRoomAdd;
