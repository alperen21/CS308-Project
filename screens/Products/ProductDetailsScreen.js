
import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
import { Rating } from 'react-native-elements';

import {Button} from './Button';

import Star from 'react-native-star-view';




const ProductDetailsScreen =({ route, navigation }) =>{

  const [comment,setCommentList]=useState([]);
  const starStyle = {
    width: 155,
    height: 35,
    marginBottom: 20,
  };
    /* 2. Get the param */
    const { itemName, itemPrice,itemRating,itemModel,itemImage,itemStock } = route.params;

    useEffect(() => { 
      getComments();
            },[]);

    const getComments = async() => {
        
      const response = await fetch('http://localhost:5000/getcomment', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
             Accept: 'application/json',
            
        },
        body: JSON.stringify({
          product_name: itemName
        })
        
      })
      let json= await response.json();
      setCommentList(json.comments);  
    }

    const renderItem = ({ item }) => {
      return (
        <View>
        <View style={{ flexDirection:'column',marginVertical:40,paddingHorizontal:10}}>
      <Text style={{fontSize:18 ,fontWeight:'bold'}}> {item.username} </Text> 
      <View><Text style={{fontSize:15,marginTop:15}}> {item.text} </Text></View>
      </View>
      <View
  style={{
    //borderBottomColor: '#BFA38F',
    borderColor:'#BFA38F',
    borderBottomWidth: 3,
    borderEndWidth:1000,
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
          <Text style={{textDecorationLine:'underline',fontWeight:'bold' ,fontSize:28 ,color: '#BFA38F'}}> REVIEWS</Text>
          <FlatList  
          data={comment}
          renderItem={renderItem} 
          keyExtractor={(item)=> item.username.toString()}
          />
          
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