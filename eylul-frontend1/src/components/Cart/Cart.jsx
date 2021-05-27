import React, { useState, useEffect} from "react";
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import Product from './Product/Product';
import { useHistory, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { ControlCameraOutlined } from "@material-ui/icons";

const Cart = () => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const classes=useStyles();
	const [totalprice, setTotalprice] = React.useState(0);
	const [quantity, setQuantity] = React.useState("");

    useEffect(() => {
		getCart();
	}, []);

	const [loggedIn, setloggedIn] = React.useState(null);
	useEffect(() => {
		let val =0;
		val = Cookies.get('userName');
		
        setloggedIn(val);
        console.log("am i logged in ????????????", loggedIn);
	});

    const getCart= async() =>{

		let token_id = 0;
		let username = 0;

		try {
			token_id = await Cookies.get('token');
			// setToken(token_id);
		} catch (e) {
			console.log(e);
		}

		try {
			// await AsyncStorage.setItem('userToken', userToken);
			username = await Cookies.get('userName');
			// setUsername(username);
		} catch (e) {
			console.log(e);
		}

		console.log("cart screen- TOKEN id that we sent to backend::!!!", token_id);
		console.log("cart screen- USERNAME that we sent to backend::!!!", username);

        const response = await fetch('http://localhost:5000/basket',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
                "user": username,
				"token": token_id,
            },
            })
        let json = await response.json();
		console.log("basket products::!!!", json);

		setCart(json.products);
		totalcalculate(json.products);
        }
    function totalcalculate(products) {
        let total = 0;
        for (const product of products) {
            total += product.price * product.quantity;
        }
        setTotalprice(total);
    }

    const toProducts = async() => {
        history.push("/home");
    }

    var isEmpty= true;
    if(cart.length!==0){
        isEmpty= false;
    }

    const deleteBasket = async (item_name) => {


		let token_id = 0;
		let username = 0;

		try {
			token_id = await Cookies.get('token');
			// setToken(token_id);
		} catch (e) {
			console.log(e);
		}

		try {
			// await AsyncStorage.setItem('userToken', userToken);
			username = await Cookies.get('userName');
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
		console.log("basket products after delete!!", json);

		getCart();

	}

    const EmptyCart = () => (
        <div>
        <Typography variant="subtitle1"> You have no items in the cart, Start adding some!</Typography>
        <Button className={classes.productsButton} size="large" type="button" variant="contained" color="primary" onClick={() => toProducts()} > View Products</Button>
        </div>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing = {3}>
                {cart.map((cart) => (
                    <Grid cart xs={12} sm={4} key={cart.name}>
                            <Product product={cart} getCart={getCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">Subtotal: ${totalprice} </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" > Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.emptyButton} size="large" type="button" variant="contained" color="primary"> Checkout</Button>
                    </div>
            </div>
        </>
    );

    const toCheckout = async() => {
        history.push({
            pathname: "/checkout",
            state: {product: totalprice}});
    }

    return (
        <Container>
            <div className={classes.toolbar} />
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
             <div className={classes.toolbar}/>
            <Typography className={classes.title} align="center" variant="h4">Your shopping cart</Typography>
            <br></br>
            { isEmpty ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );
};

export default Cart;
