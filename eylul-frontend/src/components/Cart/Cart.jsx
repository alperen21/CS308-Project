import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {useState, useEffect} from "react";
import useStyles from './styles';

const Cart = () => {
    
    const [cart, setCart] = useState([]);
    const classes=useStyles();

    const getCart= async() =>{
        const response = await fetch('http://localhost:5000/basket',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
            },
            })
            const data=await response.json();
            console.log(data.category_elements);
            setCart(data.category_elements);
            console.log(cart)
        }

    useEffect(() => {
        getCart();
    }, [])

    const isEmpty= typeof cart == 'undefined';

    const EmptyCart = () => (
        <Typography variant="subtitle1"> You have no items in the cart, Start adding some!</Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing = {3}>
                {cart.map((cart) => (
                    <Grid cart xs={12} sm={4} key={cart.name}>
                            <div>{cart.name}</div>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"> Empty Cart</Button>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary"> Cehckout</Button>
                    </div>
            </div>
        </>
    );
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">Your shopping cart</Typography>
            { isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );
};

export default Cart;
