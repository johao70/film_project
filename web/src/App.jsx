import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./styles/tailwind.css";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Movies from "./pages/movies.jsx";
import AddMovie from "./pages/addMovie.jsx";

// import Page404 from "./pages/Page404";
// import Rooms from "./pages/rooms";
// import FilmsRoom from "./pages/films_room";
// import FilmsRoomAdd from "./pages/films_room_add";
// import Schedules from "./pages/schedules";
// import Report from "./pages/report";
// import UpdateMovie from "./pages/updateMovie";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/movies" component={Movies} />
          <Route path="/add_movie" component={AddMovie} />

          {/* <Route path="/update_movie" component={ UpdateMovie } />
            <Route path="/rooms" component={ Rooms } />
            <Route path="/films_room" component={ FilmsRoom } />
            <Route path="/films_room_add" component={ FilmsRoomAdd } />
            <Route path="/schedules" component={ Schedules } />
            <Route path="/report" component={ Report } />
            <Route component={ Page404 } /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
