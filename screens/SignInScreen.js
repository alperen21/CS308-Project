import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from './ProfileScreen'

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';


const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        token:'',
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const signInHandle = async () => {
        const response = await fetch('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
            
                username: data.username,
                password:data.password,
        
            })
        })

        let json= await response.json();

        data.token = json.token;
        // setData({
        //     ...data,
        //     token: json.token,
        // });
      
    
        if(json.status_code == 200){
            console.log("HEYY CHECK IT OUTTTTT - signinScnreen!!!!",data.token);
            signIn(data.username, data.token);
            // ProfileScreen();

            navigation.navigate('Products',{
                username:data.username,
              }); 
            // navigation.navigate('Products');

        }
        else if(json.status_code == 400){

            alert('missing field')
            //missing field
        }
        else {
            alert('user not found')
            //user not found
        }
    }

    const { colors } = useTheme();

    
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 2 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
         <View style={styles.header}>
            <Text style={styles.text_header}>Get Started!</Text>
         </View>
         <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 2 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#BFA38F', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    // onPress={() => {loginHandle( data.username, data.password )}}
                    onPress={() => {signInHandle()} }
                >
                <LinearGradient
                    colors={['#666666', '#666666']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
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
                    }]}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Products')}
                    style={[styles.signIn, {
                        borderColor: '#BFA38F',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#BFA38F'
                    }]}>Continue Shopping</Text>
                </TouchableOpacity>   


            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#BFA38F'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,

    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
    }
  });