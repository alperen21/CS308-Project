import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Button } from './Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Foundation } from '@expo/vector-icons';

const EspressoScreen = ({ navigation }) => {
  const [productlist, setProductList] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {

    const response = await fetch('http://localhost:5000/productsOfCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        //'category_name':'Espresso'
      },
      body: JSON.stringify({
        category_name: 'Espresso'
      })

    })
    let json = await response.json();
    setProductList(json.category_elements);

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
    //console.log("start4",item.name);
    let discount_price=0 ;
    if (item.discount !==0) {(discount_price=item.price-(item.price*item.discount/100))}
    else{discount_price= item.price}
    return (

      <View style={{ flexDirection: 'row', marginVertical: 50, paddingHorizontal: 5 }}>
        <Image style={styles.image}
          source={{
            uri: item.image_path
          }} />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name} </Text>
          <Text style={{ fontSize: 15 }}> Model: {item.model}</Text>
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          <Text > </Text>
          {item.discount ===0 &&<Text style={{fontSize: 20 }}> ${item.price}  </Text>}
          {item.discount !==0 &&<Text style={{ textDecorationLine: 'line-through',fontSize: 20 }}> ${item.price}  </Text>}

          { item.discount !==0 && <Text style={{ fontSize: 20, color:'red' }}> ${ item.price-(item.price*item.discount/100)} </Text>} 
          <View style={styles.together}>
            <Button
              title="Add to Cart"
              onPress={() => addToBasket(item.name)}
            />
            <Button
              title="View Details"
              onPress={() => navigation.navigate('ProductDetails', {
                itemImage: item.image_path,
                itemName: item.name,
                itemModel: item.model,
                itemPrice:item.price,
                discountPrice: discount_price,
                itemRating: item.rating,
                itemStock: item.stock,
                itemDiscount: item.discount
              })} //navigate
            />
          </View>


        </View>
        <View style={{ marginTop:10, marginLeft:-40}}>
        { item.discount !==0 && <Foundation name="burst-sale" size={65} color="red" />} 
        {item.discount !==0 && <Text style={{ fontSize: 15,color:'red' }}> %{item.discount} Off </Text>}

        </View>
      </View>

    )

  };

  return (
    <SafeAreaView  >

      <FlatList
        data={productlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.product_id.toString()}
      />

    </SafeAreaView>
  );
};

export default EspressoScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { width: 150, height: 200, marginBottom: 10 },
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


  },


});

