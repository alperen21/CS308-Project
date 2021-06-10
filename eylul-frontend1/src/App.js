import React from 'react'
import { CssBaseline } from '@material-ui/core';
import { Invoice,AddProduct,Return,Rate, OrderDetail, PmPage, PrevDetail,PrevOrders, Charts, Products, Navbar1, Login, Register,Espressos, Filter_coffee_products, Espresso_machines,Hot_chocolates,Turkish_coffees, Cart, Product_Detail, Checkout, Profile} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



const App = () => {
    return (
        <Router >
      
        <CssBaseline />
        <Navbar1/>
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
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/orders">
            <PrevOrders />
          </Route>
          <Route exact path="/chart">
            <Charts />
          </Route>
          <Route exact path="/prev_details">
            <PrevDetail />
          </Route>
          <Route exact path="/pm_page">
            <PmPage />
          </Route>
          <Route exact path="/order_details">
            <OrderDetail />
          </Route>
          <Route exact path="/Rate">
            <Rate />
          </Route>
          <Route exact path="/Return">
            <Return />
          </Route>
          <Route exact path="/add_product">
            <AddProduct />
          </Route>
          <Route exact path="/Invoice">
            <Invoice />
          </Route>
        </Switch>
     
    </Router>
    )
}

export default App
