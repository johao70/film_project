import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { API_URL } from "../components/web-service";

const Header = () => {
  const [userData, SetUserData] = useState(""),
    router = useHistory();

  useEffect(() => {
    let userEmail = localStorage.getItem("userEmail");

    axios
      .get(`${API_URL}/persona?correo=${userEmail}`)
      .then((response) => {
        SetUserData(response.data.datos[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const logout = () => {
    Swal.fire({
      title: "¿Esta seguro de salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Regresar",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sesión cerrada exitosamente!",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          localStorage.clear();
          router.push("/");
        });
      }
    });
  };

  return (
    <section className="flex justify-between items-center px-12 border-b-2 py-2">
      <h1 className="text-teal-lighter">Welcome {userData.nombre}</h1>
      <button
        className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
        onClick={logout}
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        Salir
      </button>
    </section>
  );
};

export default Header;
