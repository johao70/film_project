// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import { View, Text } from "react-native-tailwind";

import Home from "./pages/index";
import MovieDetail from "./pages/movie_detail";
import BuyTickets from "./pages/buy_tickets";
import SendTickets from "./pages/send_tickets";

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View className="mt-6">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movie_detail" component={MovieDetail} />
            <Route exact path="/buy_tickets" component={BuyTickets} />
            <Route exact path="/send_tickets" component={SendTickets} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
