import React, { useState } from 'react';
import { View, Text, Button, 
  StyleSheet, 
  Dimensions } from 'react-native';


const HomeScreen = ({navigation}) => {

  return (
  <View style={styles.container}>
    <Text>Product Screen</Text>
  </View>
    
  );  
};

export default HomeScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 80
  },

header: {
  justifyContent: 'center',
  alignItems: 'center',
},
button: {
  alignItems: 'center',
  marginBottom: 20,
  marginTop:20
},

button1: {
  alignItems: 'center',
  marginBottom: 40
},
logo: {
  width: height_logo,
  height: height_logo
},

signIn: {
  width: 150,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  flexDirection: 'row'
},
textSign: {
  color: 'white',
  fontWeight: 'bold',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 16 ,
}
})
