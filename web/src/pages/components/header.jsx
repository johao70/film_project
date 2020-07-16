import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";

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

  // logout() {
  //   localStorage.clear();
  //   this.props.history.push("/");
  // }

  render() {
    const { personaData } = this.state;

    return (
      <section className="flex justify-between items-center px-12 border-b-2 py-2">
        <h1 className="text-teal-lighter">Bienvenid@ {personaData.nombre}</h1>

        <Link to="/">
          <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </Link>
      </section>
    );
  }
}

export default withRouter(Header);
