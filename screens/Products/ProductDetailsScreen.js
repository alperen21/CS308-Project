
import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
import { Rating } from 'react-native-elements';

import {Button} from './Button';

import Star from 'react-native-star-view';




const ProductDetailsScreen =({ route, navigation }) =>{
  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
    /* 2. Get the param */
    const { itemName, itemPrice,itemRating,itemModel,itemImage,itemStock } = route.params;
   
    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'row' }}>
        <Image style={styles.image}
      source={{
        uri:itemImage
      }} />
        <Text style={styles.title}>{itemName}</Text>
        <Text style={{fontSize:15}}>Model:{itemModel}</Text>
        <Text style={{fontSize:15}}>InStock: {itemStock}</Text>
        <Star score={itemRating} style={starStyle} />
        {/* <Text style={{fontSize:18}}>Rating: {itemRating}</Text> */}
        <View>
        <Text style={{marginTop:20 ,fontSize:25}}>${itemPrice}</Text>
        
        </View>
        <View style={{marginTop:20 }}>
          <Button 
          title="Add to Cart"
          onPress={() => Alert.alert(`${title} was added to cart`)}/>
          </View>
          <View></View>
      </View>
      <View style={{marginTop:20,alignItems: 'left'}}>
          <Text style={styles.title}> Reviews:</Text>
          
          </View>  
      </ScrollView>

    );
  }

  export default ProductDetailsScreen;



  const styles = StyleSheet.create({
    container: {
      shadowColor: '#cdcdcd',
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: 30,
    },
    image: {width: 350, height: 350, marginTop:80,marginBottom: 10},
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    title: {fontSize: 23, fontWeight: 'bold'},
    description: {color: '#b1b1b1', marginBottom: 10},
    price: {
      color: '#7de3bb',
      fontSize: 18,
      fontWeight: 'bold',
    },
    notInStock: {textAlign: 'center'},
  
    together: {
      
      flexDirection: 'row',
      justifyContent: 'space-between',
  
    },

 
  });