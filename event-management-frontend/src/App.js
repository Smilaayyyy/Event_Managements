// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/events" exact component={EventList} />
        <Route path="/events/:id" component={EventDetail} />
      </Switch>
    </Router>
  );
};

export default App;
