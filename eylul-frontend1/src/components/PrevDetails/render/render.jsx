import React from 'react'
import {CardMedia} from '@material-ui/core';

const render = ( {item} ) => {
    return (
        <div style={{ flexDirection: 'row', marginVertical: 15}}>
        <CardMedia style={styles.image}
          source={{
            uri: item.image_path
          }} />
        <div style={{ flexDirection: 'column'}}>
          <text style={{ width:150,fontSize: 13, fontWeight: 'bold' }}>{item.name} </text>
          <text style={{ fontSize: 15 }}> Model: {item.model}</text>
          <text > </text>
          <text style={{ fontSize: 20 }}> ${item.price} </text>
          <text style={{ fontSize: 18 }}> x{item.amount} </text>
          
          </div>

        
        <div style={{flexDirection: 'column'}}>
        {order_status !== 'Preparing' && order_status !=='Cancelled' && order_status !== 'Shipped' &&
        <button
              title="Rate-Comment"
              onPress={() => navigation.navigate('RateComment', {
                itemName: item.name,
                itemImage:item.image_path
              })} //navigate
            />
        }
        {order_status !== 'Preparing' && order_status !=='Cancelled' && order_status !== 'Shipped' &&
        <button
              title="Return"
              onPress={() => navigation.navigate('Return', {
                itemName: item.name,
                itemImage:item.image_path,
                cart_id:cart_id,
                amount_purchased:item.amount
              })} //navigate
            />
        }

        
        </div>
      </div>
    )
}

export default render
