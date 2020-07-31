import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  AsyncStorage,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import axios from "axios";

const API = "http://192.168.10.113:5000/film/";

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
    try {
      const idpelicula = await AsyncStorage.getItem("idpelicula");

      axios
        .get(`${API}pelicula?id=${idpelicula}`)
        .then((response) => {
          this.setState({ pelicula: response.data.datos });
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(`${API}raw2?idpelicula=${idpelicula}`)
        .then((response) => {
          this.setState({ sala_peliculas: response.data.datos });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  saveDataSelected = async (idSalaPelicula, idPelicula, idHorario, idSala) => {
    // console.log(
    //   idSalaPelicula + " " + idPelicula + " " + idHorario + " " + idSala
    // );
    try {
      await AsyncStorage.setItem("idSalaPelicula", idSalaPelicula.toString());
      await AsyncStorage.setItem("idPelicula", idPelicula.toString());
      await AsyncStorage.setItem("idHorario", idHorario.toString());
      await AsyncStorage.setItem("idSala", idSala.toString());
    } catch (error) {
      console.error(err);
      this.clearLocalStorage();
    }
  };

  // asyncstorageSave_idsala_peliculas = async (id) => {
  //   console.log(id);
  //   try {
  //     await AsyncStorage.setItem("idsala_peliculas", id.toString());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // asyncstorageSave_idpelicula_titulo = async (item) => {
  //   console.log(item);
  //   try {
  //     await AsyncStorage.setItem("idpelicula_titulo", item.toString());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // asyncstorageSave_idhorario_hora = async (item) => {
  //   console.log(item);
  //   try {
  //     await AsyncStorage.setItem("idhorario_hora", item.toString());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // asyncstorageSave_idsala_nombre = async (item) => {
  //   console.log(item);
  //   try {
  //     await AsyncStorage.setItem("idsala_nombre", item.toString());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
        <View className="">
          <View className="h-24 flex justify-center">
            <Text className="text-center text-white text-4xl font-bold border-b-4 border-white">
              DETALLES PELÍCULA
            </Text>
          </View>

          {/* REVISAR DISEÑO DE DETALLES PELICULA */}
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
                      <Text className="text-white">
                        Categoría: {element.categoria}
                      </Text>
                      <Text className="text-white">
                        Valor de Boleto: {element.valorBoleto}
                      </Text>
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
                            // this.asyncstorageSave_idsala_peliculas(element.id),
                            // this.asyncstorageSave_idpelicula_titulo(
                            //   element.idpelicula
                            // ),
                            // this.asyncstorageSave_idhorario_hora(element.idhorario),
                            // this.asyncstorageSave_idsala_nombre(element.idsala);
                            this.saveDataSelected(
                              element.id,
                              element.idpelicula,
                              element.idhorario,
                              element.idsala
                            );
                        }}
                      />
                      <Text className="font-bold">
                        Horario: {element.idhorario_hora}
                      </Text>
                      <Text className="font-bold">
                        Sala: {element.idsala_nombre}
                      </Text>
                    </View>
                  ))}
                </Card>
              </View>

              <View className="flex">
                <Button
                  title="Volver"
                  onPress={() => {
                    this.clearLocalStorage();
                  }}
                />
                <Button
                  title="Siguiente"
                  onPress={() => {
                    this.props.history.push("buy_tickets");
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

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
