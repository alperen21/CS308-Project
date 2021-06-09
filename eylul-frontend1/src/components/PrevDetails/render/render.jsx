import React from 'react'
import {CardMedia} from '@material-ui/core';


const Renderr = ( {item} ) => {
  console.log(item)
    return (
        <div style={{ flexDirection: 'row', marginVertical: 15}}>
           
        <CardMedia 
          image={item.image_path} />
        <div style={{ flexDirection: 'column'}}>
          <text style={{ width:150,fontSize: 13, fontWeight: 'bold' }}>{item.name} </text>
          <text style={{ fontSize: 15 }}> Model: {item.model}</text>
          <text > </text>
          <text style={{ fontSize: 20 }}> ${item.price} </text>
          <text style={{ fontSize: 18 }}> x{item.amount} </text>
          
          </div>

        
        <div style={{flexDirection: 'column'}}>
        {item.status !== 'Preparing' && item.status !=='Cancelled' && item.status !== 'Shipped' &&
        <button style={{marginLeft:20,marginTop:10}} >Give Rating</button>
  
        }
        {item.status !== 'Preparing' && item.status !=='Cancelled' && item.status !== 'Shipped' &&
        <button style={{marginLeft:20,marginTop:10}} >Return Request</button>
        }

        
        </div>
      </div>
    )
}

export default Renderr;
