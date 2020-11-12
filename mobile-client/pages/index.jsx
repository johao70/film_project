import React, { useState, useEffect } from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card, Image } from "react-native-elements";
import { useHistory } from "react-router-native";
import axios from "axios";

import { API_URL } from "./components/web-service";

const Index = () => {
  const [movies, SetMovies] = useState([]),
    router = useHistory();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    axios
      .get(`${API_URL}/pelicula?estado=1`)
      .then((response) => {
        SetMovies(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const asyncstorageSave = (idpelicula) => {
    try {
      AsyncStorage.setItem("idpelicula", idpelicula.toString());
      router.push("movie_detail");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="items-center">
      <View className="w-56 h-24 flex justify-center">
        <Text
          className="text-center text-white text-2xl font-bold border-b-4 border-white"
          onPress={() => getMovies()}
        >
          CARTELERA
        </Text>
      </View>

      <ScrollView vertical={true}>
        <View className="flex flex-row flex-wrap justify-center">
          {movies.map((element) => (
            <TouchableOpacity
              key={element.id}
              onPress={() => asyncstorageSave(element.id)}
            >
              <View className="w-48 h-64">
                <Card>
                  <Card.Title>{element.titulo}</Card.Title>
                  <Card.Divider />
                  <Image
                    source={{ uri: `${element.imagen}` }}
                    style={{ width: 200, height: 200 }}
                  />
                </Card>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
