import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,ScrollView,LinearGradient } from 'react-native';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { color } from 'react-native-reanimated';

import Icon2 from 'react-native-vector-icons/Feather';

const ProfileScreen = ({navigation}) => {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={{marginTop:30, fontSize:20, marginRight:30}}>  <Icon2 name='user' size={30}> </Icon2>User name</Text>
        <View style={styles.button}>
        <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Sign in </Text>
        </TouchableOpacity>  

        <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Sign up </Text>
        </TouchableOpacity>  
       
        <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Previous Purchases </Text>
        </TouchableOpacity>  
        
        <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Account Information </Text>
        </TouchableOpacity>  


        <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Comments | Ratings </Text>
        </TouchableOpacity>  


        <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                  
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Sign Out   <Icon2 name='log-out' size={26}> </Icon2> </Text>
        </TouchableOpacity> 



      





        </View>
      </View>
      </ScrollView>
    );
};

export default ProfileScreen;

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
  marginTop: 50,
  width : 200,
  
},

});