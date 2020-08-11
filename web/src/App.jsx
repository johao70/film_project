import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./styles/tailwind.css";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Movies from "./pages/movies.jsx";
import AddMovie from "./pages/addMovie.jsx";
import UpdateMovie from "./pages/updateMovie.jsx";
import Rooms from "./pages/rooms.jsx";
import Schedules from "./pages/schedules.jsx";
import FilmsRoom from "./pages/films_room.jsx";
import FilmsRoomAdd from "./pages/films_room_add.jsx";
import Report from "./pages/report.jsx";
import Page404 from "./pages/Page404.jsx";

import Test from "./pages/asd.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/movies" component={Movies} />
          <Route path="/add_movie" component={AddMovie} />
          <Route path="/update_movie" component={UpdateMovie} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/schedules" component={Schedules} />
          <Route path="/films_room" component={FilmsRoom} />
          <Route path="/films_room_add" component={FilmsRoomAdd} />
          <Route path="/report" component={Report} />
          <Route path="/prueba" component={Test} />
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
