import React,{useEffect,useState} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView,FlatList,Image } from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ProductsList} from './Products/ProductsList';



/*const Product = (product) => (
  <View style={{flexdirection:'row',marginvertical:,paddinghorizontal}}>
    <Image style={{height:, width:}}
    source={{
      uri:product.product_image (databasedeki isim)
    }} />
    <View>
    <Text>{Product.name} </Text>
    <Text> {product.category }</Text>
    </View>
    <View>
    <Text>{Product.price} </Text>
   
    </View>
    
  </View>
);
*/
//const [productlist,setProductlist]=useState([])

/*
//bunu useffect icine aldi ege
const getProducts = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then((response) => response.json())
    .then((json) => {
      //console.log("List of products:", json )
      //return json.movies;
      setProductlist(json);
    })
    .catch((error) => {
      console.error(error);
    });
};*/


/*
const renderItem = ({ item }) => (
  <Product product={item} />
); */

const productsList = [
  {
    title: 'Nike Air Vapormax 360',
    description: `Men's Shoe`,
    price: '$225.00',
    image:
      'https://static.nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/i1-9944e829-002c-4a6b-93ed-cc8801c7eb0c/air-vapormax-360-mens-shoe-b09bdB.jpg',
    stock: 2,
  },
  {
    title: 'Nike Air Max 95 (Korea)',
    description: 'Shoe',
    price: '$180.00',
    image:
      'https://static.nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/5efc19ea-b3b5-428b-9558-bf4ca3f6d05f/air-max-95-korea-shoe-ZKTfcL.jpg',
    stock: 0,
  },
  {
    title: 'Air Jordan 1 Low',
    description: 'Shoe',
    price: '$90.00',
    image:
      'https://static.nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/b9026d85-06bd-4629-a727-dd68f6c49807/air-jordan-1-low-shoe-z3Tl2VeJ.jpg',
    stock: 2,
  },
  {
    title: 'Nike SuperRep Go',
    description: `Men's Training Shoe`,
    price: '$100.00',
    image:
      'https://static.nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/i1-29a5195b-aa65-48a9-80f6-72166078abdc/superrep-go-mens-training-shoe-19sK4X.jpg',
    stock: 2,
  },
];


const HomeScreen = ({navigation}) => {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View>
            <ProductsList list={productsList} />
          </View>
        </ScrollView>

     </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});


//flatlisti safearea icine yazdi
/*
<FlatList
data={productlist}
renderItem={renderItem}
keyExtractor={item => item.id}
/> */