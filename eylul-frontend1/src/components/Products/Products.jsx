import React from 'react';
import { Grid, Paper , IconButton} from '@material-ui/core';
import { useState, useEffect } from "react";
import Product from './Product/Product';
import useStyles from './styles';
import { Search } from '@material-ui/icons';


const Products = () => {

  const classes = useStyles();

  const [productlist, setProductList] = useState([]);


  const [lowest_price_FilterNumber, lowest_price_setFilterNumber] = useState();
  const [lowest_rating_FilterNumber, lowest_rating_setFilterNumber] = useState();
  const [highest_price_FilterNumber, highest_price_setFilterNumber] = useState();
  const [highest_rating_FilterNumber, highest_rating_setFilterNumber] = useState();

  const [searchQuery, setSearchQuery] = React.useState('');




  const SortProducts = async (option, sort) => {
    // console.log("sorrtt hereee", option,sort)
    const response = await fetch('http://localhost:5000/orderBy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'criteria': option,
        'orderType': sort,
      })

    })
    let json = await response.json();
    console.log("sorrtt hereee", json);
    setProductList(json.product);
  }


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {

    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        "lowest_price": lowest_price_FilterNumber,
        "highest_price": highest_price_FilterNumber,
        "lowest_rating": lowest_rating_FilterNumber,
        "highest_rating": highest_rating_FilterNumber
      })

    })

    let json = await response.json();

    console.log("JSOOOOOONN", json)

    setProductList(json.category_elements);

  }


  const findProducts = async () => {

    // console.log("we are in get products:", productlist);

    const response = await fetch('http://localhost:5000/findProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        productName: searchQuery
      })

    })
    let json = await response.json();
    // console.log("code: ", json.status_code);
    if (json.status_code == 200) {
      setProductList(json.items);
      // console.log("we are in get products, data must come here!!:", productlist);
    }
    else {
      alert('Item does not exist')
      //missing field
    }
  }


  return (
    <div style={{ padding: 20 }}>
      <div className={classes.toolbar} />
      {/* <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.toolbar} /> */}


      {/* //-------------filter-------------------- */}
      <div  style={{marginTop: 800 }}>

      <form style={{marginLeft: 400, maxWidth: 400, marginBottom: 30, flexDirection: "row" }} >

        <h3 style={{ flexDirection: "column"}} >Filter Products</h3>

        <input style={{marginLeft:35, marginTop: '1px', width: 180  }} min={0} type="number" placeholder="Enter lowest price" value={lowest_price_FilterNumber}
          onChange={(e) => {
            console.log("CHECK OUT1", e.target.value);
            if (e.target.value === undefined || e.target.value  < 0) { lowest_price_setFilterNumber(0); }
            else { lowest_price_setFilterNumber(e.target.value) }
          }} />

        <input style={{marginLeft:35, marginTop: '1px' , width: 180  }} min={0}  type="number" placeholder="Enter highest price" value={highest_price_FilterNumber}
          onChange={(e) => {
            console.log("CHECK OUT2", e.target.value);
            if (e.target.value === undefined || e.target.value  < 0) { highest_price_setFilterNumber(9999999); }
            else { highest_price_setFilterNumber(e.target.value) }
          }} />

        <input style={{marginLeft:35, marginTop: '1px', width: 180   }} min={0} type="number" placeholder="Enter lowest rating" value={lowest_rating_FilterNumber}
          onChange={(e) => {
            console.log("CHECK OUT3", e.target.value);
            if (e.target.value === undefined || e.target.value  < 0) {  lowest_rating_setFilterNumber(0); }
            else { lowest_rating_setFilterNumber(e.target.value) }
          }} />

        <input style={{marginLeft:35, marginTop: '1px' , width: 180  }} min={0} type="number" placeholder="Enter highest rating" value={highest_rating_FilterNumber}
          onChange={(e) => {
            console.log("CHECK OUT4", e.target.value);
            if (e.target.value === undefined || e.target.value  < 0) {  highest_rating_setFilterNumber(5); }
            else { highest_rating_setFilterNumber(e.target.value) }
          }} />


        <button style={{ marginLeft: 30, marginTop: '2px', width: 200 }} onClick={(e) => {  e.preventDefault(); getProducts();}}>Filter</button>

      </form>


      <form style={{ marginRight:40, marginBottom: 30, flexDirection: "row"  }} >

        <h3>Sort Products  </h3>

        <button style={{marginLeft:35, marginTop: '2px', maxWidth:150 }} onClick={(e) => {e.preventDefault(); SortProducts('price','ASC')} }>Price Lowest-Highest</button>

        <button style={{marginLeft:35, marginTop: '2px', maxWidth:150 }} onClick={(e) =>{e.preventDefault();  SortProducts('price','DESC')} }>Price Highest-Lowest</button>

        <button style={{marginLeft:35, marginTop: '2px', maxWidth:150 }} onClick={(e) =>{e.preventDefault();  SortProducts('rating','DESC') }}>Rating Highest-Lowest</button>

        <button style={{marginLeft:35, marginTop: '2px', maxWidth:150 }} onClick={(e) => {e.preventDefault(); SortProducts('rating','ASC')} }>Rating Lowest-Highest</button>


        <input style={{marginLeft:180, marginTop: '1px' , width: 130  }} type="text" placeholder="Search" value={searchQuery}
          onChange={(e) => {
            console.log("CHECK OUT4", e.target.value);
            if (e.target.value === undefined) { setSearchQuery(""); }
            else {  setSearchQuery(e.target.value); }
          }} />

    
        <IconButton onClick={(e) => {e.preventDefault(); findProducts() } } aria-label="Add to Cart">
                    <Search />
        </IconButton>

       

      </form>

      


      </div>


      {/* //--------------------------------- */}


      <Grid container spacing={5}>
        {productlist.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={10} lg={2} >
            <Product product={product} />
          </Grid>
        ))}
      </Grid>


    </div>
  );


}
export default Products;