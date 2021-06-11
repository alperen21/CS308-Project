import React from 'react'
import Invoice from '../SmInvoice/Invoice/Invoice';
import { Grid, Paper , IconButton, Card} from '@material-ui/core';
import { useLocation } from "react-router-dom";

const SmInvoice = ({invoice}) => {
    const location = useLocation();
    console.log("invoice ne", location.state.invoice)
    return (
        <div>
            <Grid container spacing={0}>
    {location.state.invoice.map((invoices) => (
      <Grid item key={invoices.id} xs={12} sm={6} md={10} lg={12} >
        <Invoice invoice={invoices} />
      </Grid>
    ))}
  </Grid>
        </div>
    )
}

export default SmInvoice
