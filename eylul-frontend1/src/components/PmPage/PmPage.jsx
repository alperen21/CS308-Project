import React from 'react'
import { Grid, Paper , IconButton} from '@material-ui/core';
import { useState, useEffect } from "react";
import Product from './Product/Product';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie'

const PmPage = () => {

    const [productlist, setProductList] = useState([]);
    

    useEffect(() => {
        getPmView();
      }, []);
    
    const getPmView = async () => {
        
        let token_id = 0;
        let username = 0;
    
        try {
          token_id = await Cookies.get('token');
        } catch(e) {
          console.log(e);
        }
    
        try {
          username = await Cookies.get('userName'); 
        } catch(e) {
          console.log(e);
        }
    
        const response = await fetch('http://localhost:5000/pmview', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            user: username,
            token: token_id,
          }
    
        })
    
        let json = await response.json();
    
        console.log("JSOOOOOONN", json)
    
        setProductList(json.orders);
    
      }
    return (
        <div style={{marginTop:5500}}>
             <Grid container spacing={5}>
                {productlist.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={10} lg={2} >
                    <Product item={product} />
            </Grid>
        ))}
      </Grid>

        </div>
    )
}

export default PmPage
