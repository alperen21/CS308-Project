import React from 'react'
import {useState, useEffect} from "react";
import Cookies from 'js-cookie'
import {Card, CardContent, CardActions, IconButton, Link, CardMedia} from '@material-ui/core';
import { Icon } from 'semantic-ui-react';
import Product from './Product/Product';
import { Container, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import { Button } from 'semantic-ui-react';
import { useHistory } from "react-router-dom"; 

const Checkout = (route) => {
    const history = useHistory();
    const classes=useStyles();

    

  const [basketlist, setBasketList] = useState([]);

  const getBasket = async () => {

		let token_id = 0;
		let username = 0;

		try {
			token_id = await Cookies.get('token');
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

		// console.log("checkout screen- TOKEN id that we sent to backend::!!!", token_id);
		// console.log("checkout screen- USERNAME that we sent to backend::!!!", username);

		const response2 = await fetch('http://localhost:5000/basket', {
			method: 'GET',
			headers: {
				//'Authorization': 'Bearer ' + token_id,
				'Content-Type': 'application/json',
				"Accept": 'application/json',
				"user": username,
				"token": token_id,
        
			},
		})

		let json = await response2.json();
		// console.log("basket products::!!!", json);

		setBasketList(json.products);
	}
    const [data, setData] = React.useState({

        card_no: false,
        card_name: false,
        exp_date: false,
        cvv_no: false,
    
      });

    const toPrevorders = async() => {
        history.push("/orders");
    }


  const checkoutHandle = async () => {

    let token_id = 0;
    let username = 0;

    try {
      token_id = await Cookies.get('token');
      
    } catch (e) {
      console.log(e);
    }

    try {
      username = await Cookies.get('userName');
     
    } catch (e) {
      console.log(e);
    }

    // console.log("checkout screen- TOKEN id that we sent to backend::!!!", token_id);
		// console.log("checkout screen- USERNAME that we sent to backend::!!!", username);


    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user: username,
        token: token_id,
      }

    })

    let json = await response.json();
    console.log("json after checkout?!?!?!!?",json);
    
    if(json.status_code === 200){
      console.log("bu",json)
      alert("We received your order! Here is your order number 23814281.")
      //navigation.navigate('Invoice')
      toPrevorders();
    }
    else{
      alert("Try again!")
    }
  }

 

  //const { total } = route.params;
 

  const card_no_Change = (val) => {
    if( val.length === 0 ) {
      setData({
        ...data,
        card_no: false,
    });
  } else {
    setData({
      ...data,
      card_no: true,
  }); 
  }
}

const name_Change = (val) => {
  if( val.length === 0 ) {
    setData({
      ...data,
      card_name: false,
  });
} else {
  setData({
    ...data,
    card_name: true,
}); 
}
}
const exp_Change = (val) => {
  if( val.length === 0 ) {
    setData({
      ...data,
      exp_date: false,
  });
} else {
  setData({
    ...data,
    exp_date: true,
}); 
}
}
const cvv_Change = (val) => {
  if( val.length === 0 ) {
    setData({
      ...data,
      cvv_no: false,
  });
} else {
  setData({
    ...data,
    cvv_no: true,
}); 
}
}



  return (


    <div style = {{flex:1}}>

    <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 0, marginLeft: 20, fontWeight: "500", fontSize: 20, color: 'black' }}>Order details: </div>

      	<div>

        <Grid container spacing = {3}>
            {basketlist.map((item) => (
                <Grid cart xs={12} sm={4} key={item.name}>
                        <Product item={item}/>
                </Grid>
            ))}
        </Grid>

        </div>


        <div><text style={{ marginTop: 20, marginLeft: 10, fontWeight: "500", fontSize: 20, color: 'black' }}><text name="creditcard" size={25} color="black"/>  Credit Card Details:</text></div>
      <div >
        <input 
                    placeholder="Enter Credit Card Number"
                    //style={styles.textInput}   
                    onChange={(val) => card_no_Change(val.target.value)}         
        />
      </div>
      <div >
        <input 
                    placeholder="Enter Name of Credit Card Owner"
                    //style={styles.textInput}   
                    onChange={(val) => name_Change(val.target.value)}          
        />
      </div>
      <div>
        <input 
                    placeholder="Enter Credit Card Expiration Date"
                    //style={styles.textInput}   
                    onChange={(val) => exp_Change(val.target.value)}          
        />
      </div>
      <div >
        <input 
                    placeholder="Enter CVV"
                    //style={styles.textInput} 
                    onChange={(val) => cvv_Change(val.target.value)}            
        />
      </div>
        


      {/*<div><text style={{ marginTop: 20, marginLeft: 20, fontWeight: "500", fontSize: 20, color: 'black' }}>Total Payment: ${total}</text></div>*/}

      <div style={{ marginHorizontal: 90 }}>

					<Button style={{ marginBottom: 12 }}
						icon={
							<Icon
								name="arrow-right"
								size={15}
								color="white"
							/>
						}
						buttonStyle={{
							backgroundColor: '#04B45F'
						}}

						title='Confirm'
						onClick={() => {{
              if (data.cvv_no===false || data.card_name===false || data.card_no === false || data.exp_date === false  ) {
                alert("Fill out credit card information!")
              } else {
                checkoutHandle();
              }

              }
						}

						}
					> CHECKOUT </Button>
				</div>
      
    </div>

  );

};

export default Checkout
