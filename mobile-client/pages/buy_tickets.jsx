import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card, Image } from "react-native-elements";
import { useHistory } from "react-router-native";
import axios from "axios";

import { API_URL } from "./components/web-service";

const BuyTickets = () => {
  const [film, SetFilm] = useState([]),
    [id_room_film, SetIdRoomFilm] = useState(""),
    [tickets_number, SetTicketsNumber] = useState(""),
    router = useHistory();

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const id_film = await AsyncStorage.getItem("idPelicula"),
        id_room_film = await AsyncStorage.getItem("idSalaPelicula");

      SetIdRoomFilm(id_room_film);

      axios
        .get(`${API_URL}/pelicula?id=${id_film}`)
        .then((response) => {
          SetFilm(response.data.datos);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const saveData = () => {
    AsyncStorage.setItem("numero_boletos", tickets_number.toString());

    let post = {
      datos: {
        idsala_peliculas: id_room_film,
        numero_boletos: tickets_number,
      },
    };

    if (tickets_number) {
      axios
        .post(`${API_URL}/compra`, post)
        .then(async (response) => {
          if (await response.data.ok) {
            alert(
              "Compra exitosa, por favor ingrese su correo electrónico para enviar su comprobante"
            );
            router.push("/send_tickets");
          } else {
            alert("Algo salio mal intentalo de nuevo más tarde");
            asyncstorageClear();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Seleccione el número de boletos");
    }
  };

  const asyncstorageClear = () => {
    try {
      AsyncStorage.clear();
      SetIdRoomFilm("");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <View className="h-24 flex justify-center">
        <Text className="text-center text-white text-2xl font-bold border-b-4 border-white">
          DETALLES DE COMPRA
        </Text>
      </View>

      <ScrollView vertical={true}>
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

        <Card>
          <Card.Title>Número de boletos</Card.Title>
          <Card.Divider />
          <TextInput
            placeholder="Ingrese el número de boletos que desea"
            underlineColorAndroid="transparent"
            keyboardType={"numeric"}
            onChangeText={(value) => SetTicketsNumber(value)}
          />
        </Card>

        <View className="py-6 items-center flex flex-row justify-center">
          <TouchableOpacity
            onPress={() => {
              asyncstorageClear();
            }}
          >
            <Text className="border bg-red-500 p-3 rounded-lg text-white font-bold mx-6">
              Volver a la Cartelera
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              saveData();
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
};

export default BuyTickets;
