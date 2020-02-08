/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/";

class FilmsRoom extends Component {
    handleOpenModal () { this.setState({ showModal: true }) }      
    handleCloseModal () { this.setState({ showModal: false }) }

    constructor(props) {
        super(props);
        this.state = {
            table_header: {
                sala: 'Nombre de la Sala',
                pelicula: 'Película',
                horario: 'Horario',
            },
            sala_peliculas: [],
            salas: [],
            peliculas: [],
            horarios: [],
            idsala: '',
            idpelicula: '',
            idhorario: '',
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSala = text => {
        this.setState({ idsala: text });
    };

    componentDidMount() {
        axios.get(API+"sala_pelicula")
        .then(response => {
            this.setState({ sala_peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"sala")
        .then(response => {
            this.setState({ salas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"pelicula")
        .then(response => {
            this.setState({ peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"horario")
        .then(response => {
            this.setState({ horarios: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }

    saveData = e => {
        e.preventDefault()
        console.log(this.state.idsala)
        this.post = {
            datos: {
                idsala: this.state.idsala,
                idpelicula: this.state.idpelicula,
                idhorario: this.state.idhorario,
            }
        }

        if (this.post.datos.idsala === "" 
        // ||
        //     this.post.datos.idpelicula === "" ||
        //     this.post.datos.idhorario === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API, this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                alert("Asignación agregada exitosamente")
                window.location.assign("http://localhost:3000/films_room");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };

    deleteData = (value) => {
        axios.delete(`${ API }?id=${ value }`, {
            data: { id: value }
        })
        window.location.assign("http://localhost:3000/films_room");
    }

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
        const { sala_peliculas, salas, peliculas, horarios, idsala, idpelicula, idhorario } = this.state
        return(
            <div>
                <Sidebar />,
                <Header />,
                <div className="ml-64">
                    <hr />
                    <main className="my-8">
                        <div className="justify-center my-5 select-none flex">
                            <p className="mt-5 text-center mr-10 text-2xl">Asignar Películas</p>
                            <button onClick={ this.handleOpenModal } type="button" className="mr-8 shadow-md no-underline font-black text-2xl rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-sm border-blue btn-primary hover:text-white hover:bg-pink-500 focus:outline-none active:shadow-none">
                                <i className="fas fa-plus-square"></i>
                            </button>
                            {/* MODAL */}
                            <ReactModal isOpen={this.state.showModal} contentLabel="onRequestClose Example" onRequestClose={this.handleCloseModal}
                                className="flex-1 text-white text-center pl-48 py  py-0 my-10 mr-40 ml-64">
                                <div className="leading-loose">
                                    <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={ this.saveData }>
                                        <p className="text-gray-800 font-medium">Asignar Películas</p>
                                            <div className="mt-2">
                                                <label className="block text-sm text-gray-600" htmlFor="idsala">Sala</label>
                                                <select className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" 
                                                    name="idsala"
                                                    value={ idsala }
                                                    onChange={ this.changeHandler } 
                                                >
                                                    { salas.map(element => <option key={ element.id } value={ element.id }> {element.nombre} </option>) }
                                                </select>
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-sm text-gray-600" htmlFor="idpelicula">Película</label>
                                                <select className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                                                    name="idpelicula"
                                                    value={ idpelicula }
                                                    onChange={ this.changeHandler } 
                                                >
                                                    { peliculas.map(element => <option key={ element.id } value={ element.id }> {element.titulo} </option>) }
                                                </select>
                                            </div>
                                            <div className="mt-2">
                                                <label className="block text-sm text-gray-600" htmlFor="idhorario">Horario</label>
                                                <select className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                                                    name="idhorario"
                                                    value={ idhorario }
                                                    onChange={ this.changeHandler } 
                                                >
                                                    { horarios.map(element => <option key={ element.id } value={ element.id }> {element.hora} </option>) }
                                                </select>
                                            </div>
                                            <div className="mt-4">
                                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">Guardar</button>
                                            </div>
                                    </form>

                                </div>
                            </ReactModal>       
                            {/* MODAL */}
                        </div>  
                        <div className="px-3 py-4 flex justify-center">
                            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                                <thead className="border-b">
                                    <tr>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.sala }</th>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.pelicula }</th>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.horario }</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b hover:bg-orange-100 bg-gray-100">
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idsala} </p>) }
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idpelicula} </p>) }
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idhorario} </p>) }
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }><button onClick={ this.handleOpenModal } className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button></p> )}
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }><button onClick={ () => this.deleteData(element.id) } className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Eliminar</button></p> )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default FilmsRoom;