import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "./components/web-service";

class UpdateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      titulo: localStorage.getItem("titulo"),
      resumen: localStorage.getItem("resumen"),
      categoria: localStorage.getItem("categoria"),
      valorBoleto: localStorage.getItem("valorBoleto"),
      antigua_imagen: localStorage.getItem("imagen"),
      imagen: "",
      estado: true,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ newImage: true, imagen: reader.result });
    };
    reader.readAsDataURL(file);
  };

  saveData = (e) => {
    e.preventDefault();

    this.update = {
      datos: {
        id: this.state.id,
        titulo: this.state.titulo,
        resumen: this.state.resumen,
        categoria: this.state.categoria,
        valorBoleto: this.state.valorBoleto,
        imagen: !this.state.imagen
          ? this.state.image
          : this.state.antigua_imagen,
        estado: this.state.estado,
      },
    };

    if (
      this.update.datos.id === "" ||
      this.update.datos.titulo === "" ||
      this.update.datos.resumen === "" ||
      this.update.datos.categoria === "" ||
      this.update.datos.valorBoleto === ""
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
        .put(`${API_URL}/pelicula/${this.state.id}`, this.update)
        .then((response) => {
          if (response.data.ok === true) {
            this.props.history.push("billboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const {
      titulo,
      resumen,
      categoria,
      valorBoleto,
      antigua_imagen,
      imagen,
      newImage,
    } = this.state;

    return (
      <div className="flex flex-col">
        <Header />

        <div className="w-full flex xl:flex-row lg:flex-row flex-col">
          <Sidebar />

          <div className="flex flex-col px-12 w-full">
            <p className="my-5 text-2xl">Modificar pelicula.</p>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8"
              onSubmit={this.saveData}
            >
              <div className="flex xl:flex-row lg:flex-row flex-col">
                <div className="flex flex-col xl:w-3/4 lg:w-3/4 w-full mb-4">
                  <div className="w-full px-2">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="titulo"
                    >
                      Título
                    </label>
                    <input
                      className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                      type="text"
                      placeholder="Ej: El Viaje al Centro de la Tierra"
                      name="titulo"
                      value={titulo}
                      onChange={this.changeHandler}
                      autoComplete="off"
                    />
                  </div>
                  <div className="-mx-3 md:flex mb-6 ">
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="resumen"
                      >
                        Resumen
                      </label>
                      <textarea
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Sinopsis de la película"
                        name="resumen"
                        value={resumen}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                    <div className="md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="categoria"
                      >
                        Categoria
                      </label>
                      <input
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Ej: Comedia"
                        name="categoria"
                        value={categoria}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                    <div className="md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="valorBoleto"
                      >
                        Valor del Boleto
                      </label>
                      <input
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Ej: 3.50"
                        name="valorBoleto"
                        value={valorBoleto}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/4 w-full">
                  <div className="w-full flex justify-center">
                    {newImage ? (
                      <img alt="preview" className="w-64 h-64" src={imagen} />
                    ) : (
                      <img
                        alt="preview"
                        className="w-64 h-64"
                        src={antigua_imagen}
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-red text-xs italic">
                Por favor complete todos los campos.
              </p>
              <div className="mt-4 text-center">
                <button
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                  type="submit"
                >
                  <i className="fas fa-save mr-2"></i>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateMovie);
