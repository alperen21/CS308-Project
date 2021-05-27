import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import useStyles from './styles';
import Cookies from 'js-cookie'

const Product = ({ product }) => {
    const history = useHistory();
    const classes = useStyles();

    const toDetails = async() => {
        history.push({
            pathname: "/product_details",
            state: {product: product}});
    }
    const HandleAddtoCart = async (name) => {

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
    
        // console.log("home screen- TOKEN id that we sent to backend::!!!", token_id);
        // console.log("home screen- USERNAME that we sent to backend::!!!", username);
    
    
        const response2 = await fetch('http://localhost:5000/basket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            user: username,
            token: token_id,
          },
          body: JSON.stringify({
            //category_name:'Coffee Machines'
            product_name: name,
            quantity: 1
    
          })
    
        })
    
        // console.log("username2 geldi mi?????", username); //GELMEDİ KONTROL ET!!!!!!!!!!!!!!!!!
        let json = await response2.json();
    
    
        if(json.status_code === 200){
          alert("Your cart is updated")
     
        }
        else{
          alert("Try again!")
        }
        //console.log("mesajımız: ", json.message)
        //console.log("code: ", json.status_code)
        //setBasket(json.category_elements);  
      }
    
    return (
        <Card classname={classes.root}>
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
                <Typography variant="body2 color=" text>{product.model}</Typography>
            </CardContent>
            <CardActions disableSpacing classname={classes.cardActions}>
             
                <IconButton onClick={() => { { product.stock !== 0 ? HandleAddtoCart(product.name,1): (alert("Item is out of stock!")) }}} aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
                <Link onClick={() => toDetails()} style={{marginTop: '5px'}}   >View Details </Link>
            </CardActions>
        </Card>
    )
}

export default Product
