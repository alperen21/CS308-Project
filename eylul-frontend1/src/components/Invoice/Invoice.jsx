import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import { useEffect } from "react";
import {useState} from "react";
import Cookies from 'js-cookie'
import { Grid, Paper } from '@material-ui/core';
import { useLocation } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";



export const Invoice = ({invoice}) => {
 
  const location = useLocation();


  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
 
  
  //const { cart_id,order_id,itemlist,order_status,order_time,total_amount,total_price } = product.params;
      return (
        <div>
	  <div>
      <embed src={`data:application/pdf;base64,${location.state.invoice}`} style={{width:700, height:700}} type="application/pdf" width="100%"></embed>
    </div>
    </div>
  );
};

export default Invoice;