import React, { useState , useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar,FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';


const ExploreScreen = ({navigation}) => {

  return (
 
      <View style={styles.container}>
         <Text>Profile Screen</Text>

         <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
          </TouchableOpacity>

      </View>
  );  
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

})