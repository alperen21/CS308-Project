import React from 'react';
import { Grid, Paper} from '@material-ui/core';
import {useState, useEffect} from "react";
import Product from './Product/Product';
import useStyles from './styles';


const Products = () => {
    const classes=useStyles();
    const [products, setProducts] = useState([]);
    

    const getProducts= async() =>{
        const response = await fetch('http://localhost:5000/products',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
            },
                body: JSON.stringify({
                    
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
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
                    <Grid container spacing={5}>
                        {products.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={10} lg={2} >
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
        </div>
    );


}
export default Products;