import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./components/web-service";

class FilmsRoomAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: [],
      peliculas: [],
      horarios: [],
      idsala: "",
      idpelicula: "",
      idhorario: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/sala`)
      .then((response) => {
        this.setState({ salas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/pelicula?estado=1`)
      .then((response) => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/horario`)
      .then((response) => {
        this.setState({ horarios: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  saveData = (e) => {
    e.preventDefault();
    this.post = {
      datos: {
        idsala: this.state.idsala,
        idpelicula: this.state.idpelicula,
        idhorario: this.state.idhorario,
      },
    };

    if (
      this.post.datos.idsala === "" ||
      this.post.datos.idpelicula === "" ||
      this.post.datos.idhorario === ""
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
        .post(`${API_URL}/sala_pelicula`, this.post)
        .then((response) => {
          if (response.data.ok === true) {
            this.props.history.push("films-room");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const {
      salas,
      peliculas,
      horarios,
      idsala,
      idpelicula,
      idhorario,
    } = this.state;

    return (
      <div className="flex flex-col">
        <Header />

        <div className="w-full flex xl:flex-row lg:flex-row flex-col">
          <Sidebar />
          <div className="flex flex-col px-12">
            <p className="my-5 text-2xl">Asignar Peliculas.</p>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8 w-full"
              onSubmit={this.saveData}
            >
              <div className="-mx-3 md:flex mb-6 ">
                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="idsala"
                  >
                    Sala
                  </label>
                  <select
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    name="idsala"
                    value={idsala}
                    onChange={this.changeHandler}
                  >
                    <option className="text-sm text-gray-600">
                      Seleccione sala....
                    </option>
                    {salas.map((element) => (
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
                    htmlFor="idpelicula"
                  >
                    Pelicula
                  </label>
                  <select
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    name="idpelicula"
                    value={idpelicula}
                    onChange={this.changeHandler}
                  >
                    <option className="text-sm text-gray-600">
                      Seleccione pelicula....
                    </option>
                    {peliculas.map((element) => (
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
                    htmlFor="idhorario"
                  >
                    Horario
                  </label>
                  <select
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    name="idhorario"
                    value={idhorario}
                    onChange={this.changeHandler}
                  >
                    <option className="text-sm text-gray-600">
                      Seleccione horario....
                    </option>
                    {horarios.map((element) => (
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
        </div>
      </div>
    );
  }
}

export default withRouter(FilmsRoomAdd);
