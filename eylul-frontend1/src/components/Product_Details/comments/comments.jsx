import React from 'react'
import Cookies from 'js-cookie'
import { IconButton} from '@material-ui/core';

const comments = ( {item, getComments} ) => {
  let userType =  Cookies.get('userType');
    console.log("item",item)

    const approveComment = async () => {
        
      let token_id = 0;
      let username = 0;
  
      try {
        token_id = await Cookies.get('token');
      } catch(e) {
        console.log(e);
      }
  
      try {
        username = await Cookies.get('userName'); 
      } catch(e) {
        console.log(e);
      }
  
      const response = await fetch('http://localhost:5000/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          user: username,
          token: token_id,
        },
        body: JSON.stringify({
          'customer_id': item.customer_id,
          'product_id':item.product_id,
          'decision':true
        })
  
      })
  
      let json = await response.json();
      getComments();
      console.log("JSOOOOOONN", json)
  

  
    }

    const disapproveComment = async () => {
        
      let token_id = 0;
      let username = 0;
  
      try {
        token_id = await Cookies.get('token');
      } catch(e) {
        console.log(e);
      }
  
      try {
        username = await Cookies.get('userName'); 
      } catch(e) {
        console.log(e);
      }
  
      const response = await fetch('http://localhost:5000/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          user: username,
          token: token_id,
        },
        body: JSON.stringify({
          'customer_id': item.customer_id,
          'product_id':item.product_id,
          'decision':false
        })
  
      })
  
      let json = await response.json();
      getComments();
      console.log("JSOOOOOONN", json)
  

  
    }

    return (
        <div>
            <div style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 10 }}>
          

           {(item.approved === true ) &&<div style={{ fontSize: 18, fontWeight: 'bold' }}> {item.username}  <text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}>  {item.time} </text> </div> } 
           {(item.approved === true ) &&  <div><text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}> {item.text} </text></div> } 
           
           

           {(item.approved === false && userType==="product manager") &&<div style={{ fontSize: 18, fontWeight: 'bold' }}> {item.username}  <text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}>  {item.time} </text> </div> } 
           {(item.approved === false && userType==="product manager") &&  <div><text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}> {item.text} </text></div> } 
           {(item.approved === false && userType==="product manager") &&<button onClick={() => approveComment()}> Approve </button>}
           {(item.approved === true && userType==="product manager") &&<button className="btn btn-info" onClick={() => disapproveComment()}> Disapprove </button>}
         </div>
        </div>
    )
}

export default comments
