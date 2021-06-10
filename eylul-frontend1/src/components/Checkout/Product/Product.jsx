import React, { useState, useEffect} from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart, Remove, RemoveShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import { Button } from 'semantic-ui-react';
import useStyles from './styles';
import Cookies from 'js-cookie';

const Product = ({ item }) => {
    const classes=useStyles();
    return (

        <div style={{  marginLeft: 100 }}>
            <div style={{  marginLeft: 200 }}>
                <CardMedia style={{width: 100, height: 200}}
                    image={item.image_path} />
                <div>
                    <div>
                    <text style={{ width: 300, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name} </text>
                    </div>

                    <text style={{ fontSize: 15 }}> Model: {item.model}</text>
                    {/* <text style={{fontSize:18}}> Rating: {item.rating}</text> */}
                    <text > </text>

                    <div style={{ flexDirection: 'row' }}>

                       <text style={{ fontSize: 18, color: '#000000bf' }}> ${item.price} </text>
                    
                       <text style={{ fontSize: 18 , marginLeft: 10}}>x{item.quantity}</text>

                    </div>

                </div>
            </div>
            <div
                style={{
                    //borderBottomColor: '#BFA38F',
                    borderColor: '#BFA38F',
                    borderBottomWidth: 2,
                    borderEndWidth: 1000,
                }}
            />
        </div>
    )

};

export default Product
