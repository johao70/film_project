import React, { Component } from "react";
import { ImageBackground, TextInput, AsyncStorage, Button } from "react-native";
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
      const pelicula = await AsyncStorage.getItem("peliculaTitulo"),
        horario = await AsyncStorage.getItem("horaHorario"),
        sala = await AsyncStorage.getItem("salaNombre"),
        numero_boletos = await AsyncStorage.getItem("numero_boletos");

      this.setState({ pelicula, horario, sala, numero_boletos });
    } catch (err) {
      console.error(err);
    }
  };

  saveData = () => {
    console.log(this.state);

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
      axios
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
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/bg.jpg")}
      >
        <View>
          <View className="h-24 flex justify-center">
            <Text className="text-center text-white text-4xl font-bold border-b-4 border-white">
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

          <View className="py-6 items-center">
            <Button
              title="Enviar Comprobante"
              onPress={() => {
                this.saveData();
              }}
            />
            <Button
              title="Regresar a cartelera"
              onPress={() => {
                AsyncStorage.clear(), this.props.history.push("/");
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
