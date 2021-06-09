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
  //const { cart_id,order_id,itemlist,order_status,order_time,total_amount,total_price } = product.params;
      return (
	  <div  >
        {/* <Image style={{marginLeft:20 , width:65, height: 70, marginTop:10,marginBottom: 0 }}
        source={{
          uri: 'http://cdn.onlinewebfonts.com/svg/img_330183.png'
        }}/> */}
    

      <Grid container spacing={5}>
      {location.state.product.products.map((product1) => (
          <Grid item key={product1.id} xs={12} sm={3} md={5} lg={2} >
                  <Renderr item={product1} />
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