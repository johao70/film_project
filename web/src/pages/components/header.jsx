import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const API = "http://localhost:5000/film/persona";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personaData: "",
    };
  }

  componentDidMount() {
    let correo = localStorage.getItem("correo");

    axios
      .get(`${API}?correo=${correo}`)
      .then((response) => {
        this.setState({ personaData: response.data.datos[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout = () => {
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
          this.props.history.push("/");
        });
      }
    });
  };

  render() {
    const { personaData } = this.state;

    return (
      <section className="flex justify-between items-center px-12 border-b-2 py-2">
        <h1 className="text-teal-lighter">Bienvenid@ {personaData.nombre}</h1>
        <button
          className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
          onClick={() => this.logout()}
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Salir
        </button>
      </section>
    );
  }
}

export default withRouter(Header);
