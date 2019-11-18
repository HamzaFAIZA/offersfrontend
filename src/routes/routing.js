import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Vehicles from '../components/vehicles';
import notfound from '../components/notFound';
import App from '../App';

const Routing = (
    <Router>
      <div>
        <Route exact="/" component={App} />
        <Route path="/vehicles" component={Vehicles} />
        <Route component={notfound} />
      </div>
    </Router>
  )

export default Routing