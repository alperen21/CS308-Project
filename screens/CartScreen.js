import React,{useEffect,useState} from 'react';
import { StyleSheet,Button, Text, View, FlatList,TouchableOpacity, SafeAreaView,ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// const {navigation,route} = this.props;

const CartScreen =({ route, navigation }) =>{
	const [basketlist,setBasketList]=useState([]);
	
useEffect(() => { 
getBasket();
	},[]);

	const getBasket = async() => {

	const response2 = await  fetch('http://localhost:5000/basket', {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json',
			Accept: 'application/json',
		},  
	})
	
	let json= await response2.json();
	console.log("basket",json);
	setBasketList(json.products);
	//console.log("mesajımız: ", json.message)
	//console.log("code: ", json.status_code)
	//setBasket(json.category_elements);  
	}

	const renderItem = ({ item }) => {
	//console.log("start4",item.name);
	return (

		<View>
		<View style={{ flexDirection:'row'}}>
		<Image style={styles.image}
		source={{
		uri:item.image_path 
		}} />
		<View>
		<Text style={{ width:250,marginTop:10,fontSize:14,fontWeight: 'bold'}}>{item.name} </Text>
		<Text style={{fontSize:15}}> Model: {item.model }</Text>
		{/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
		<Text > </Text>
		<View style={{}}><Text style={{fontSize:20}}> ${item.price} </Text></View>	
		</View>
	</View>
	<View
  style={{
    //borderBottomColor: '#BFA38F',
    borderColor:'#BFA38F',
    borderBottomWidth: 2,
    borderEndWidth:1000,
  }}
/>  
	</View>
	)
	
	};
	
	return (
		<SafeAreaView  >
		
		<FlatList  
		data={basketlist}
		renderItem={renderItem} 
		keyExtractor={(item)=> item.name.toString()}
		/>
		 <View
  style={{
    //borderBottomColor: '#BFA38F',
    borderColor:'#BFA38F',
    borderBottomWidth: 3,
    borderEndWidth:1000,
  }}
/>  
		
		</SafeAreaView>
	);
};
  
	export default CartScreen;

	const styles = StyleSheet.create({
		container: {
		  shadowColor: '#cdcdcd',
		  shadowOffset: {width: 5, height: 5},
		  shadowOpacity: 0.5,
		  shadowRadius: 10,
		  elevation: 5,
		  marginBottom: 30,
		},
		image: {width: 100, height: 100, marginTop:10},
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


