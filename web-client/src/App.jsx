import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./styles/tailwind.css";

import Header from "./pages/components/header";
import Sidebar from "./pages/components/sidebar";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Billboard from "./pages/billboard.jsx";
import AddMovie from "./pages/add-movie.jsx";
import UpdateMovie from "./pages/update-movie.jsx";
import Rooms from "./pages/rooms.jsx";
import Schedules from "./pages/schedules.jsx";
import FilmsRoom from "./pages/films-room.jsx";
import FilmsRoomAdd from "./pages/films-room-add.jsx";
import Report from "./pages/report.jsx";
import Page404 from "./pages/Page404.jsx";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/billboard">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <Billboard />
            </div>
          </div>
        </Route>
        <Route path="/billboard/add-movie">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <AddMovie />
            </div>
          </div>
        </Route>
        <Route path="/billboard/update-movie">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <UpdateMovie />
            </div>
          </div>
        </Route>
        <Route path="/rooms">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <Rooms />
            </div>
          </div>
        </Route>
        <Route path="/schedules">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <Schedules />
            </div>
          </div>
        </Route>
        <Route path="/films-room">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <FilmsRoom />
            </div>
          </div>
        </Route>
        <Route path="/films-room-add">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <FilmsRoomAdd />
            </div>
          </div>
        </Route>
        <Route path="/report">
          <div>
            <Header />
            <div className="flex">
              <Sidebar />
              <Report />
            </div>
          </div>
        </Route>
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default App;
