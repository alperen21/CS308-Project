import React from 'react'
import { CssBaseline } from '@material-ui/core';
import { Products , Navbar, Login, Register,Espressos, Filter_coffee_products, Espresso_machines,Hot_chocolates,Turkish_coffees, Cart, Product_Detail} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {
    return (
        <Router>
      
        <CssBaseline />
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Products />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/filter_coffees">
            <Filter_coffee_products />
          </Route>
          <Route exact path="/espresso_machines">
            <Espresso_machines />
          </Route>
          <Route exact path="/espressos">
            <Espressos />
          </Route>
          <Route exact path="/hot_chocolates">
            <Hot_chocolates />
          </Route>
          <Route exact path="/turkish_coffees">
            <Turkish_coffees />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/product_details">
            <Product_Detail />
          </Route>
        </Switch>
     
    </Router>
    )
}

export default App
