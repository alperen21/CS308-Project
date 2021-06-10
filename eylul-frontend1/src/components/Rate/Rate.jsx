import React from 'react'
import Cookies from 'js-cookie'
import {Card, CardContent, CardActions, Typography, IconButton, Link, CardMedia,MenuItem} from '@material-ui/core';
import {useState, useEffect} from "react";
import { Grid, Paper} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
export const Rate = ({product}) => {

    const location = useLocation();
    console.log("RATEEEEE  geldi mi", location.state.product)
        const [data, setData] = React.useState({
            comment: 0,
            rate:0,
          });
        
          // useEffect(() => {
          //   giveComment();
          // }, []);
          

          const comment_Change = (val) => {
            if( val.length === 0 ) {
              setData({
                ...data,
                username: false,
            });
          } else {
            setData({
              ...data,
              comment: val,
        
          }); 
          }
        }
          let json =0;
          let json2 = 0;
        
          const giveComment = async (user_comment) => {
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
        
            const response = await fetch('http://localhost:5000/comment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                user: username,
                token: token_id,
        
              },
              body: JSON.stringify({
                comment: user_comment,
                product_name:location.state.product.name ,
              })
        
            })
             json = await response.json();
          //  console.log(" comment json::!!!", json);
        
        
           if (json.status_code === 200) {
            alert("Your comment is sent for approval!")
          } else {
            alert("You already gave review for this product!")
          }
        
          }

          const giveRating = async (user_rating) => {

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
          
            const response = await fetch('http://localhost:5000/rate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                user: username,
                token: token_id,
              },
              body: JSON.stringify({
                rate: user_rating,
                product_name: location.state.product.name,
              })
          
            })
             json2 = await response.json();
             console.log(" json- rating,??::!!!", json2);
          
            if (json2.status_code === 200) {
              alert("Your rating is received!")
            } else {
              alert("You already rated for this product!")
            } 
          
          }
        
          
    return (
        <div>
            
            <text style={{marginLeft:0, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}> Give Comment for : </text>
            <text style={{marginLeft:0, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}>{location.state.product.name}</text>
            <CardMedia style={{width: 100, height: 200}}
             image={location.state.product.image_path} />
             <text style={{marginLeft:0, width:150,fontSize: 18, fontWeight: 'bold' ,color:'#000000bf'}}>Model:{location.state.product.model}</text>
              <div >
            <input 
                        placeholder="Enter Comment "
                        placeholderTextColor='#000000bf'
                        onChange={(val) => comment_Change(val.target.value)}          
            />
        </div>
        <div>
        <button style={{marginLeft:10,marginTop:10}} onClick={() => giveComment(data.comment)}>Send</button>
        </div> 
        <div>
        <text style={{marginLeft:0, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}> Give Rating for : </text>
        </div>
                
                <Select labelId="label" id="select">
                            <MenuItem  onClick={() => {setData({...data,rate: 1,}); }} >1</MenuItem>
                            <MenuItem onClick={() => {setData({...data,rate: 2,}); }}  >2</MenuItem>
                            <MenuItem onClick={() => {setData({...data,rate: 3,}); }} >3</MenuItem>
                            <MenuItem onClick={() => {setData({...data,rate: 4,}); }} >4</MenuItem>
                            <MenuItem onClick={() => {setData({...data,rate: 5,}); }} >5</MenuItem>
                            </Select>
                            {console.log("RATEE NE", data.rate)}
        <button style={{marginLeft:10,marginTop:10}} onClick={() => giveRating(data.rate)}>Send</button>
        </div>
       
    )

};

export default Rate
