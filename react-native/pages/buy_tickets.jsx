import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  TextInput,
  AsyncStorage,
  Button,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import axios from "axios";
import { API_URL } from "./components/web-service";

export default class BuyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: [],
      idPelicula: "",
      idSalaPelicula: "",
      numero_boletos: "",
    };
  }

  handleNumeroBoletos = (text) => {
    this.setState({ numero_boletos: text });
  };

  componentDidMount() {
    this.loadUserPreferences();
  }

  loadUserPreferences = async () => {
    try {
      const idPelicula = await AsyncStorage.getItem("idPelicula");
      const idSalaPelicula = await AsyncStorage.getItem("idSalaPelicula");
      this.setState({ idPelicula, idSalaPelicula });

      await axios
        .get(`${API_URL}/pelicula?id=${this.state.idPelicula}`)
        .then((response) => {
          this.setState({ pelicula: response.data.datos });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  saveData = async () => {
    await AsyncStorage.setItem(
      "numero_boletos",
      this.state.numero_boletos.toString()
    );

    this.post = {
      datos: {
        idsala_peliculas: this.state.idSalaPelicula,
        numero_boletos: this.state.numero_boletos,
      },
    };

    if (this.post.datos.numero_boletos) {
      axios
        .post(`${API_URL}/compra`, this.post)
        .then((response) => {
          if (response.data.ok) {
            alert(
              "Compra exitosa, por favor ingrese su correo electrónico para enviar su comprobante"
            );
            this.props.history.push("/send_tickets");
          } else {
            alert("Algo salio mal intentalo de nuevo más tarde");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Seleccione el número de boletos");
    }
  };

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ idpelicula: "", idsala_peliculas: "" });
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { pelicula } = this.state;

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/bg.jpg")}
      >
        <View>
          <View className="h-24 flex justify-center">
            <Text className="text-center text-white text-4xl font-bold border-b-4 border-white">
              DETALLES DE COMPRA
            </Text>
          </View>

          <ScrollView vertical={true}>
            {pelicula.map((element) => (
              <View key={element.id} className="w-full flex flex-row">
                <View className="flex w-1/2 h-64">
                  <Card
                    title={element.titulo}
                    image={{ uri: `${element.imagen}` }}
                  />
                </View>
                <View className="flex w-1/2 h-64 py-6 bg-white">
                  <Text>Resumen: {element.resumen}</Text>
                  <Text>Categoría: {element.categoria}</Text>
                  <Text>Valor de Boleto: {element.valorBoleto}</Text>
                </View>
              </View>
            ))}

            <Card title="Número de boletos">
              <TextInput
                placeholder="Ingrese el número de boletos que desea"
                underlineColorAndroid="transparent"
                keyboardType={"numeric"}
                onChangeText={this.handleNumeroBoletos}
              />
            </Card>

            <View className="py-6 items-center">
              <Button
                title="Volver a la Cartelera"
                onPress={() => {
                  this.asyncstorageClear();
                }}
              />

              <Button
                title="Continuar"
                onPress={() => {
                  this.saveData();
                }}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
