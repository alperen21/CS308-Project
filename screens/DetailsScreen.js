import React, { useState , useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar,FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';


const DetailsScreen = ({navigation, route}) => {

  return (
 
      <View style={styles.container}>
         <Text>Category Screen</Text>
      </View>

  );  
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

})