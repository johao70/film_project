import React, { Component } from "react";
import {
  ImageBackground,
  ScrollView,
  AsyncStorage,
  Button,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { API_URL } from "./components/web-service";

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
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

  saveDataSelected = async (idSalaPelicula, idPelicula, idHorario, idSala) => {
    try {
      await AsyncStorage.setItem("idSalaPelicula", idSalaPelicula.toString());
      await AsyncStorage.setItem("idPelicula", idPelicula.toString());

      await AsyncStorage.setItem("peliculaTitulo", idHorario.toString());
      await AsyncStorage.setItem("horaHorario", idHorario.toString());
      await AsyncStorage.setItem("salaNombre", idSala.toString());

      //AGREGAR MENSAJE DE CONFIRMACION SEGURO DE ESCOJER ESE HORARIO
      this.props.history.push("/buy_tickets");
    } catch (error) {
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
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/bg.jpg")}
      >
        <View>
          <View className="h-24 flex justify-center">
            <Text className="text-center text-white text-4xl font-bold border-b-4 border-white">
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
                    <View className="flex w-1/2 h-64 py-6 bg-white">
                      <Text>Resumen: {element.resumen}</Text>
                      <Text>Categoría: {element.categoria}</Text>
                      <Text>Valor de Boleto: {element.valorBoleto}</Text>
                    </View>
                    {/* <Card
                      title={element.titulo}
                      image={{ uri: `${element.imagen}` }}
                    >
                      <Text style={{ marginBottom: 10 }}>
                        Resumen: {element.resumen}
                      </Text>
                      <Text style={{ marginBottom: 10 }}>
                        Categoría: {element.categoria}
                      </Text>
                      <Text style={{ marginBottom: 10 }}>
                        Valor de Boleto: {element.valorBoleto}
                      </Text>
                    </Card> */}
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
                        status={
                          checked === element.id ? "checked" : "unchecked"
                        }
                        onPress={() => {
                          this.setState({ checked: element.id }),
                            this.saveDataSelected(
                              element.id,
                              element.idpelicula,
                              element.idhorario,
                              element.idsala
                            );
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
                <Button
                  title="Volver"
                  onPress={() => {
                    this.clearLocalStorage();
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
