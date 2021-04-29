import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {useState, useEffect} from "react";
import useStyles from './styles';
import Product from './Product/Product';

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
            console.log(data.products);
            setCart(data.products);
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
                            <Product product={cart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: {cart.cost} </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"> Empty Cart</Button>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary"> Checkout</Button>
                    </div>
            </div>
        </>
    );
    return (
        <Container>
            <div className={classes.toolbar} />
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
            <Typography className={classes.title} align="center" variant="h4">Your shopping cart</Typography>
            <br></br>
            { isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );
};

export default Cart;
