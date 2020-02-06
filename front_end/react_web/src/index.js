import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './styles/tailwind.css';

import Login from './pages/login';
import AddMovie from './pages/addMovie';
import Page404 from './pages/Page404';
import Register from './pages/register';
import Home from './pages/home';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route exact path="/home" component={ Home } />
            <Route path="/add_movie" component={ AddMovie } />
            {/* <Route path="/add_book" component={ AddBook } />
            <Route path="/virtual_library" component={ VirtualLibrary } /> */}
            <Route component={ Page404 } />
        </Switch>
    </Router>,
    document.getElementById('root'));

serviceWorker.unregister();
