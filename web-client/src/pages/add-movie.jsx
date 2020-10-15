import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "./components/web-service";

const AddMovie = () => {
  const [title, SetTitle] = useState(""),
    [resume, SetResume] = useState(""),
    [category, SetCategory] = useState(""),
    [ticketValue, SetTicketValue] = useState(""),
    [image, SetImage] = useState(""),
    [state] = useState(true),
    router = useHistory();

  const onFileChange = (e) => {
    const file = e.target.files[0],
      reader = new FileReader();

    reader.onloadend = () => {
      SetImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveData = (event) => {
    event.preventDefault();

    let post = {
      datos: {
        titulo: title,
        resumen: resume,
        categoria: category,
        valorBoleto: ticketValue,
        imagen: image,
        estado: state,
      },
    };

    if (
      post.datos.titulo === "" ||
      post.datos.resumen === "" ||
      post.datos.categoria === "" ||
      post.datos.valorBoleto === "" ||
      post.datos.imagen === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${API_URL}/pelicula`, post)
        .then((response) => {
          if (response.data.ok === true) {
            router.push("billboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="flex flex-col px-12 w-full">
      <p className="my-5 text-2xl">Agregar nueva pelicula.</p>
      <form
        className="bg-white shadow-md rounded px-8 py-4 mb-4 flex flex-col my-2 mx-8"
        onSubmit={saveData}
      >
        <div className="flex xl:flex-row lg:flex-row flex-col">
          <div className="flex flex-col xl:w-3/4 lg:w-3/4 w-full mb-4">
            <div className="w-full px-2">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="title"
              >
                Título
              </label>
              <input
                className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                type="text"
                placeholder="Ej: El Viaje al Centro de la Tierra"
                value={title}
                onChange={(event) => SetTitle(event.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="-mx-3 md:flex mb-6 ">
              <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="resume"
                >
                  Resumen
                </label>
                <textarea
                  className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder="Sinopsis de la película"
                  value={resume}
                  onChange={(event) => SetResume(event.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Categoria
                </label>
                <input
                  className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder="Ej: Comedia"
                  value={category}
                  onChange={(event) => SetCategory(event.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="ticketValue"
                >
                  Valor del Boleto
                </label>
                <input
                  className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder="Ej: 3.50"
                  value={ticketValue}
                  onChange={(event) => SetTicketValue(event.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="xl:w-1/4 lg:w-1/4 w-full">
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-xs font-bold mb-2"
                htmlFor="image"
              >
                Portada
              </label>
              <input
                className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                type="file"
                defaultValue={image}
                onChange={onFileChange}
              />
            </div>
            <div className="w-full flex justify-center">
              {image ? (
                <img alt="preview" className="w-64 h-64" src={image} />
              ) : null}
            </div>
          </div>
        </div>
        <p className="text-red text-xs italic">
          Por favor complete todos los campos.
        </p>
        <div className="mt-4 text-center">
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

export default AddMovie;
