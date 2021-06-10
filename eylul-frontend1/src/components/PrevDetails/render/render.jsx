import React from 'react'
import {CardMedia} from '@material-ui/core';


const Renderr = ( {item} ) => {
  //console.log(item)
 // alert(item.status)
    return (
      <div>
        
        <div style={{ flexDirection: 'row', marginVertical: 15,paddingVertical:50,marginLeft:50}}>
        <CardMedia style={{width: 100, height: 200}}
          image={item.image_path} />
        <div style={{ flexDirection: 'column'}}>
          <text style={{ width:200,fontSize: 15, fontWeight: 'bold' }}>{item.name} </text>
          <div><text style={{ fontSize: 13 }}> Model: {item.model}</text></div>
          <text > </text>
          <text style={{ fontSize: 20 }}> ${item.price} </text>
          <text style={{ fontSize: 15 }}>   x{item.amount} </text>
          
          </div>

       
        
      </div>
      </div>
    )

}

export default Renderr;
