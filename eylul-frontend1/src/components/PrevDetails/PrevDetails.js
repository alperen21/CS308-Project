import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import "./product_details.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useState} from "react";
import Cookies from 'js-cookie'
import { Grid, Paper } from '@material-ui/core';

export const PrevDetail = ({product}) => {
  console.log("prev detailsa geldi mi", product)
  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
  //const { cart_id,order_id,itemlist,order_status,order_time,total_amount,total_price } = product.params;
      return (
	  <div  >
        {/* <Image style={{marginLeft:20 , width:65, height: 70, marginTop:10,marginBottom: 0 }}
        source={{
          uri: 'http://cdn.onlinewebfonts.com/svg/img_330183.png'
        }}/> */}
         <text style={{ marginTop: 25, paddingLeft:10,fontSize: 25, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}>   Order Info </text>


      <Grid container spacing={5}>
      {product.products.map((product1) => (
          <Grid item key={product1.id} xs={12} sm={3} md={5} lg={2} >
                  <render item={product1} />
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
         <text style={{ textDecorationLine:'underline',marginTop: 25, paddingLeft:10,fontSize: 18, marginRight: 30,fontWeight: 'bold', color: '#000000bf' }}>  Total Amount paid:  </text><text style={{ fontWeight: '500', paddingLeft:17,fontSize: 18}}> ${product.total_price}</text>
         <text style={{ textDecorationLine:'underline',marginTop: 25, paddingLeft:10,fontSize: 18, marginRight: 30,fontWeight: 'bold', color: '#000000bf' }}>  Order Date: </text><text style={{fontWeight: '500', paddingLeft:17,fontSize: 18}}>{product.time}</text>
         <text style={{ textDecorationLine:'underline',marginTop: 25, paddingLeft:10,fontSize: 18, marginRight: 30,fontWeight: 'bold', color: '#000000bf' }}>  Payment Type: </text><text style={{fontWeight: '500', paddingLeft:17,fontSize: 18}}>Credit card </text>

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