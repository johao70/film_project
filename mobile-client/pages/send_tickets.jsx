import React, { useState, useEffect } from "react";
import { TextInput, AsyncStorage, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-tailwind";
import { Card } from "react-native-elements";
import { useHistory } from "react-router-native";
import axios from "axios";

import { API_URL } from "./components/web-service";

const SendTickets = () => {
  const [email, SetEmail] = useState(""),
    [room, SetRoom] = useState(""),
    [film, SetFilm] = useState(""),
    [schedule, SetSchedule] = useState(""),
    [tickets_number, SetTicketsNumber] = useState(""),
    [room_film, SetRoomFilm] = useState([]),
    router = useHistory();

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const id_film = await AsyncStorage.getItem("idPelicula"),
        numero_boletos = await AsyncStorage.getItem("numero_boletos");

      SetTicketsNumber(numero_boletos);

      axios
        .get(`${API_URL}/raw2?idpelicula=${id_film}`)
        .then((response) => {
          response.data.datos.forEach((element) => {
            if (element.idpelicula == id_film) {
              SetRoom(element.idsala_nombre);
              SetFilm(element.idpelicula_titulo);
              SetSchedule(element.idhorario_hora);
            } else {
              alert("false");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const sendEmail = () => {
    let data = {
      service_id: "service_t55aeno",
      template_id: "template_8u5xdl7",
      user_id: "user_cPpOrTiUwx4ZKHFw0anIh",
      template_params: {
        correo: email,
        sala: room,
        pelicula: film,
        horario: schedule,
        numero_boletos: tickets_number,
      },
    };

    if (!email || !room || !film || !schedule || !tickets_number) {
      alert("Algo salio mal, verifica tu correo");
    } else {
      axios
        .post("https://api.emailjs.com/api/v1.0/email/send", data)
        .then(async (response) => {
          alert("Correo Enviado!");
          await AsyncStorage.clear();
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
          alert("Algo salio mal intentalo de nuevo más tarde");
        });
    }
  };

  // saveData = () => {
  //   this.post = {
  //     datos: {
  //       correo: this.state.correo,
  //       sala: this.state.sala,
  //       pelicula: this.state.pelicula,
  //       horario: this.state.horario,
  //       numero_boletos: this.state.numero_boletos,
  //     },
  //   };

  //   if (
  //     !this.post.datos.correo ||
  //     !this.post.datos.sala ||
  //     !this.post.datos.pelicula ||
  //     !this.post.datos.horario ||
  //     !this.post.datos.numero_boletos
  //   ) {
  //     alert("Algo salio mal, verifica tu correo");
  //   } else {
  //     axios
  //       .post(`${API_URL}/send_mail`, this.post)
  //       .then(async (response) => {
  //         if (await response.data.ok) {
  //           alert("Correo Enviado!");
  //           await AsyncStorage.clear();
  //           this.props.history.push("/");
  //         } else {
  //           alert("Algo salio mal intentalo de nuevo");
  //         }
  //       })
  //       .catch((error) => {
  //         alert("Algo salio mal intentalo de nuevo más tarde");
  //         console.error(error);
  //       });
  //   }
  // };

  return (
    <View>
      <View className="h-24 flex justify-center">
        <Text className="text-center text-white text-2xl font-bold border-b-4 border-white">
          ENVIAR COMPROBANTE
        </Text>
      </View>

      <Card>
        <Card.Title>Dirección de Correo Electrónico</Card.Title>
        <Card.Divider />
        <TextInput
          placeholder="tucorreo@gmail.com"
          underlineColorAndroid="transparent"
          keyboardType={"default"}
          onChangeText={(value) => SetEmail(value)}
        />
      </Card>

      <View className="py-6 items-center flex flex-row justify-center">
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear(), router.push("/");
          }}
        >
          <Text className="border bg-red-500 p-3 rounded-lg text-white font-bold mx-6">
            Volver a la Cartelera
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sendEmail();
          }}
        >
          <Text className="border bg-green-500 p-3 rounded-lg text-white font-bold mx-6">
            Enviar Comprobante
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendTickets;
