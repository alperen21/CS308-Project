import React from 'react';
import { Grid, Paper} from '@material-ui/core';
import {useState, useEffect} from "react";
import Filter_coffee_product from './Filter_coffee_product/Filter_coffee_product';
import useStyles from './styles';


const Filter_coffee_products = () => {
    const classes=useStyles();
    const [products, setProducts] = useState([]);

    const getProducts= async() =>{
        const response = await fetch('http://localhost:5000/productsOfCategory',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
            },
                body: JSON.stringify({
                    category_name:'Filter Coffee',
                })
            })
            let json=await response.json();
            console.log(json.category_elements);
            setProducts(json.category_elements);
        }

    useEffect(() => {
        getProducts();
    }, [])  

    return(
            <div style={{ padding: 20 }}>
                <Grid container spacing={5}>
                {products.slice(0,12).map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Filter_coffee_product product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );


}
export default Filter_coffee_products;