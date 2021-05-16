import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';

import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import CreditCard from 'react-native-credit-card-form-ui';


const CheckoutScreen = ({ route }) => {

  // const [data, setData] = React.useState({

  //   username: '',
  //   address: '',


  // });
  const checkoutHandle = async () => {

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

    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user: username,
        token: token_id,
      },
      body: JSON.stringify({

      })
    })

    let json = await response.json();

    data.token = json.token;
    // setData({
    //     ...data,
    //     token: json.token,
    // });


    if (json.status_code == 200) {
      //console.log("HEYY CHECK IT OUTTTTT - signinScnreen!!!!",data.token);
      signIn(data.username, data.token);
      // ProfileScreen();

      navigation.navigate('Products', {
        username: data.username,
      });
      // navigation.navigate('Products');

    }
    else if (json.status_code == 400) {

      alert('missing field')
      //missing field
    }
    else {
      alert('user not found')
      //user not found
    }
  }


  const [text, onChangeText] = React.useState("");

  const { total } = route.params;
  const creditCardRef = React.useRef();



  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);
    }
  }, []);


  return (


    <SafeAreaView>


      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={"Your address"}
      />

      <View><Text style={{ marginTop: 100, marginLeft: 40, fontWeight: "500", fontSize: 20, color: 'black' }}>TOTAL: ${total}</Text></View>

      <View style={{ marginTop: 100, marginLeft: 40 }}>
        <CreditCard
          ref={creditCardRef}
          placeholders={{ number: '0000 0000 0000 0000', holder: 'Card Holder', expiration: 'MM/YY', cvv: '000' }}
          labels={{ holder: 'Card Holder', expiration: 'Expiration Date', cvv: 'CVV' }}
          expirationDateFormat={"MM/YY"}
          background={'#848484'}
          textColor={'#FFFFFF'}
          placeholderTextColor={'#FFFFFF'}
        />
        
      </View>

      <Button title="Submit" onPress={handleSubmit} />

    </SafeAreaView>

  );

};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#BFA38F'
  },
});
