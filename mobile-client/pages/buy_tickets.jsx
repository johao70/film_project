import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card, Image } from "react-native-elements";
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

      axios
        .get(`${API_URL}/pelicula?id=${this.state.idPelicula}`)
        .then(async (response) => {
          this.setState({ pelicula: await response.data.datos });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  saveData = async () => {
    AsyncStorage.setItem(
      "numero_boletos",
      await this.state.numero_boletos.toString()
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
        .then(async (response) => {
          if (await response.data.ok) {
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
      <View>
        <View className="h-24 flex justify-center">
          <Text className="text-center text-white text-2xl font-bold border-b-4 border-white">
            DETALLES DE COMPRA
          </Text>
        </View>

        <ScrollView vertical={true}>
          {pelicula.map((element) => (
            <View key={element.id} className="w-full flex flex-row">
              <View className="flex w-1/2 h-64">
                <Card>
                  <Card.Title>{element.titulo}</Card.Title>
                  <Card.Divider />
                  <Image
                    source={{ uri: `${element.imagen}` }}
                    style={{ width: 200, height: 150 }}
                  />
                </Card>
              </View>
              <View className="flex w-1/2 py-2 bg-white rounded-lg px-3">
                <Text className="font-bold text-xl">Resumen:</Text>
                <Text className="text-justify">{element.resumen}</Text>
                <Text className="font-bold text-xl">Categoría:</Text>
                <Text>{element.categoria}</Text>
                <Text className="font-bold text-xl">Valor de Boleto:</Text>
                <Text>$ {element.valorBoleto}</Text>
              </View>
            </View>
          ))}

          <Card>
            <Card.Title>Número de boletos</Card.Title>
            <Card.Divider />
            <TextInput
              placeholder="Ingrese el número de boletos que desea"
              underlineColorAndroid="transparent"
              keyboardType={"numeric"}
              onChangeText={this.handleNumeroBoletos}
            />
          </Card>

          <View className="py-6 items-center flex flex-row justify-center">
            <TouchableOpacity
              onPress={() => {
                this.asyncstorageClear();
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
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
