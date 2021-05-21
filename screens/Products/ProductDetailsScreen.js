
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Rating } from 'react-native-elements';

import { Button } from './Button';

import Star from 'react-native-star-view';
import AsyncStorage from '@react-native-community/async-storage';


import { Foundation } from '@expo/vector-icons';
const ProductDetailsScreen = ({ route, navigation }) => {

  const [comment, setCommentList] = useState([]);
  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
  /* 2. Get the param */
  const { itemName, itemPrice, itemRating, itemModel, itemImage, itemStock,discountPrice,itemDiscount } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {

    const response = await fetch('http://localhost:5000/getcomment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

      },
      body: JSON.stringify({
        product_name: itemName
      })

    })
    let json = await response.json();
    setCommentList(json.comments);
  }

  const addToBasket = async (itemname) => {

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


    const response2 = await fetch('http://localhost:5000/basket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,
      },
      body: JSON.stringify({
        //category_name:'Coffee Machines'
        product_name: itemname,
        quantity: 1
      })

    })
    // console.log("item geldi mi", itemname);
    let json = await response2.json();
    //console.log("mesajımız: ", json.message)
    //console.log("code: ", json.status_code)
    //setBasket(json.category_elements);  
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {item.username} </Text>
          <View><Text style={{ fontSize: 15, marginTop: 15 }}> {item.text} </Text></View>
        </View>
        <View
          style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
            borderBottomWidth: 3,
            borderEndWidth: 1000,
          }}
        />
      </View>
    )
  };


  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'row' }}>
        
        <Image style={styles.image}
          source={{
            uri: itemImage
          }} />
        { itemDiscount !==0 && <Foundation name="burst-sale" size={65} color="red" />} 
        {itemDiscount !==0 && <Text style={{ fontSize: 18,color:'red' }}> %{itemDiscount} Off </Text>}
        <Text style={styles.title}>{itemName}</Text>
        <Text style={{ fontSize: 15 }}>Model:{itemModel}</Text>
        {itemStock !== 0 ? (
          <Text style={{ fontSize: 15 }}>InStock: {itemStock}</Text>
        ) : (<Text></Text>)}

        <Star score={itemRating} style={starStyle} />
        {/* <Text style={{fontSize:18}}>Rating: {itemRating}</Text> */}
        <View>
        {itemDiscount ===0 &&   <Text style={{fontSize: 25, marginTop:15 }}>${itemPrice}</Text>}
        {itemDiscount !==0 &&   <Text style={{ textDecorationLine: 'line-through',fontSize: 20, marginTop:15 }}>${itemPrice}</Text>}
        
        {itemDiscount !==0 && <Text style={{ marginTop: 20, fontSize: 25, color:'red' }}>${discountPrice}</Text>}
         
        </View>

        <View style={{ marginTop: 20 }}>
          {itemStock !== 0 ? (<Button
            title="Add to Cart"
            onPress={() => addToBasket(itemName)} />) : (<Text style={{ marginTop: 8, fontSize: 18 }}> OUT OF STOCK!</Text>)}

        </View>
        <View></View>
      </View>
      <View style={{ marginTop: 20, alignItems: 'left' }}>
        <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 28, color: '#BFA38F' }}> REVIEWS</Text>
        <FlatList
          data={comment}
          renderItem={renderItem}
          keyExtractor={(item) => item.username.toString()}
        />

      </View>
    </ScrollView>

  );
}

export default ProductDetailsScreen;



const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { width: 350, height: 350, marginTop: 80, marginBottom: 10 },
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
    justifyContent: 'space-between',

  },


});