import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography,IconButton, Link} from '@material-ui/core';
import { AddShoppingCart,LocalOffer } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import useStyles from './styles';
import Cookies from 'js-cookie'
import styles from './styles';


const Product = ({ product, getRequests }) => {
    const history = useHistory();
    const classes = useStyles();

    const AcceptRefund = async (e) => {
      
      let token_id = 0;
      let username = 0;
  
      try {
        token_id = await Cookies.get('token');
      } catch(e) {
        console.log(e);
      }
  
      try {
        username = await Cookies.get('userName'); 
      } catch(e) {
        console.log(e);
      }
  
    const response = await fetch('http://127.0.0.1:5000/refund', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          user: username,
          token: token_id,
        },
        body: JSON.stringify({
          product_name: product.product,
          customer_name: product.customer,
          decision: "accept"
  
        })
  
      })
      let json = await response.json();
      console.log(json);
      getRequests();
      
    }

    const RejectRefund = async (e) => {
      
      let token_id = 0;
      let username = 0;
  
      try {
        token_id = await Cookies.get('token');
      } catch(e) {
        console.log(e);
      }
  
      try {
        username = await Cookies.get('userName'); 
      } catch(e) {
        console.log(e);
      }
  
    const response = await fetch('http://127.0.0.1:5000/refund', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          user: username,
          token: token_id,
        },
        body: JSON.stringify({
          product_name: product.product,
          customer_name: product.customer,
          decision: "reject"
  
        })
  
      })
      let json = await response.json();
      console.log(json);
      getRequests();
    }

    
    
    return (
        <Card classname={classes.root}>
            <CardContent>
                <div className={classes.CardContent}>
                
                <Typography variant="h6" text>{product.customer}</Typography>
                    <Typography variant="body2 color=" gutterBottom>
                        {product.product}
                    </Typography>
        
                   <br></br>
                 
                    <Typography variant="body2 color=" text>Refunding Product Amount: {product.amount}</Typography>
                </div>
                
               
            </CardContent>
            <CardActions disableSpacing classname={classes.cardActions}>
             
                <button onClick={() => AcceptRefund()} > Accept Request</button>
                <IconButton onClick={() => RejectRefund()}>Reject Request</IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
