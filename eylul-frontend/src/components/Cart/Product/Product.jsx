import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import useStyles from './styles';

const Product = ({ product }) => {
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
                <IconButton onClick={() => HandleAddtoCart(product.name,1)} aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
                <Link onClick={() => toDetails()} style={{marginTop: '5px'}}   >View Details </Link>
            </CardActions>
        </Card>
    )
}

export default Product
