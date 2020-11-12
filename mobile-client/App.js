import React from "react";
import { NativeRouter, Switch, Route } from "react-router-native";
import { View } from "react-native-tailwind";
import { ImageBackground } from "react-native";

import Index from "./pages/index";
import MovieDetail from "./pages/movie_detail";
import BuyTickets from "./pages/buy_tickets";
import SendTickets from "./pages/send_tickets";

const App = () => {
  return (
    <NativeRouter>
      <View className="mt-6">
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={require("./assets/bg.jpg")}
        >
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/movie_detail" component={MovieDetail} />
            <Route exact path="/buy_tickets" component={BuyTickets} />
            <Route exact path="/send_tickets" component={SendTickets} />
          </Switch>
        </ImageBackground>
      </View>
    </NativeRouter>
  );
};

export default App;
