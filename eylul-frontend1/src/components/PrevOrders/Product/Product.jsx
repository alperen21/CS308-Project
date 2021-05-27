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
            pathname: "/product_details",
            state: {product: item}});
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
      <div>
      <div style={{ flexDirection: 'row', marginVertical: 40, paddingHorizontal: 20 }}>
          
          <div>
          
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>Order Time: {item.time} </div>
          <div style={{ fontSize: 17 }}>Order Status :{item.status} </div>
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          {/* <Text style={{ fontSize: 15 }}> Quantity: {item.amount} </Text> */}
          <div>
          <IconButton
              title="View Details"
              //onPress={() => navigation.navigate('PrevOrderDetail', {
              //itemlist:item.products,
              //order_time:item.time,
              //order_status:item.status,

              //})}  //navigate
              />
          
          
              
          </div>


          </div>
          {/* if (item.status == 'Shipped') */}
          { item.status == 'Delivered'&&
          <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
              source={{
              uri: 'https://static.thenounproject.com/png/581279-200.png'
              
              //on the way : https://static.thenounproject.com/png/581278-200.png
              // delivered :https://static.thenounproject.com/png/581279-200.png
              // preparing : https://static.thenounproject.com/png/598271-200.png
              // returned : https://static.thenounproject.com/png/598350-200.png
              // cancelled : https://static.thenounproject.com/png/581276-200.png
              }}/></div>
      }
      {
          item.status == 'Preparing'&&
          <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
              source={{
              uri: 'https://static.thenounproject.com/png/598271-200.png'
              }}/></div>

      }
      {
          item.status == 'Shipped'&&
          <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
              source={{
              uri: 'https://static.thenounproject.com/png/581278-200.png'
              }}/></div>
      }
      {
          item.status == 'Cancelled'&&
          <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
          source={{
          uri: 'https://static.thenounproject.com/png/581276-200.png'
          }}/></div>

      }
      {
          item.status == 'Returned'&&
          <div style={{ flexDirection: 'row', marginLeft:140}}><CardMedia style={{width: 40, height: 40, marginBottom: 10 }}
          source={{
          uri: 'https://static.thenounproject.com/png/598350-200.png'
          }}/></div>

      }
          
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
