import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image ,TextInput} from 'react-native';
import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';

import { color } from 'react-native-reanimated';

const ReturnScreen = ({ navigation,route }) => {
const [Informationlist, setInformationList] = useState([]);
const { itemName,itemImage,cart_id,amount_purchased } = route.params;

const [data, setData] = React.useState({
    amount: 0,
  });

  // useEffect(() => {
  //   giveComment();
  // }, []);


  const CreateReturn = async () => {
    let token_id = 0;
    let username = 0;
    console.log(data.amount);
              
           
    try {
      token_id = await AsyncStorage.getItem('token');
      // setToken(token_id);
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

    const response = await fetch('http://localhost:5000/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },
      body: JSON.stringify({
        amount:data.amount,
        product_name: itemName,
        cart_id:cart_id
      })

    })
     let json = await response.json();
  //  console.log(" comment json::!!!", json);


   if (json.message === 'ok') {
    alert("Your refund request is received!")
  } else {
    alert("You already placed a return request for this product!")
  }

  }


  function amount_inc(curr_amount) {
   
    curr_amount= curr_amount+1
    setData({
        amount:curr_amount
      });
}

function amount_dec(curr_amount) {
    if (curr_amount >= 1) {
        //do nothing
    } else {
        curr_amount = 1;
    }

    curr_amount= curr_amount-1
    setData({
        amount:curr_amount
      });
}




  return (
      <View style={{ paddingHorizontal:5 ,paddingVertical:20 ,marginBottom:15, flex: 1 }}>
    <ScrollView >
   
    
    <Text style={{ marginTop: 25,fontSize: 20, marginRight: 30,fontWeight: 'bold', color: '#000000bf'  }}> Return Request for {itemName} </Text>
        <Image style={styles.image}
          source={{
            uri: itemImage
          }} />
        
     <View>
        
        <Text></Text>
          
          <View style={{ flex: 1 }} >
 
        {/* <Icon2 name='comment-o' size={40} color= '#000000bf'> </Icon2> */}
        <Image style={{width: 30, height: 30, marginBottom: 10 }}
        source={{
          uri: 'https://static.thenounproject.com/png/598350-200.png'
        }}/>
        <View style={styles.action}>
        <TextInput 
                    placeholder="Why are you returning this product?" 
                    placeholderTextColor='#000000bf'
                    style={styles.textInput}   
                         
        />
   
      </View>
      
      </View>
      <Text style={{ marginTop: 25,fontSize: 20, marginRight: 30,fontWeight: 'bold', color: '#000000bf'  }}>Enter the amount you want to return</Text>
      <Text style={{ marginTop: 25,fontSize: 15, marginRight: 30,fontWeight: '500', color: '#000000bf'  }}>Amount you purchased: {amount_purchased}</Text>
      <View style={{ flexDirection:'row' }}>
      <View style={{ marginTop: 25, marginLeft: 10 }} >

								<MaterialIcons name="remove" size={21} color="#000000bf" onPress={() => {amount_dec(data.amount)}} />
							</View>

							<View style={{ marginTop: 20, marginLeft:10 }}><TextInput style={styles.input}>{data.amount}</TextInput></View>
							<View style={{ marginTop: 25, marginLeft: 10 }} >

								<MaterialIcons name="add" size={21} color="#000000bf" onPress={() => {if (data.amount >= amount_purchased){alert('Enter a valid amount to return!')} else{ amount_inc(data.amount)}} }/>
							</View>
                            </View>
 </View>
            <Button 
              title="Return"
              onPress={() => {if(data.amount===0){alert('Enter a valid amount to return!')} else{CreateReturn()} }}
            />
           
            

  
      </ScrollView>
     

    </View>
    
  );
};

export default ReturnScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { alignSelf:'center' ,width: 200, height: 200, marginBottom: 10,marginTop:15 },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { color: '#b1b1b1', marginBottom: 10 },
  price: {
    color: '#7de3bb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notInStock: { textAlign: 'center' },

  together: {

    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
	input: {
		height: 30,
		width: 25,
		margin: 2,
		borderWidth: 0.3,
		fontSize: 15,
		textAlign: 'center'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },


});
