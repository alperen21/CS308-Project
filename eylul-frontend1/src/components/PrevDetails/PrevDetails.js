import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import "./product_details.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useState} from "react";
import Cookies from 'js-cookie'
import { Grid, Paper } from '@material-ui/core';
import Renderr from './render/render';

export const PrevDetail = ({product}) => {
  const location = useLocation();
  console.log("prev detailsa geldi mi", location.state.product)
  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
  // alert(location.state.product.status)
  //const { cart_id,order_id,itemlist,order_status,order_time,total_amount,total_price } = product.params;
      return (
      
	  <div  >
        {/* <Image style={{marginLeft:20 , width:65, height: 70, marginTop:10,marginBottom: 0 }}
        source={{
          uri: 'http://cdn.onlinewebfonts.com/svg/img_330183.png'
        }}/> */}
       
    <text style={{marginLeft:20, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}>Your Order Details:</text>
      <Grid container spacing={10}>
      {location.state.product.products.map((product1) => (
          <Grid item key={product1.id} xs={12} sm={3} md={5} lg={2} >
                  <Renderr item={product1} />
        
        <div style={{flexDirection: 'column'}}>
        {location.state.product.status === 'Delivered' &&
        <button style={{marginLeft:10,marginTop:10}}  >Give Rating | Comment</button>
  
        }
        {location.state.product.status === 'Delivered' &&
        <button style={{marginLeft:10,marginTop:10}}  >Return Request</button>
        }
        </div>
          </Grid>
      ))}
     
      </Grid>
     
     
        
      	<div
			style={{
			//borderBottomColor: '#BFA38F',
				borderColor: '#000000bf',
				borderBottomWidth: 5,
				borderEndWidth: 1000,
				}}
		/>
     <div style={{marginLeft:20,marginTop:20}}>
       <div>
     <text style={{marginBottom:20, marginTop:100, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}> Total price: ${location.state.product.total_price}{'\n'}</text>
     </div>
     <div>
      <text style={{marginBottom:20, marginTop:100, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}>Order Date: {location.state.product.time}{'\n'}</text>
      </div>
      <div>
      <text style={{marginBottom:20, marginTop:100, width:150,fontSize: 25, fontWeight: 'bold' ,color:'#000000bf'}}> Payment Type: Credit Card{'\n'}</text>
      </div>
      </div>


         {/* <Button
              title="Show Invoice"
              onPress={() => navigation.navigate('Invoice', {
                cart_id:cart_id,
              })} //navigate
            /> */}
        

    </div>
  );
};

export default PrevDetail;