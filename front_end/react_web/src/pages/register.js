import React, { Component } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8001/server/film";

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      correo: '',
      clave: '',
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  registerUser = e => {
    e.preventDefault()
    if (this.state.correo === "" || this.state.clave === "") {
      alert("Complete todos los datos para continuar...");
    } else {
      axios.post(API_URL, this.state)
      .then(response => {
        if ( response.data.OK === true ) {
            alert("Usuario registrado correctamente")
            window.location.assign("http://localhost:3000/");
        }
      })
      .catch(error => {
        alert("Datos Incorrectos")
      })
    }
  };

  render() {
    const { correo, clave } = this.state
    return (
      <div className="bg-teal-200 h-screen font-sans">
        <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-1/3">
            <h1 className="font-hairline mb-6 text-center text-2xl">Registrarse!</h1>
            <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={ this.registerUser }>
                <div className="mb-4">
                  <label className="font-bold text-gray-700 block mb-2">Correo Electrónico</label>
                  <input className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  type="text"
                  placeholder="correo@gmail.com"
                  name="correo"
                  value={ correo }
                  onChange={ this.changeHandler } 
                  />
                </div>

                <div className="mb-4">
                  <label className="font-bold text-gray-700 block mb-2">Contraseña</label>
                  <input className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  type="password"
                  placeholder="********"
                  name="clave"
                  value={ clave }
                  minlength="6"
                  onChange={ this.changeHandler } 
                  securetextentry="true"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-teal-600 hover:bg-teal-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded">
                    Registrarse
                  </button>
                  <a href="http://localhost:3000/" className="bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded">
                    Volver
                  </a>
                </div>  
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
