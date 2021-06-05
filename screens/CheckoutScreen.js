import React, { useEffect, useState } from 'react';
import { View ,Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';

import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import CreditCard from 'react-native-credit-card-form-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';


const CheckoutScreen = ({ route, navigation }) => {

  const isFocused = useIsFocused();

  useEffect(() => {
		getBasket();
	}, [isFocused]);

  const [basketlist, setBasketList] = useState([]);

  const getBasket = async () => {

		let token_id = 0;
		let username = 0;

		try {
			token_id = await AsyncStorage.getItem('token');
		} catch (e) {
			console.log(e);
		}

		try {
			// await AsyncStorage.setItem('userToken', userToken);
			username = await AsyncStorage.getItem('userName');
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

  const renderItem = ({ item }) => {

		return (

			<View>
				<View style={{ flexDirection: 'row' }}>
					<Image style={styles.image}
						source={{
							uri: item.image_path
						}} />
					<View>
						<Text style={{ width: 300, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name} </Text>
						<Text style={{ fontSize: 15 }}> Model: {item.model}</Text>
						{/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
						<Text > </Text>

						<View style={{ flexDirection: 'row' }}>

							<View style={{}}><Text style={{ fontSize: 18, color: '#000000bf' }}> ${item.price} </Text></View>
						
							<View style={{ marginLeft: 200 , marginRight:50}}><Text style={{ fontSize: 18}}>x{item.quantity}</Text></View>

						</View>

					</View>
				</View>
				<View
					style={{
						//borderBottomColor: '#BFA38F',
						borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/>
			</View>
		)

	};
//-------------------------------------------------------------------------------------------

   const [data, setData] = React.useState({

    card_no: false,
    card_name: false,
    exp_date: false,
    cvv_no: false,

  });

  const checkoutHandle = async () => {

    let token_id = 0;
    let username = 0;

    try {
      token_id = await AsyncStorage.getItem('token');
      
    } catch (e) {
      console.log(e);
    }

    try {
      username = await AsyncStorage.getItem('userName');
     
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
      },
      body: JSON.stringify({

      })
    })

    let json = await response.json();
    console.log("json after checkout?!?!?!!?",json);
    
    if(json.status_code === 200){
      alert("We received your order! Here is your order number 23814281.")
      navigation.navigate('Invoice', {
       invoice_all:json
      })
    }
    else{
      alert("Try again!")
    }
  }

 

  const { total } = route.params;
 

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


    <View style = {{flex:1}}>

    <View><Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "500", fontSize: 20, color: 'black' }}>Order details:</Text></View>

      	<ScrollView>

        <FlatList
          data={basketlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.name.toString()}
        />

        </ScrollView>


        <View><Text style={{ marginTop: 20, marginLeft: 10, fontWeight: "500", fontSize: 20, color: 'black' }}><AntDesign name="creditcard" size={25} color="black"/>  Credit Card Details:</Text></View>
      <View style={styles.action}>
        <TextInput 
                    placeholder="Enter Credit Card Number"
                    style={styles.textInput}   
                    onChangeText={(val) => card_no_Change(val)}         
        />
      </View>
      <View style={styles.action}>
        <TextInput 
                    placeholder="Enter Name of Credit Card Owner"
                    style={styles.textInput}   
                    onChangeText={(val) => name_Change(val)}          
        />
      </View>
      <View style={styles.action}>
        <TextInput 
                    placeholder="Enter Credit Card Expiration Date"
                    style={styles.textInput}   
                    onChangeText={(val) => exp_Change(val)}          
        />
      </View>
      <View style={styles.action}>
        <TextInput 
                    placeholder="Enter CVV"
                    style={styles.textInput} 
                    onChangeText={(val) => cvv_Change(val)}            
        />
      </View>
        


      <View><Text style={{ marginTop: 20, marginLeft: 20, fontWeight: "500", fontSize: 20, color: 'black' }}>Total Payment: ${total}</Text></View>

      <View style={{ marginHorizontal: 90 }}>

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
						onPress={() => {{
              if (data.cvv_no===false || data.card_name===false || data.card_no === false || data.exp_date === false  ) {
                alert("Fill out credit card information!")
              } else {
                checkoutHandle();
              }

              }
						}

						}
					/>
				</View>
      
    </View>

  );

};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#BFA38F'
  },
  container: {
		shadowColor: '#cdcdcd',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 30,
	},
	image: { width: 100, height: 100, marginTop: 10 },
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	title: { fontSize: 23, fontWeight: 'bold' },
	description: { color: '#b1b1b1', marginBottom: 10 },
	price: {
		color: '#7de3bb',
		fontSize: 18,
		fontWeight: 'bold',
	},
	notInStock: { textAlign: 'center' },

	together: {

		flexDirection: 'row',
		justifyContent: 'space-evenly',

	},
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
	input: {
		height: 30,
		width: 25,
		margin: 1,
		borderWidth: 0.3,
		fontSize: 15,
		textAlign: 'center'
	},
	button: {
		backgroundColor: '#000000bf',
		borderRadius: 20,
		paddingHorizontal: 13,
		paddingVertical: 12,
		marginTop: 20
	},
	buttontext: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '500',
	},
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
});
