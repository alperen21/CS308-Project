import React, { useEffect, useState } from 'react';
import { Button } from './Products/Button';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';

const ExploreScreen = ({navigation}) => {

  // const sleep = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [productlist, setProductList] = useState([]);

  const onChangeSearch = (query) => {
    // console.log("check query:", query);
    setSearchQuery(query);
  }


  const getProducts = async () => {

    // console.log("we are in get products:", productlist);

    const response = await fetch('http://localhost:5000/findProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        productName: searchQuery
      })

    })
    let json = await response.json();
    // console.log("code: ", json.status_code);
    if (json.status_code == 200) {
      setProductList(json.items);
      // console.log("we are in get products, data must come here!!:", productlist);
    }
    else {
      alert('Item does not exist')
      //missing field
    }
  }

  const renderItem = ({ item }) => {
    // console.log("in render item:", item.name);
    return (
      <View style={{ flexDirection: 'row', marginVertical: 50, paddingHorizontal: 0 }}>
        <Image style={styles.image}
          source={{
            uri: item.image_path
          }} />
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name} </Text>
          <Text style={{ fontSize: 15 }}> Model: {item.model}</Text>
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          <Text > </Text>
          <Text style={{ fontSize: 20 }}> ${item.price} </Text>
          <View style={styles.together}>
            <Button
              title="Add to Cart"
              onPress={() => Alert.alert(`${title}was added to cart`)}
            />
            <Button
              title="View Details"
              onPress={() => navigation.navigate('ProductDetails', {
                itemImage: item.image_path,
                itemName: item.name,
                itemModel: item.model,
                itemPrice: item.price,
                itemRating: item.rating,
                itemStock: item.stock,
              })} //navigate
            />
          </View>
        </View>
        <View>
        </View>
      </View>
    )
  };


  const onIconPressed = () => {
    getProducts();
    //must wait here a few second...!!! --- wait for database
//     sleep(500).then(() => {
//     console.log("on icon pressed debug: ",productlist);
// })
  
};

  return (
    <SafeAreaView>

      <Searchbar
        placeholder="What are you looking for?"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onIconPressed}
      /> 
       <FlatList
      data={productlist}
      renderItem={renderItem}
      keyExtractor={(item) => item.model.toString()}
    /> 

    </SafeAreaView>
  );
};


export default ExploreScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { width: 140, height: 200, marginBottom: 10 },
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