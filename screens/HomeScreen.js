import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';


const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>home Screen</Text>
      

      <TouchableOpacity 
          onPress={() => navigation.navigate('Category')}
          style={[styles.signIn, {
              borderColor: '#009387',
              borderWidth: 1,
              marginTop: 15
          }]}
      >
          <Text style={[styles.textSign, {
              color: '#009387'
          }]}>Proceed Categories</Text>
      </TouchableOpacity>


      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});