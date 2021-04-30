import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'
import { Button } from './Products/Button';
import AsyncStorage from '@react-native-community/async-storage';


// const {navigation,route} = this.props;


const CartScreen = ({ navigation }) => {


	const [username, setUsername] = React.useState(null);
	useEffect(() => {

		AsyncStorage.getItem('userName')
			.then((val) => {
				//   console.log("CHECK OUTTOOOOOOO!!!!",val);
				setUsername(val);
			});
		// console.log('user token: ', userToken);
		//   dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

	}, []);

	const [quantity, setQuantity] = React.useState("");

	const [basketlist, setBasketList] = useState([]);
	useEffect(() => {
		getBasket();
	}, []);

	const getBasket = async () => {

		const response2 = await fetch('http://localhost:5000/basket', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})

		let json = await response2.json();
		//console.log("basket products::!!!", json);
		setBasketList(json.products);
	}


	// useEffect(() => {
	// 	deleteBasket();
	// }, []);

	const deleteBasket = async (item_name) => {

		const response3 = await fetch('http://localhost:5000/basket', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({

				product_name: item_name,

			})
		})

		let json = await response3.json();
		// console.log("basket products after delete!!", json);

		getBasket();

	}

	// useEffect(() => {
	// 	changeQuantity();
	// }, []);
	const changeQuantity = async (item_name, item_quantity) => {

		if (item_quantity >= 1) {
			//do nothing
		} else {
			item_quantity = 1;
		}

		const response4 = await fetch('http://localhost:5000/basket', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({

				product_name: item_name,
				quantity: item_quantity,

			})
		})

		let json = await response4.json();
		console.log("basket products after quantity change!!", json);

		getBasket();

	}



	const renderItem = ({ item }) => {
		//console.log("start4",item.name);

		var total_price = 0;
		// setQuantity(item.quantity);
		total_price = total_price + item.quantity * item.price;

		//console.log("again",prices);
		return (

			<View>
				<View style={{ flexDirection: 'row' }}>
					<Image style={styles.image}
						source={{
							uri: item.image_path
						}} />
					<View>
						<Text style={{ width: 250, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name} </Text>
						<Text style={{ fontSize: 15 }}> Model: {item.model}</Text>
						{/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
						<Text > </Text>

						<View style={{ flexDirection: 'row' }}>

							<View style={{}}><Text style={{ fontSize: 20 }}> ${item.price} </Text></View>

							<View style={{ marginLeft: 70 }}><TextInput style={styles.input}>  {item.quantity} </TextInput></View>
							<View style={{ marginLeft: 10 }} >
								<MaterialIcons name="add" size={21} color="black" onPress={() => { changeQuantity(item.name, item.quantity + 1) }} />
								<MaterialIcons name="remove" size={21} color="black" onPress={() => { changeQuantity(item.name, item.quantity - 1) }} />
							</View>

							<View style={{ marginLeft: 25 }}>
								<MaterialIcons name="delete" size={28} color="black" onPress={() => { deleteBasket(item.name) }} />
							</View>
							<View ><Text style={{ fontWeight: 'bold', marginLeft: 25, fontSize: 20 }}>${total_price}</Text></View>
						</View>

					</View>
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


		<SafeAreaView  >

			<FlatList
				data={basketlist}
				renderItem={renderItem}
				keyExtractor={(item) => item.name.toString()}
			/>
			<View
				style={{
					//borderBottomColor: '#BFA38F',
					borderColor: '#BFA38F',
					borderBottomWidth: 3,
					borderEndWidth: 1000,
				}}
			/>

			<Button
				title="Checkout"
				onPress={() => { alert("does not exist") }}
			/>

			{/* if (basketlist !== null) {
				<Button 			
				title="Checkout"
				onPress={() =>{ alert("does not exist")}}
				 />
			}
			else{
				<Text>There is no product in your basket</Text>
			}
			 */}

		</SafeAreaView>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	container: {
		shadowColor: '#cdcdcd',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 30,
	},
	image: { width: 100, height: 100, marginTop: 10 },
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
		justifyContent: 'space-evenly',

	},
	input: {
		height: 35,
		width: 25,
		margin: 1,
		borderWidth: 0.5,
		fontSize: 15
	},


});