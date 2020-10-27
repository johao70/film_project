import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";

import { API_URL } from "./components/web-service";

ReactModal.setAppElement("#modalDialog");

const Schedules = () => {
  const [table_header] = useState({
      id: "N°",
      hour: "Horas de Proyección",
    }),
    [schedules, SetSchedules] = useState([]),
    [hour, SetHour] = useState(""),
    [showModal, SetShowModal] = useState(false),
    router = useHistory();

  useEffect(() => {
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
        hora: hour,
      },
    };

    if (hour === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${API_URL}/horario`, post)
        .then((response) => {
          if (response.data.ok) {
            router.go(0);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const deleteData = (value) => {
    axios.delete(`${API_URL}/horario/${value}`);
    router.go(0);
  };

  return (
    <div className="px-3 py-4 flex flex-col w-full">
      <div className="flex flex-col px-12">
        <p className="mt-5 text-2xl">Horarios</p>
      </div>
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead className="border-b">
          <tr>
            <th className="text-left p-3 px-5">{table_header.id}</th>
            <th className="text-left p-3 px-5">{table_header.hour}</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((element, index) => (
            <tr
              className="border-b hover:bg-orange-100 bg-gray-100"
              key={element.id}
            >
              <td className="p-2 px-5">{index + 1}</td>
              <td className="p-2 px-5">{element.hora}</td>
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
        className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 flex items-center w-56"
        onClick={() => SetShowModal(!showModal)}
      >
        <i className="fas fa-plus-square mr-2"></i>
        Agregar nuevo horario
      </button>

      <ReactModal
        isOpen={showModal}
        className="flex justify-center items-center h-screen"
      >
        <form
          className="max-w-xl m-4 p-10 bg-white rounded shadow-xl border-2 border-black"
          onSubmit={saveData}
        >
          <div className="flex justify-between w-full items-center py-4 border-b-2">
            <p className="text-gray-800 font-medium text-center text-2xl">
              Nuevo Horario
            </p>
            <button onClick={() => SetShowModal(!showModal)}>
              <i className="fas fa-times-circle text-4xl text-red-500 hover:text-red-700"></i>
            </button>
          </div>

          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="hour">
              Horario
            </label>
            <input
              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
              type="text"
              placeholder="Ej: 10 a 12 horas"
              value={hour}
              onChange={(event) => SetHour(event.target.value)}
              autoComplete="off"
            />
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
      </ReactModal>
    </div>
  );
};

export default Schedules;
