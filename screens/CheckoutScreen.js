import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, KeyboardAvoidingView,Platform,SafeAreaView,ScrollView,FlatList,Image } from 'react-native';

import {Button} from './Products/Button';
import PropTypes from 'prop-types';
import CreditCard from 'react-native-credit-card-form-ui';



const CheckoutScreen = ({ route,navigation }) => {
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

 
    return(
        

        <SafeAreaView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={20}
        // style={styles.container}
      >
          <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={"Your address"}
      />
          <View><Text style={{marginTop:100,marginLeft:40,fontWeight:"500",fontSize:20,color:'black'}}>TOTAL: ${total}</Text></View>
          
        <View style={{marginTop:100,marginLeft:40}}>
        <CreditCard
        ref={creditCardRef}
        placeholders={{ number: '0000 0000 0000 0000',holder: 'Card Holder', expiration: 'MM/YY', cvv: '000'}} 
        labels={{holder: 'Card Holder', expiration: 'Expiration Date', cvv: 'CVV'}}
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
        borderRadius:10,
        borderColor:'#BFA38F'
      },
  });
