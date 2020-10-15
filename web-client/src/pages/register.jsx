import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./components/web-service";

const backgroundPic = require("../assets/background.jpg");

const Register = () => {
  const [name, SetName] = useState(""),
    [email, SetEmail] = useState(""),
    [password, SetPassword] = useState(""),
    router = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    let post = {
      datos: {
        nombre: name,
        correo: email,
        clave: password,
      },
    };

    if (name === "" || email === "" || password === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${API_URL}/persona`, post)
        .then((response) => {
          if (response.data.ok === true) {
            localStorage.setItem("userEmail", email);
            router.push("billboard");
          }
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salio mal, vuelve a intentarlo más tarde.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error(error);
        });
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundPic})` }}
    >
      <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h1 className="font-bold uppercase underline mb-4 text-center text-2xl">
          Registrarse!
        </h1>
        <form onSubmit={registerUser}>
          <div className="mb-6">
            <label
              className="font-bold text-gray-700 block mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
              type="text"
              placeholder="Ej: Paul"
              value={name}
              onChange={(event) => SetName(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-6">
            <label
              className="font-bold text-gray-700 block mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
              type="email"
              placeholder="tucorreo@email.com"
              value={email}
              onChange={(event) => SetEmail(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-6">
            <label
              className="font-bold text-gray-700 block mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
              type="password"
              placeholder="******"
              value={password}
              minLength="6"
              onChange={(event) => SetPassword(event.target.value)}
              securetextentry="true"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
              type="submit"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Registrarse
            </button>

            <button
              className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
              onClick={() => router.push("/")}
            >
              <i className="fas fa-undo mr-2"></i>
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
