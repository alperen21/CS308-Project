import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon2 from 'react-native-vector-icons/Feather';
import { useIsFocused } from "@react-navigation/native";

const PreviousOrdersScreen = ({ navigation }) => {
const [orderslist, setOrdersList] = useState([]);

const isFocused = useIsFocused();

useEffect(() => {
    getOrders();
  }, [isFocused]);

  const getOrders = async () => {
    
    let token_id = 0;
    let username = 0;

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

    const response = await fetch('http://localhost:5000/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },

    })
    let json = await response.json();
  console.log(" orders::!!!", json.orders);
    setOrdersList(json.orders);
  }
  
  
  
  
  const cancelOrders = async (order_idd) => {
    
    let token_id = 0;
    let username = 0;

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

    const response = await fetch('http://localhost:5000/cancelOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },
      body: JSON.stringify({
        order_id: order_idd ,
      })

    })
    let json = await response.json();
  //console.log(" orders::!!!", json.orders);
    getOrders();
  }

  

  const renderItem = ({ item }) => {
    //console.log("start4",item.name);
    return (
<View>
      <View style={{ flexDirection: 'row', marginVertical: 40, paddingHorizontal: 20 }}>
        
        <View>
         
          <Text style={{ textDecorationLine:'underline' ,width: 190,fontSize: 18, fontWeight: 'bold' }}>Order Date:  </Text><Text style={{fontSize: 18}}>{item.time}</Text>
          <Text></Text>
          <Text style={{ textDecorationLine:'underline',fontSize: 17 ,fontWeight: 'bold'}}>Order Status : </Text><Text style={{fontSize: 18}}>{item.status}</Text>
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          {/* <Text style={{ fontSize: 15 }}> Quantity: {item.amount} </Text> */}
          <View style={styles.together}>
          <Button
              title="View Details"
              onPress={() => navigation.navigate('PrevOrderDetail', {
              itemlist:item.products,
              order_time:item.time,
              order_status:item.status,
              total_price: item.total_price, 
              cart_id:item.cart_id

              })}  //navigate
            />
            {item.status==='Preparing' &&
            <Button
              title="Cancel order"
              onPress={() => {cancelOrders(item.order_id), alert('Your order is cancelled!')}}  //navigate
            /> }
           
           
            
          </View>


        </View>
        {/* if (item.status == 'Shipped') */}
        { item.status == 'Delivered'&&
        <View style={{ flexDirection: 'row',  marginLeft:140}}><Image style={{width: 45, height: 45, marginBottom: 10 }}
            source={{
              uri: 'https://static.thenounproject.com/png/581279-200.png'
              
              //on the way : https://static.thenounproject.com/png/581278-200.png
              // delivered :https://static.thenounproject.com/png/581279-200.png
              // preparing : https://static.thenounproject.com/png/598271-200.png
              // returned : https://static.thenounproject.com/png/598350-200.png
              // cancelled : https://static.thenounproject.com/png/581276-200.png
            }}/></View>
      }
      {
        item.status == 'Preparing'&&
        <View style={{ flexDirection: 'row',  marginLeft:110}}><Image style={{width: 45, height: 45, marginBottom: 10 }}
            source={{
              uri: 'https://static.thenounproject.com/png/598271-200.png'
            }}/></View>

      }
      {
        item.status == 'Shipped'&&
        <View style={{ flexDirection: 'row',  marginLeft:140}}><Image style={{width: 45, height: 45, marginBottom: 10 }}
            source={{
              uri: 'https://static.thenounproject.com/png/581278-200.png'
            }}/></View>
      }
      {
        item.status == 'Cancelled'&&
         <View style={{ flexDirection: 'row',  marginLeft:140}}><Image style={{width: 45, height: 45, marginBottom: 10 }}
         source={{
           uri: 'https://static.thenounproject.com/png/581276-200.png'
         }}/></View>

      }
      {
        item.status == 'Returned'&&
        <View style={{ flexDirection: 'row', marginLeft:140}}><Image style={{width: 40, height: 40, marginBottom: 10 }}
        source={{
          uri: 'https://static.thenounproject.com/png/598350-200.png'
        }}/></View>

      }
        
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

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <FlatList style={{ flex: 1 }}
        data={orderslist}
        renderItem={renderItem}
        keyExtractor={(item) => item.time.toString()}
      />

    </SafeAreaView>
  );
};

export default PreviousOrdersScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { width: 45, height: 45, marginBottom: 10 },
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


});
