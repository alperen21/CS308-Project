import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Filter_coffee_product = ({ product }) => {
    const classes = useStyles();
    return (
        <Card classname={classes.root}>
            <CardMedia className ={classes.media} image={product.image_path} title={product.name}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    {product.discount===0 && <Typography variant="h6">
                        {'$'}
                        {product.price}
                    </Typography>}
                    { product.discount!==0 && 
                    <Typography className={classes.old_price} variant="overline">
                    {'$'}
                    {product.discount!==0 && product.price}
                </Typography> }
                { product.discount!==0 && 
                    <Typography  variant="h6" className={classes.custom}>
                        {'$'}
                        {product.discount!==0 && (product.price)-(product.price*product.discount/100)}
                    </Typography> }
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

export default Filter_coffee_product;
