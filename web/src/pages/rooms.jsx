import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactModal from "react-modal";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Swal from "sweetalert2";
import axios from "axios";

ReactModal.setAppElement("#ModalCertificate");
const API = "http://localhost:5000/film/sala";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        nombre: "Nombre de la Sala",
        descripcion: "Descripción",
      },
      salas: [],
      nombre: "",
      descripcion: "",
      test: "",
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
        this.setState({ salas: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveData = (e) => {
    e.preventDefault();
    this.post = {
      datos: {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
      },
    };

    if (this.post.datos.nombre === "" || this.post.datos.descripcion === "") {
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
            window.location.assign("http://localhost:3000/rooms");
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
    window.location.assign("http://localhost:3000/rooms");
  };

  render() {
    const { salas, nombre, descripcion } = this.state;
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
            <p className="mt-5 text-2xl">Salas</p>

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
                    Nueva Sala
                  </p>
                  <button onClick={() => this.handleReactModal()}>
                    <i className="fas fa-times-circle text-4xl text-red-500 hover:text-red-700"></i>
                  </button>
                </div>

                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    placeholder="Ej: Sala 1"
                    name="nombre"
                    value={nombre}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="descripcion"
                  >
                    Descripción
                  </label>
                  <input
                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                    type="text"
                    placeholder="Ej: Para 200 personas"
                    name="descripcion"
                    value={descripcion}
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
                    {this.state.table_header.nombre}
                  </th>
                  <th className="text-left p-3 px-5">
                    {this.state.table_header.descripcion}
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {salas.map((element) => (
                  <tr className="border-b hover:bg-orange-100 bg-gray-100" key={element.id}>
                    <td className="p-2 px-5" >
                      {element.nombre}
                    </td>
                    <td className="p-2 px-5">
                      {element.descripcion}
                    </td>
                    <td className="p-2 px-5">
                      <button
                        className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                        onClick={() => this.deleteData(element.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 flex items-center w-56"
              onClick={() => this.handleReactModal()}
            >
              <i className="fas fa-plus-square mr-2"></i>
              Agregar nueva sala
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Rooms);
