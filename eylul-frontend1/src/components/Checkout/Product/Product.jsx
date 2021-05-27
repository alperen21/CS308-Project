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

        <div>
            <div style={{ flexDirection: 'row' }}>
                <CardMedia 
                    source={{
                        url: item.image_path
                    }} />
                <div>
                    <text style={{ width: 300, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name} </text>
                    <text style={{ fontSize: 15 }}> Model: {item.model}</text>
                    {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
                    <text > </text>

                    <div style={{ flexDirection: 'row' }}>

                        <div style={{}}><text style={{ fontSize: 18, color: '#000000bf' }}> ${item.price} </text></div>
                    
                        <div style={{ marginLeft: 200 , marginRight:50}}><text style={{ fontSize: 18}}>x{item.quantity}</text></div>

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
