import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//component ui 
import Index  from './ui/Home';
import Navbar from './ui/Navbar';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Navbar/>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Index}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
