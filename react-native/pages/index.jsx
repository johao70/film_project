import React, { Component } from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import axios from "axios";
import { API_URL } from "./components/web-service";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    await axios
      .get(`${API_URL}/pelicula?estado=1`)
      .then((response) => {
        this.setState({ peliculas: response.data.datos });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  asyncstorageSave = async (idpelicula) => {
    try {
      await AsyncStorage.setItem("idpelicula", idpelicula.toString());
      this.props.history.push("movie_detail");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { peliculas } = this.state;

    return (
      <View className="items-center">
        <View className="w-56 h-24 flex justify-center">
          <Text
            className="text-center text-white text-2xl font-bold border-b-4 border-white"
            onPress={() => this.getMovies()}
          >
            CARTELERA
          </Text>
        </View>

        <ScrollView vertical={true}>
          <View className="flex flex-row flex-wrap justify-center">
            {peliculas.map((element) => (
              <TouchableOpacity
                key={element.id}
                onPress={() => this.asyncstorageSave(element.id)}
              >
                <View className="w-48 h-64">
                  <Card
                    title={element.titulo}
                    image={{ uri: `${element.imagen}` }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
