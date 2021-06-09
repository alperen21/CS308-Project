import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import React, {useState, useEffect} from "react";
import useStyles from './styles';
import Cookies from 'js-cookie'


const Product = ({ item }) => {
    const history = useHistory();
    const classes = useStyles();
    let cart_id = item.cart_id;

    useEffect(() => {
      console.log("item: ", item)
      }, []);

    const toDetails = async() => {
        history.push({
        pathname:  "/order_details" ,
        state: {product : item}});
    }
    
    
    return (
      <div  >
      <div style={{ marginTop:0, flexDirection: 'row', marginVertical: 40, paddingHorizontal: 20 }}>
          
          <div>


          </div>
          {/* if (item.status == 'Shipped') */}
          { item.status == 'Delivered'&&
           <CardMedia className ={classes.media} image={'https://static.thenounproject.com/png/581279-200.png'}/>
      }
      {
          item.status == 'Preparing'&&
          <CardMedia className ={classes.media} image={'https://static.thenounproject.com/png/598271-200.png'}/>

      }
      {
          item.status == 'Shipped'&&
          <CardMedia className ={classes.media} image={'https://static.thenounproject.com/png/581278-200.png'}/>
      }
      {
          item.status == 'Cancelled'&&
          <CardMedia className ={classes.media} image={'https://static.thenounproject.com/png/581276-200.png'}/>

      }
      {
          item.status == 'Returned'&&
          <CardMedia className ={classes.media} image={'https://static.thenounproject.com/png/598350-200.png'}/>
      }
          
      </div>
      <br></br>
      <div style={{ fontSize: 18, fontWeight: 'bold' }}>Order Time: {item.time} </div>
          <div style={{ fontSize: 17 }}>Order Status :{item.status} </div>
         
          <div>
          
          <button style={{marginLeft:20,marginTop:10}} onClick={() => toDetails()} >Get More Info</button>
    
          
          </div>
      <div
                      style={{
              //borderBottomColor: '#BFA38F',
              borderColor: '#BFA38F',
                          borderBottomWidth: 2,
                          borderEndWidth: 1000,
                      }}
                  />
      
      </div>
      

    )
}

export default Product
