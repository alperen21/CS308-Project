import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Link} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useHistory } from "react-router-dom"; 
import React, {useState, useEffect} from "react";
import useStyles from './styles';
import Cookies from 'js-cookie'

const Product = ({ item }) => {
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
      console.log("item: ", item)
      }, []);

    const toDetails = async() => {
        history.push({
            pathname: "/prev_details",
            state: {product:item}});
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


      const cancelOrders = async (order_idd) => {
    
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
    
        const response = await fetch('http://localhost:5000/cancelOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            user: username,
            token: token_id,
    
          },
          body: JSON.stringify({
            order_id: order_idd ,
          })
    
        })
        let json = await response.json();
      //console.log(" orders::!!!", json.orders);
        //getOrders();
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
          <IconButton style={{marginLeft:20,marginTop:10}} onClick={() => toDetails()} >View Order Details</IconButton>
         {item.status === 'Preparing' && <IconButton style={{marginLeft:20,marginTop:10}} onClick={() => cancelOrders(item.order_id)}>Cancel Order</IconButton>}
          {/* { item.status == 'Delivered'&&
          <IconButton style={{marginLeft:20,marginTop:10}} onClick={() => toDetails()} >Rate Your Order</IconButton>
    } */}
          
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
