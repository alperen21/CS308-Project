import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView,FlatList,Image } from 'react-native';
import MainTabScreen from '../MainTabScreen';
import {Button} from './Button';
import PropTypes from 'prop-types';



// const Product = ({product}) => {
//   console.log("PPEEEPEEEE",product);
//   return (
//     <View style={{flexDirection:'row',marginVertical:100,paddingHorizontal:100}}>
//       <Image style={{height:10, width:10}}
//       source={{
//         uri:product.image_path 
//       }} />
//       <View>
//       <Text style={{fontSize:100}}>{product.product_id} </Text>
//       <Text style={{fontSize:100}}>{product.name} </Text>
//       <Text style={{fontSize:100}}> {product.model }</Text>
//       <Text style={{fontSize:100}}> {product.rating }</Text>
//       </View>
//       <View>
//       <Text style={{fontSize:100}}>{product.price} </Text>
     
//       </View>
//     </View>
//   )
//     }; 



  const HotchocolateScreen = () =>{
  const [productlist,setProductList]=useState([]);
  
  useEffect(() => { 
    getProducts();
          },[]);

          const getProducts = async() => {
        
            const response = await fetch('http://localhost:5000/productsOfCategory', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
                   Accept: 'application/json',
              },
              body: JSON.stringify({
                category_name:'Hot Chocolate'
              })
              
            })
            let json= await response.json();
            setProductList(json.category_elements);
      
        
          }
          


  const renderItem = ({ item }) => {
    //console.log("start4",item.name);
    return (
   
      <View style={{ flexDirection:'row',marginVertical:50,paddingHorizontal:10}}>
      <Image style={styles.image}
      source={{
        uri:item.image_path 
      }} />
      <View>
      <Text style={{ fontSize:15}}>{item.name} </Text>
      <Text style={{fontSize:15}}> Model: {item.model }</Text>
      <Text style={{fontSize:18}}> Rating: {item.rating }</Text>
      <Text > </Text>
      <Text style={{fontSize:20}}> ${item.price} </Text>
      <View style={styles.together}>
      <Button 
          title="Add to Cart"
          onPress={() => Alert.alert(`${title} was added to cart`)}
        />
          <Button
        title="View Details"
        onPress={() => navigation.navigate('ProductDetails')} //navigate
      />
        </View>
        
       
      </View>
      <View>

    </View>
    </View>

    )
    
  };
  
    return (
      <SafeAreaView   style={{flex:1}}>
        
      <FlatList  style={{flex:1}}
      data={productlist}
      renderItem={renderItem} 
      keyExtractor={(item)=> item.product_id.toString()}
      />
      
     </SafeAreaView>
    );
};

export default HotchocolateScreen;


const styles = StyleSheet.create({
    container: {
      shadowColor: '#cdcdcd',
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: 30,
    },
    image: {width: 150, height: 200, marginBottom: 10},
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    title: {fontSize: 18, fontWeight: 'bold'},
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

  