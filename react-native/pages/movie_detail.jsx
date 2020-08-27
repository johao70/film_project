import React, { Component } from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { API_URL } from "./components/web-service";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      pelicula: [],
      sala_peliculas: [],
    };
  }

  componentDidMount() {
    this.movieDetails();
  }

  movieDetails = async () => {
    const idpelicula = await AsyncStorage.getItem("idpelicula");

    await axios
      .get(`${API_URL}/pelicula?id=${idpelicula}`)
      .then((response) => {
        this.setState({ pelicula: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });

    await axios
      .get(`${API_URL}/raw2?idpelicula=${idpelicula}`)
      .then((response) => {
        this.setState({ sala_peliculas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  saveDataSelected = async (idSalaPelicula, idPelicula) => {
    this.setState({ checked: idSalaPelicula });

    try {
      await AsyncStorage.setItem("idSalaPelicula", idSalaPelicula.toString());
      await AsyncStorage.setItem("idPelicula", idPelicula.toString());

      this.props.history.push("/buy_tickets");
    } catch (err) {
      console.error(err);
      this.clearLocalStorage();
    }
  };

  clearLocalStorage = () => {
    try {
      AsyncStorage.clear();
      this.props.history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { pelicula, sala_peliculas, checked } = this.state;

    return (
      <View>
        <View className="h-24 flex justify-center">
          <Text className="text-center text-white text-2xl font-bold border-b-4 border-white">
            DETALLES PELÍCULA
          </Text>
        </View>

        <ScrollView vertical={true}>
          <View className="flex justify-center">
            <View className="flex flex-row">
              {pelicula.map((element) => (
                <View key={element.id} className="w-full flex flex-row">
                  <View className="flex w-1/2 h-64">
                    <Card
                      title={element.titulo}
                      image={{ uri: `${element.imagen}` }}
                    />
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
            </View>

            <View>
              <Card title="Horarios Disponibles">
                {sala_peliculas.map((element) => (
                  <View
                    key={element.id}
                    className="flex flex-row flex-wrap items-center py-4"
                  >
                    <RadioButton
                      value={element.id}
                      status={checked === element.id ? "checked" : "unchecked"}
                      onPress={() => {
                        this.saveDataSelected(element.id, element.idpelicula);
                      }}
                    />
                    <View className="flex flex-col">
                      <Text className="font-bold">
                        Horario: {element.idhorario_hora}
                      </Text>
                      <Text className="font-bold">
                        Sala: {element.idsala_nombre}
                      </Text>
                    </View>
                  </View>
                ))}
              </Card>
            </View>

            <View className="py-6 items-center">
              <TouchableOpacity
                onPress={() => {
                  this.clearLocalStorage();
                }}
              >
                <Text className="border bg-red-500 p-3 rounded-lg text-white font-bold mx-6">
                  Volver
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
