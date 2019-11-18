import React from 'react';
import './App.css';
import Vehicles from './components/vehicles';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import DetailedVehicle from './components/detailedVehicle';
function App() {
  
  return (
    
    <Router>
    <div>
      <h2>Welcome to Cluno</h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <Link to={'/'} className="nav-link" />
        <Link to={'/detailed'} className="nav-link" />
      </ul>
      </nav>
      <hr />
      <Switch>
          <Route exact path='/' component={Vehicles} />
          <Route exact path='/detailed/:id' component={DetailedVehicle} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
