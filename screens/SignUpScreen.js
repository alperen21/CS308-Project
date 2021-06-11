import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as MailComposer from 'expo-mail-composer';



const SignUpScreen = ({navigation}) => {
    
    const [data, setData] = React.useState({
        name:'',
        lastname:'',
        address:'',
        username: '',
        password: '',
        email:'',
        confirm_password: '',
        phone:'',
        check_textInputChange: false,
        checkNamechange: false,
        checkLastNamechange: false,
        checkEmailchange: false,
        checkAddresschange:false,
        checkPhonechange:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    
    const signUp = async () => {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                first_name: data.name,
                last_name:data.lastname,
                username: data.username,
                password:data.password,
                email:data.email,
                address: data.address ,
                phone: data.phone

            })
        })

        let json= await response.json();
        console.log(json);
        if(json.status_code == 200){
            navigation.navigate('SignInScreen');
        }
        else{

        }
    }

   
    const textInputChange = (val) => {
       // console.log("userName is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const textNameChange = (val) => {
        //console.log("Name is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                name: val,
                checkNamechange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                checkNamechange: false
            });
        }
    }
    const textlastNameChange = (val) => {
        //console.log("lastName is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                checkLastNamechange: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                checkLastNamechange: false
            });
        }
    }

    const textemailChange = (val) => {
        //console.log("email is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                checkEmailchange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkEmailchange: false
            });
        }
    }
    const textphoneChange = (val) => {
        //console.log("email is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                phone: val,
                checkPhonechange: true
            });
        } else {
            setData({
                ...data,
                phone: val,
                checkPhonechange: false
            });
        }
    }
    const textaddressChange = (val) => {
        //console.log("email is ",val);
        if( val.length !== 0 ) {
            setData({
                ...data,
                address: val,
                checkAddresschange: true
            });
        } else {
            setData({
                ...data,
                address: val,
                checkAddresschange: false
            });
        }
    }




    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textNameChange(val)}
                />
                {data.checkNamechange ? 
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
            <Text style={styles.text_footer}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Last Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textlastNameChange(val)}
                />
                {data.checkLastNamechange ? 
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

        
            

            <Text style={styles.text_footer}>Email Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textemailChange(val)}
                />
                {data.checkEmailchange ? 
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
           
            <Text style={styles.text_footer}> Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textaddressChange(val)}
                />
                {data.checkAddresschange ? 
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

            <Text style={styles.text_footer}> Phone Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textphoneChange(val)}
                />
                {data.checkPhonechange ? 
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


            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
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


            <Text style={[styles.text_footer, {marginTop: 20}]}>Password</Text>
            
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
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
            </TouchableWithoutFeedback>

            <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#000000"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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


            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    //onPress={() => navigation.navigate('SignInScreen') }
                    onPress={() => {signUp()} } //navigation.navigate('SignInScreen')
                >
                <LinearGradient
                    colors={['#666666', '#666666']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

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
                    }]}>Sign In</Text>
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
                        color: '#BFA38F'
                    }]}>Continue Shopping</Text>
                </TouchableOpacity>    

            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#BFA38F',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#000000',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });