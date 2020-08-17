import React, { Component } from "react";
import { TextInput, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import axios from "axios";
import { API_URL } from "./components/web-service";

export default class SendTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      sala: "",
      pelicula: "",
      horario: "",
      numero_boletos: "",
      sala_pelicula: [],
    };
  }

  handleCorreo = (text) => {
    this.setState({ correo: text });
  };

  componentDidMount() {
    this.loadUserPreferences();
  }

  loadUserPreferences = async () => {
    try {
      const idpelicula = await AsyncStorage.getItem("idPelicula"),
        numero_boletos = await AsyncStorage.getItem("numero_boletos");

      await axios
        .get(`${API_URL}/raw2?idpelicula=${idpelicula}`)
        .then((response) => {
          response.data.datos.forEach((element) => {
            if (element.idpelicula == idpelicula) {
              this.setState({
                sala: element.idsala_nombre,
                pelicula: element.idpelicula_titulo,
                horario: element.idhorario_hora,
                numero_boletos,
              });
            } else {
              alert("false");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  saveData = async () => {
    this.post = {
      datos: {
        correo: this.state.correo,
        sala: this.state.sala,
        pelicula: this.state.pelicula,
        horario: this.state.horario,
        numero_boletos: this.state.numero_boletos,
      },
    };

    if (
      !this.post.datos.correo ||
      !this.post.datos.sala ||
      !this.post.datos.pelicula ||
      !this.post.datos.horario ||
      !this.post.datos.numero_boletos
    ) {
      alert("Algo salio mal, verifica tu correo");
    } else {
      await axios
        .post(`${API_URL}/send_mail`, this.post)
        .then(async (response) => {
          if (await response.data.ok) {
            alert("Correo Enviado!");
            await AsyncStorage.clear();
            this.props.history.push("/");
          } else {
            alert("Algo salio mal intentalo de nuevo");
          }
        })
        .catch((error) => {
          alert("Algo salio mal intentalo de nuevo más tarde");
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View>
        <View className="h-24 flex justify-center">
          <Text className="text-center text-white text-2xl font-bold border-b-4 border-white">
            ENVIAR COMPROBANTE
          </Text>
        </View>

        <Card title="Dirección de Correo Electrónico">
          <TextInput
            placeholder="tucorreo@gmail.com"
            underlineColorAndroid="transparent"
            keyboardType={"default"}
            onChangeText={this.handleCorreo}
          />
        </Card>

        <View className="py-6 items-center flex flex-row justify-center">
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear(), this.props.history.push("/");
            }}
          >
            <Text className="border bg-red-500 p-3 rounded-lg text-white font-bold mx-6">
              Volver a la Cartelera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.saveData();
            }}
          >
            <Text className="border bg-green-500 p-3 rounded-lg text-white font-bold mx-6">
              Enviar Comprobante
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
