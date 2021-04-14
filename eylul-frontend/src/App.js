import React from 'react'
import { CssBaseline } from '@material-ui/core';
import { Products , Navbar, Login } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
    return (
        <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Products />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default App
