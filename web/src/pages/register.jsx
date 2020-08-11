import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./components/web-service";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
      clave: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = (e) => {
    e.preventDefault();

    this.post = {
      datos: {
        nombre: this.state.nombre,
        correo: this.state.correo,
        clave: this.state.clave,
      },
    };

    if (
      this.post.datos.nombre === "" ||
      this.post.datos.correo === "" ||
      this.post.datos.clave === ""
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
        .post(`${API_URL}/persona`, this.post)
        .then((response) => {
          if (response.data.ok === true) {
            localStorage.setItem("correo", this.state.correo);
            this.props.history.push("movies");
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

  render() {
    const { nombre, correo, clave } = this.state,
      backgroundPic = require("../images/background.jpg");

    return (
      <div
        className="w-screen h-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundPic})` }}
      >
        <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <h1 className="font-bold uppercase underline mb-4 text-center text-2xl">
            Registrarse!
          </h1>
          <form onSubmit={this.registerUser}>
            <div className="mb-6">
              <label className="font-bold text-gray-700 block mb-2">
                Nombre
              </label>
              <input
                className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
                type="text"
                placeholder="Ej: Paul"
                name="nombre"
                value={nombre}
                onChange={this.changeHandler}
                autoComplete="off"
              />
            </div>

            <div className="mb-6">
              <label className="font-bold text-gray-700 block mb-2">
                Correo Electrónico
              </label>
              <input
                className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
                type="text"
                placeholder="tucorreo@email.com"
                name="correo"
                value={correo}
                onChange={this.changeHandler}
                autoComplete="off"
              />
            </div>

            <div className="mb-6">
              <label className="font-bold text-gray-700 block mb-2">
                Contraseña
              </label>
              <input
                className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-2 py-2 rounded shadow"
                type="password"
                placeholder="******"
                name="clave"
                value={clave}
                minLength="6"
                onChange={this.changeHandler}
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
                onClick={() => this.props.history.push("/")}
              >
                <i className="fas fa-undo mr-2"></i>
                Regresar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
