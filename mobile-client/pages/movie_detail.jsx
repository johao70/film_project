import React, { useState, useEffect } from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card, Image } from "react-native-elements";
import { useHistory } from "react-router-native";
import RadioForm from "react-native-simple-radio-button";
import axios from "axios";

import { API_URL } from "./components/web-service";

const MovieDetail = () => {
  const [checked, SetChecked] = useState(false),
    [film, SetFilm] = useState([]),
    [film_rooms, SetFilmRooms] = useState([]),
    router = useHistory();

  useEffect(() => {
    movieDetails();
  }, []);

  const movieDetails = async () => {
    const idpelicula = await AsyncStorage.getItem("idpelicula");

    axios
      .get(`${API_URL}/pelicula?id=${idpelicula}`)
      .then((response) => {
        SetFilm(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_URL}/raw2?idpelicula=${idpelicula}`)
      .then((response) => {
        SetFilmRooms(response.data.datos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveDataSelected = (idSalaPelicula, idPelicula) => {
    SetChecked(idSalaPelicula);

    try {
      AsyncStorage.setItem("idSalaPelicula", idSalaPelicula.toString());
      AsyncStorage.setItem("idPelicula", idPelicula.toString());

      router.push("/buy_tickets");
    } catch (err) {
      console.error(err);
      clearLocalStorage();
    }
  };

  clearLocalStorage = () => {
    try {
      AsyncStorage.clear();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

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
            {film.map((element) => (
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
          </View>

          <View>
            <Card>
              <Card.Title>Horarios Disponibles</Card.Title>
              <Card.Divider />
              {film_rooms.map((element) => (
                <View
                  key={element.id}
                  className="flex flex-row flex-wrap items-center py-4"
                >
                  <RadioForm
                    radio_props={[{ value: element.id }]}
                    onPress={() => {
                      saveDataSelected(element.id, element.idpelicula);
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
                clearLocalStorage();
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
};

export default MovieDetail;
