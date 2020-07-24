/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactModal from "react-modal";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Swal from "sweetalert2";
import axios from "axios";

ReactModal.setAppElement("#ModalCertificate");
const API = "http://localhost:5000/film/horario";

class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        id: "N°",
        hora: "Horas de Proyección",
      },
      horarios: [],
      hora: "",
      showModal: false,
    };
  }

  handleReactModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(API)
      .then((response) => {
        this.setState({ horarios: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveData = (e) => {
    e.preventDefault();
    this.post = {
      datos: {
        hora: this.state.hora,
      },
    };

    if (this.post.datos.hora === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Complete todos los datos para continuar, por favor.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(API, this.post)
        .then((response) => {
          if (response.data.ok === true) {
            window.location.assign("http://localhost:3000/schedules");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  deleteData = (value) => {
    axios.delete(`${API}/${value}`, {
      data: { id: value },
    });
    window.location.assign("http://localhost:3000/schedules");
  };

  // updateData = () => {
  //     axios.put(API+"?tabla=persona", {
  //         persona_identificacion: this.state.persona_identificacion,
  //         persona_nombre: this.state.persona_nombre,
  //         persona_email: this.state.persona_email,
  //         persona_direccion: this.state.persona_direccion,
  //         persona_telefono: this.state.persona_telefono,
  //         persona_clave: this.state.persona_clave
  //     })
  //     .then(response => {
  //         console.log(response);
  //     })
  //     .catch(error => {
  //         console.log(error);
  //     });
  // }

  render() {
    const { horarios, hora } = this.state;
    return (
      <div className="flex">
        <div className="flex w-1/5 border-r-2 h-screen px-6">
          <Sidebar />
        </div>
        <div className="w-full">
          <div>
            <Header />
          </div>
          <div className="flex flex-col px-12">
            <p className="mt-5 text-2xl">Horarios</p>

            {/* MODAL */}
            <ReactModal
              isOpen={this.state.showModal}
              className="flex justify-center items-center h-screen"
            >
              <form
                className="max-w-xl m-4 p-10 bg-white rounded shadow-xl border-2 border-black"
                onSubmit={this.saveData}
              >
                <div className="flex justify-between w-full items-center py-4 border-b-2">
                  <p className="text-gray-800 font-medium text-center text-2xl">
                    Nuevo Horario
                  </p>
                  <button onClick={() => this.handleReactModal()}>
                    <i className="fas fa-times-circle text-4xl text-red-500 hover:text-red-700"></i>
                  </button>
                </div>

                <div className="mt-2">
                  <label className="block text-sm text-gray-600" htmlFor="hora">
                    Horario
                  </label>
                  <input
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    placeholder="Ej: 10 a 12 horas"
                    name="hora"
                    value={hora}
                    onChange={this.changeHandler}
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
            {/* MODAL */}
          </div>
          <div className="px-3 py-4 flex flex-col justify-center">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 px-5">
                    {this.state.table_header.id}
                  </th>
                  <th className="text-left p-3 px-5">
                    {this.state.table_header.hora}
                  </th>
                  {/* <th></th> */}
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b hover:bg-orange-100 bg-gray-100">
                  <td>
                    {horarios.map((element) => (
                      <p className="p-2 px-5" key={element.id}>
                        {" "}
                        {element.id}{" "}
                      </p>
                    ))}
                  </td>
                  <td>
                    {horarios.map((element) => (
                      <p className="p-2 px-5" key={element.id}>
                        {" "}
                        {element.hora}{" "}
                      </p>
                    ))}
                  </td>
                  {/* <td>
                        { horarios.map(element => <p className="p-2 px-5" key={ element.id }><button onClick={ this.handleOpenModal } className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button></p> )}
                    </td> */}
                  <td>
                    {horarios.map((element) => (
                      <p className="p-2 px-5" key={element.id}>
                        <button
                          className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                          onClick={() => this.deleteData(element.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </p>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 flex items-center w-56"
              onClick={() => this.handleReactModal()}
            >
              <i className="fas fa-plus-square mr-2"></i>
              Agregar nuevo horario
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Schedules);