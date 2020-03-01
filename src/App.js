import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index  from './ui/Home';
import About  from './ui/About';
import Navbar from './ui/Navbar';


class App extends React.Component {
  render() {
    return (
        <Router>
          <Navbar/>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
