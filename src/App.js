import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Index  from './components/Home';
import About  from './components/About';
import Navbar from './components/Navbar';


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
