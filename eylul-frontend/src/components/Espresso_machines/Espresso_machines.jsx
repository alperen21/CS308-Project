import React from 'react';
import { Grid, Paper} from '@material-ui/core';
import {useState, useEffect} from "react";
import Espresso_machine from './Espresso_machine/Espresso_machine';
import useStyles from './styles';


const Espresso_machines = () => {
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
                    category_name:'Coffee Machines',
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
            <main className={classes.content}>
                <main className={classes.toolbar}>
                    <Grid container spacing={5}>
                        {products.slice(0,12).map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                                <Espresso_machine product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </main>
        </div>
    );


}
export default Espresso_machines;