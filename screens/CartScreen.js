import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input'
// import { Button } from './Products/Button';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";


const CartScreen = ({ navigation }) => {

	const isFocused = useIsFocused();
	const [totalprice, setTotalprice] = React.useState(0);
	const [quantity, setQuantity] = React.useState("");
	const [basketlist, setBasketList] = useState([]);

	useEffect(() => {
		getBasket();
	}, [isFocused]);


	const [loggedIn, setloggedIn] = React.useState(null);
	useEffect(() => {
		AsyncStorage.getItem('userName')
			.then((val) => {
				setloggedIn(val);
				console.log("am i logged in ????????????", loggedIn);
			});
	}, [isFocused]);


	const getBasket = async () => {

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

		console.log("cart screen- TOKEN id that we sent to backend::!!!", token_id);
		console.log("cart screen- USERNAME that we sent to backend::!!!", username);

		const response2 = await fetch('http://localhost:5000/basket', {
			method: 'GET',
			headers: {
				//'Authorization': 'Bearer ' + token_id,
				'Content-Type': 'application/json',
				"Accept": 'application/json',
				"user": username,
				"token": token_id,

			},
		})

		let json = await response2.json();
		//console.log("basket products::!!!", json);

		setBasketList(json.products);
		totalcalculate(json.products);
	}


	function totalcalculate(products) {
		let total = 0;
		for (const product of products) {
			total += product.price * product.quantity;
		}
		setTotalprice(total);
	}


	// useEffect(() => {
	// 	deleteBasket();
	// }, []);

	const deleteBasket = async (item_name) => {


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

		const response3 = await fetch('http://localhost:5000/basket', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				user: username,
				token: token_id,
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
				user: username,
				token: token_id,
			},
			body: JSON.stringify({
				product_name: item_name,
				quantity: item_quantity,

			})
		})

		let json = await response4.json();
		//console.log("basket products after quantity change!!", json);

		getBasket();

	}



	const renderItem = ({ item }) => {
		//console.log("start4",item.name);

		var total_price = 0;
		// setQuantity(item.quantity);
		total_price = total_price + item.quantity * item.price;
		// subtotal=subtotal+total_price;
		//console.log("again",prices);
		return (

			<View>
				<View style={{ flexDirection: 'row' }}>
					<Image style={styles.image}
						source={{
							uri: item.image_path
						}} />
					<View>
						<Text style={{ width: 300, marginTop: 10, fontSize: 14, fontWeight: 'bold' }}>{item.name} </Text>
						<Text style={{ fontSize: 15 }}> Model: {item.model}</Text>
						{/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
						<Text > </Text>

						<View style={{ flexDirection: 'row' }}>

							<View style={{}}><Text style={{ fontSize: 18, color: '#000000bf' }}> ${item.price} </Text></View>
							<View style={{ marginTop: 7, marginLeft: 38 }} >

								<MaterialIcons name="remove" size={21} color="#000000bf" onPress={() => { changeQuantity(item.name, item.quantity - 1) }} />
							</View>

							<View style={{ marginLeft: 0 }}><TextInput style={styles.input}>{item.quantity} </TextInput></View>
							<View style={{ marginTop: 7, marginLeft: 0 }} >

								<MaterialIcons name="add" size={21} color="#000000bf" onPress={() => { changeQuantity(item.name, item.quantity + 1) }} />
							</View>

							<View style={{ marginLeft: 30 }}>
								<MaterialIcons name="delete" size={28} color="#DF0101" onPress={() => { alert("Item deleted from basket"), deleteBasket(item.name) }} />
							</View>
							<View ><Text style={{ fontWeight: '600', marginLeft: 25, fontSize: 20, color: '#000000bf' }}>${total_price}</Text></View>
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
		<View style={{ flex: 1 }}>
			<ScrollView>

				<FlatList
					data={basketlist}
					renderItem={renderItem}
					keyExtractor={(item) => item.name.toString()}
				/>


			</ScrollView>
			<View
				style={{
					//borderBottomColor: '#BFA38F',
					borderColor: '#000000bf',
					borderBottomWidth: 5,
					borderEndWidth: 1000,
					marginBottom: 15
				}}
			/>
			<View style={{ flexDirection: 'row' }}>

				<Text style={{ marginLeft: 10, fontWeight: "500", fontSize: 20, color: 'black' }}> <AntDesign name="shoppingcart" size={24} color="black" />  SUBTOTAL:  ${totalprice}</Text>
				<View style={{ marginHorizontal: 60  }}>

					<Button style={{ marginBottom: 12 }}
						icon={
							<Icon
								name="arrow-right"
								size={15}
								color="white"
							/>
						}
						buttonStyle={{
						
							backgroundColor: '#04B45F'
						}}

						title='Checkout'
						onPress={() => {
							if (totalprice === 0) {
								alert("Cart is empty!");
								
							} else if(loggedIn === null){
								alert("You need to sign up/sign in in order to checkout!");
								// navigation.navigate('SignUpScreen')
							} else{
								navigation.navigate('Checkout', {total: totalprice})
							}
						}


						}
					/>
				</View>

			</View>
		</View>
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
		height: 30,
		width: 25,
		margin: 1,
		borderWidth: 0.3,
		fontSize: 15,
		textAlign: 'center'
	},
	button: {
		backgroundColor: '#000000bf',
		borderRadius: 20,
		paddingHorizontal: 13,
		paddingVertical: 12,
		marginTop: 20
	},
	buttontext: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '500',
	},


});