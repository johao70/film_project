import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./components/web-service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      clave: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginAccess = (e) => {
    e.preventDefault();

    if (this.state.correo === "" || this.state.clave === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${API_URL}/login`, this.state)
        .then((response) => {
          if (response.data.mensaje === "found") {
            localStorage.setItem("correo", this.state.correo);
            this.props.history.push("movies");
          }
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Datos incorrectos, vuelve a intentarlo.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error(error);
        });
    }
  };

  render() {
    const { correo, clave } = this.state,
      backgroundPic = require("../assets/login.jpg")

    return (
      <div className="w-screen h-screen flex justify-center items-center" style={{ backgroundImage: `url(${backgroundPic})` }}>
        <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <h1 className="font-bold uppercase underline mb-4 text-center text-2xl">
            Bienvenido!
          </h1>
          <form onSubmit={this.loginAccess}>
            <div className="mb-6">
              <label className="font-bold text-gray-700 mb-2">
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
              <label className="font-bold text-gray-700 mb-2">Contraseña</label>
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
                <i className="fas fa-sign-in-alt mr-2"></i>
                Ingresar
              </button>

              <button
                className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                onClick={() => this.props.history.push("register")}
              >
                <i className="fas fa-user-plus mr-2"></i>
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
