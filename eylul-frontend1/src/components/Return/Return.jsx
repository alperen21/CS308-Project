import React from 'react'
import Cookies from 'js-cookie'
import {Card, CardContent, CardActions, Typography, IconButton, Link, CardMedia,MenuItem} from '@material-ui/core';
import {useState, useEffect} from "react";
import { Grid, Paper} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
export const Return = ({product,cart}) => {

    const location = useLocation();
    console.log("RATEEEEE  geldi mi", location.state.product)
    console.log("RATEEEEE  geldi mi", location.state.cart)
        const [data, setData] = React.useState({
            amount: 1,
          });
        
          // useEffect(() => {
          //   giveComment();
          // }, []);
          

        //   const amount_Change = (val) => {
        //     if( val.length === 0 ) {
        //       setData({
        //         ...data,
        //         username: false,
        //     });
        //   } else {
        //     setData({
        //       ...data,
        //       amount: val,
        
        //   }); 
        //   }
        // }


        const CreateReturn = async (amounttt) => {
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
          
        
            const response = await fetch('http://localhost:5000/refund', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                user: username,
                token: token_id,
        
              },
              body: JSON.stringify({
                amount:amounttt,
                product_name: location.state.product.name,
                cart_id:location.state.cart
              })
        
            })
             let json = await response.json();
          //  console.log(" comment json::!!!", json);
        
          console.log(" STATAUUSUSS HEREEEE json::!!!", json.status_code);
           if (json.message === 'ok') {
            alert("Your refund request is received!")
          } 
        //   else if(json.status_code === 403 &&  json.message=== "we can't refund you more than you originally ordered")
        //   {
        //     alert("We can't refund you more than you originally ordered!")
        //   }
          else {
            alert("You already placed a return request for this product!")
          }
        
          }
        
        
        
    var amount_purchased = location.state.product.amount ;
    return (
        <div>
            
            <text style={{marginLeft:0, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}> Refund request for : </text>
            <text style={{marginLeft:0, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}>{location.state.product.name}</text>
            <CardMedia style={{width: 100, height: 200}}
             image={location.state.product.image_path} />
             <text style={{marginLeft:0, width:150,fontSize: 18, fontWeight: 'bold' ,color:'#000000bf'}}>Model:{location.state.product.model}</text>
              <div >
            <input type= "number"
            style={{width:100}}
                      value={data.amount}
                      min={1}
                        placeholder="Enter Amount you want to return "
                        placeholderTextColor='#000000bf'
                        onChange={(val) => {  {setData({
                                  ...data,
                                  amount: val.target.value*1,
                               }); }}}          
            />
            
        </div>
        <div>
            {console.log("AMOUNTTT",data.amount)}
        <button style={{marginLeft:10,marginTop:10}} onClick={() => { if (data.amount > amount_purchased){alert('Enter a valid amount to return!')} else {CreateReturn(data.amount)}}}>Send</button>
        </div> 
                
        </div>
       
    )

};

export default Return
