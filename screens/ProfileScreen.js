import AsyncStorage from '@react-native-community/async-storage';
import React , {useEffect, useState}  from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,ScrollView,LinearGradient } from 'react-native';
import { set } from 'react-native-reanimated';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
// import { color } from 'react-native-reanimated'; 
import Icon2 from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';

const ProfileScreen = ({navigation}) => {

    const {signOut} = React.useContext(AuthContext);

    const [usertoken, setUserToken] = React.useState(null);

    useEffect(() => { 
          // setIsLoading(false);
          let userToken;
        //   userToken = null; 
          AsyncStorage.getItem('userToken') 
            .then((value) => {
                    // console.log(value);
                    setUserToken(value);
                });
         
        // console.log('user token: ', userToken);
        //   dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

      }, []);


    return (


      <ScrollView>
      <View style={styles.container}>
        <Text style={{marginTop:30, fontSize:20, marginRight:30}}>  <Icon2 name='user' size={30}> </Icon2>User name</Text>
        <View style={styles.button}>
        
        { usertoken === null ? (
        
        <View>

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

        </View>
        )
         : 
        (

   <View>
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
                    // onPress={() => navigation.navigate('Home')}
                    onPress={() => {signOut() 
                    navigation.replace('SplashScreen')}}
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
        )
                }
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