import React from 'react'
import Cookies from 'js-cookie'
import {Card, CardContent, CardActions, Typography, IconButton, Link, CardMedia} from '@material-ui/core';
import {useState, useEffect} from "react";
import { Grid, Paper} from '@material-ui/core';

const PrevOrders = () => {
    const [orderslist, setOrdersList] = useState([]);


    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        
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

        const response = await fetch('http://localhost:5000/order', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            user: username,
            token: token_id,

        },

        })
        let json = await response.json();
        // console.log(" orders::!!!", json.orders);
        setOrdersList(json.orders);
    }

    

    const renderItem = ({ item }) => {
        //console.log("start4",item.name);
        return (
    <div>
        <div style={{ flexDirection: 'row', marginVertical: 40, paddingHorizontal: 20 }}>
            
            <div>
            
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Order Time: {item.time} </div>
            <div style={{ fontSize: 17 }}>Order Status :{item.status} </div>
            {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
            {/* <Text style={{ fontSize: 15 }}> Quantity: {item.amount} </Text> */}
            <div>
            <IconButton
                title="View Details"
                //onPress={() => navigation.navigate('PrevOrderDetail', {
                //itemlist:item.products,
                //order_time:item.time,
                //order_status:item.status,

                //})}  //navigate
                />
            
            
                
            </div>


            </div>
            {/* if (item.status == 'Shipped') */}
            { item.status == 'Delivered'&&
            <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
                source={{
                uri: 'https://static.thenounproject.com/png/581279-200.png'
                
                //on the way : https://static.thenounproject.com/png/581278-200.png
                // delivered :https://static.thenounproject.com/png/581279-200.png
                // preparing : https://static.thenounproject.com/png/598271-200.png
                // returned : https://static.thenounproject.com/png/598350-200.png
                // cancelled : https://static.thenounproject.com/png/581276-200.png
                }}/></div>
        }
        {
            item.status == 'Preparing'&&
            <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
                source={{
                uri: 'https://static.thenounproject.com/png/598271-200.png'
                }}/></div>

        }
        {
            item.status == 'Shipped'&&
            <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
                source={{
                uri: 'https://static.thenounproject.com/png/581278-200.png'
                }}/></div>
        }
        {
            item.status == 'Cancelled'&&
            <div style={{ flexDirection: 'row',  marginLeft:140}}><CardMedia style={{width: 45, height: 45, marginBottom: 10 }}
            source={{
            uri: 'https://static.thenounproject.com/png/581276-200.png'
            }}/></div>

        }
        {
            item.status == 'Returned'&&
            <div style={{ flexDirection: 'row', marginLeft:140}}><CardMedia style={{width: 40, height: 40, marginBottom: 10 }}
            source={{
            uri: 'https://static.thenounproject.com/png/598350-200.png'
            }}/></div>

        }
            
        </div>
        <div
                        style={{
                //borderBottomColor: '#BFA38F',
                borderColor: '#BFA38F',
                            borderBottomWidth: 2,
                            borderEndWidth: 1000,
                        }}
                    />
        
        </div>

        )

    };

    return (
        <div >
            <Grid container spacing={5}>
                {orderslist.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={10} lg={2} >
                        <renderItem product={product} />
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default PrevOrders;
