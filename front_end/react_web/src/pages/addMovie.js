/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:8001/server/library";

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libro_autor: '',
            libro_pais: '',
            libro_año: '',
            libro_titulo: '',
            libro_editorial: '',
            libro_existencias: '',
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    saveData = e => {
        e.preventDefault()
        this.post = {
            tabla: "libro",
            datos: {
                libro_autor: this.state.libro_autor,
                libro_pais: this.state.libro_pais,
                libro_año: this.state.libro_año,
                libro_titulo: this.state.libro_titulo,
                libro_editorial: this.state.libro_editorial,
                libro_existencias: this.state.libro_existencias,
            }
        }

        console.log(JSON.stringify(this.post.datos.estado_libro_id))

        if (this.post.datos.libro_autor === "" ||
            this.post.datos.libro_pais === "" ||
            this.post.datos.libro_año === "" ||
            this.post.datos.libro_titulo === "" ||
            this.post.datos.libro_editorial === "" ||
            this.post.datos.libro_existencias === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API, this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                alert("Agregado exitosamente")
                window.location.assign("http://localhost:3000/add_book");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };


    render() {
        const { 
            libro_autor, 
            libro_pais, 
            libro_año, 
            libro_titulo, 
            libro_editorial, 
            libro_existencias,
        } = this.state
        return(
            <div>
                <Sidebar />,
                <Header />,
                {/* <div className="ml-64">
                    <hr />
                    <main className="my-8">
                        <p className="text-center my-5 text-2xl">Bienvenido a la sección para agregar un nuevo libro a la biblioteca virtual.</p>
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8" onSubmit={ this.saveData }>
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro-titulo">
                                        Titulo
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                                        type="text" 
                                        placeholder="Ej: El Viaje al Centro de la Tierra"
                                        name="libro_titulo"
                                        value={ libro_titulo }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mb-6 ">
                                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro_autor">
                                        Autor
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                                        type="text" 
                                        placeholder="Ej: Joel"
                                        name="libro_autor"
                                        value={ libro_autor }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro_pais">
                                        Pais
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                        type="text" 
                                        placeholder="Ej: Ecuador"
                                        name="libro_pais"
                                        value={ libro_pais }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro_año">
                                        Año
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                        type="text" 
                                        placeholder="Ej: 2020"
                                        name="libro_año"
                                        value={ libro_año }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mb-6 ">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro_editorial">
                                        Editorial
                                    </label>
                                    <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                                        type="text" 
                                        placeholder="Ej: Encarta Interprise"
                                        name="libro_editorial"
                                        value={ libro_editorial }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="libro_existencias">
                                        Existencias
                                    </label>
                                    <input className="appearance-none block w-1/2 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-2" 
                                        type="number"
                                        name="libro_existencias"
                                        min="1"
                                        value={ libro_existencias }
                                        onChange={ this.changeHandler } 
                                    />
                                </div>
                            </div>
                            <p className="text-red text-xs italic">Por favor complete todos los campos.</p>
                            <div className="mt-4">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">Guardar</button>
                            </div>
                        </form>
                    </main>
                </div> */}
            </div>
        )
    }
}

export default AddMovie;