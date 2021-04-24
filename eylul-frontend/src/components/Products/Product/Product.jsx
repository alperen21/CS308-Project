import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import useStyles from './styles';

const Product = ({ product }) => {
    const history = useHistory();
    const classes = useStyles();

    
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
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
