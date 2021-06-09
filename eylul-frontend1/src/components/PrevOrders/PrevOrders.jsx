import React from 'react'
import Cookies from 'js-cookie'
import {Card, CardContent, CardActions, Typography, IconButton, Link, CardMedia} from '@material-ui/core';
import {useState, useEffect} from "react";
import { Grid, Paper} from '@material-ui/core';
import Product from './Product/Product';

const PrevOrders = () => {
    const [orderslist, setOrdersList] = useState([]);


    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        
        let token_id = 0;
        let username = 0;

        try {
        token_id = await Cookies.get('token');
        // setToken(token_id);
        } catch (e) {
        console.log(e);
        }

        try {
        // await AsyncStorage.setItem('userToken', userToken);
        username = await Cookies.get('userName');
        // setUsername(username);
        } catch (e) {
        console.log(e);
        }

        const response = await fetch('http://localhost:5000/order', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            user: username,
            token: token_id,

        },

        })
        let json = await response.json();
        //console.log(" orders::!!!", json.orders);
        setOrdersList(json.orders);
        //console.log(" ordersLIISSTTT::!!!", orderslist);
        
    }

    //console.log("orderlist: ", orderslist)
    return (
        <div style={{marginTop:200}} >
            <Grid container spacing={5}>
                    {orderslist.map((product) => (
                        <Grid item key={product.id} xs={12} sm={3} md={5} lg={2} >
                                <Product item={product} />
                        </Grid>
                   ))}
                    </Grid>

        </div>
    );
}

export default PrevOrders;
