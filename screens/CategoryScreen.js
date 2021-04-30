import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CategoryScreen = ({navigation}) => {
    return (
      <View style={styles.container}>

      <View style={styles.button}> 
       
       <TouchableOpacity
                    onPress={() => navigation.navigate('Espresso')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 0
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Espresso</Text>
        </TouchableOpacity>  

        <TouchableOpacity
                    onPress={() => navigation.navigate('FilterCoffee')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Filter Coffee</Text>
        </TouchableOpacity>  

        <TouchableOpacity
                    onPress={() => navigation.navigate('TurkishCoffee')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Turkish Coffee</Text>
        </TouchableOpacity>  

        <TouchableOpacity
                    onPress={() => navigation.navigate('Hotchocolate')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Hot Chocolate</Text>
        </TouchableOpacity>  

        <TouchableOpacity
                    onPress={() => navigation.navigate('CoffeeMachine')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Coffee Machines </Text>
        </TouchableOpacity>  

        </View>
      </View>
    );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},

textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},

button: {
  alignItems: 'center',
  marginTop: 10,
  width : 200,
  
},
});