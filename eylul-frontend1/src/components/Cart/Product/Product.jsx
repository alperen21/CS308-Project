import React, { useState, useEffect} from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart, Remove, RemoveShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import { Button } from 'semantic-ui-react';
import useStyles from './styles';
import Cookies from 'js-cookie';


const Product = ({ product, getCart }) => {
    const [totalprice, setTotalprice] = React.useState(0);
    const [cart, setCart] = useState([]);
    var total_price = 0;
    // setQuantity(item.quantity);
    total_price = total_price + product.quantity * product.price;
    const history = useHistory();
    const classes = useStyles();

    const toDetails = async() => {
        history.push({
            pathname: "/product_details",
            state: {product: product}});
    }

    const HandleAddtoCart= async(name, quantity) =>{
        const response = await fetch('http://localhost:5000/basket',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
            },
                body: JSON.stringify({
                    product_name: name,
                    quantity: quantity,
                })
            })
            let json=await response.json();
            console.log(json.category_elements);
        }
        const changeQuantity = async (item_name, item_quantity) => {


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
    
            if (item_quantity >= 1) {
                //do nothing
            } else {
                item_quantity = 1;
            }
    
            const response4 = await fetch('http://localhost:5000/basket', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    user: username,
                    token: token_id,
                },
                body: JSON.stringify({
                    product_name: item_name,
                    quantity: item_quantity,
    
                })
            })
    
            let json = await response4.json();
            //console.log("basket products after quantity change!!", json);
    
            getCart();
    
        }

        /*const getCart= async() =>{

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
    
            console.log("cart screen- TOKEN id that we sent to backend::!!!", token_id);
            console.log("cart screen- USERNAME that we sent to backend::!!!", username);
    
            const response = await fetch('http://localhost:5000/basket',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:"application/json",
                    "user": username,
                    "token": token_id,
                },
                })
            let json = await response.json();
            console.log("basket products::!!!", json);
    
            setCart(json.products);
            totalcalculate(json.products);
            }*/
        function totalcalculate(products) {
            let total = 0;
            for (const product of products) {
                total += product.price * product.quantity;
            }
            setTotalprice(total);
        }
    
        const toProducts = async() => {
            history.push("/home");
        }
    
        var isEmpty= true;
        if(product.length!==0){
            isEmpty= false;
        }
        const deleteBasket = async (item_name) => {


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
    
            const response3 = await fetch('http://localhost:5000/basket', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    user: username,
                    token: token_id,
                },
                body: JSON.stringify({
    
                    product_name: item_name,
    
                })
            })
    
            let json = await response3.json();
            console.log("basket products after delete!!", json);
    
            getCart();
    
        }

    return (
        <Card classname={classes.root}>
            <IconButton onClick={() =>deleteBasket(product.name)} aria-label="Add to Cart">
                <Remove />
            </IconButton>
            <CardMedia className ={classes.media} image={product.image_path} title={product.name}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h6" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        {'$'}
                        {product.price}
                    </Typography>
                </div>
                
                <Typography variant="body2 color=" text>quantity: {product.quantity}</Typography>
                <IconButton onClick={() =>changeQuantity(product.name, product.quantity - 1)} aria-label="Add to Cart">
                    <RemoveShoppingCart />
                </IconButton>
                <IconButton onClick={() =>changeQuantity(product.name, product.quantity + 1)} aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardContent>
            <CardActions disableSpacing classname={classes.cardActions}>
                
                <Link onClick={() => toDetails()} style={{marginTop: '5px'}}   >View Details </Link>
            </CardActions>
        </Card>
    )
}

export default Product
