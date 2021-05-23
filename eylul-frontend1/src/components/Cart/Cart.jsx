import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {useState, useEffect} from "react";
import useStyles from './styles';
import Product from './Product/Product';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

const Cart = () => {
    const history = useHistory();
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


    const toProducts = async() => {
        history.push("/home");
    }

    var isEmpty= true;
    if(cart.length!==0){
        isEmpty= false;
    }
    

    const EmptyCart = () => (
        <div>
        <Typography variant="subtitle1"> You have no items in the cart, Start adding some!</Typography>
        <Button className={classes.productsButton} size="large" type="button" variant="contained" color="primary" onClick={() => toProducts()} > View Products</Button>
        </div>
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
                        <Button component={Link} to="/checkout" className={classes.emptyButton} size="large" type="button" variant="contained" color="primary"> Checkout</Button>
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
