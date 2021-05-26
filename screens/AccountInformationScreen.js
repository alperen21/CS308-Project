import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, TextInput } from 'react-native';
import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon2 from 'react-native-vector-icons/Feather';

const AccountInformationScreen = ({ navigation }) => {
  const [Informationlist, setInformationList] = useState([]);

  const [data, setData] = React.useState({

    username: Informationlist.username,
    first_name: Informationlist.first_name,
    last_name: Informationlist.last_name,
    email: Informationlist.email,
    phone: Informationlist.phone,
    address: Informationlist.address,
    password:""
    //password: false,
  });

  useEffect(() => {
    getAccount();
  }, []);

  let json = 0;

  const getAccount = async () => {
    let token_id = 0;
    let username = 0;

    try {
      token_id = await AsyncStorage.getItem('token');
      // setToken(token_id);
    } catch (e) {
      console.log(e);
    }

    try {
      // await AsyncStorage.setItem('userToken', userToken);
      username = await AsyncStorage.getItem('userName');
      // setUsername(username);
    } catch (e) {
      console.log(e);
    }

    const response = await fetch('http://localhost:5000/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },

    })
    json = await response.json();
    // console.log(" orders::!!!", json);
    setInformationList(json);
  }

  const updateAccount = async () => {
    // console.log("HEYYYY",new_val);
    // console.log("HEYYYY",item_to_update);
    let token_id = 0;
    let username = 0;

    try {
      token_id = await AsyncStorage.getItem('token');
      // setToken(token_id);
    } catch (e) {
      console.log(e);
    }

    try {
      // await AsyncStorage.setItem('userToken', userToken);
      username = await AsyncStorage.getItem('userName');
      // setUsername(username);
    } catch (e) {
      console.log(e);
    }

    const response2 = await fetch('http://localhost:5000/auth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },

      body: JSON.stringify({
        'username': data.username,
        'first_name': data.first_name,
        'last_name': data.last_name,
        'email': data.email,
        'phone': data.phone,
        'address': data.address,
        'password':data.password

      })

    })
    json = await response2.json();
    // console.log("CODEEEE",json.status_code);

  }




  const username_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        username: false,
      });
    } else {
      setData({
        ...data,
        username: val,
        //username:val,
      });
      //Informationlist.username=val;
    }
  }

  const firstname_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        first_name: false,
      });
    } else {
      setData({
        ...data,
        first_name: val,
      });
      // Informationlist.first_name=val;
    }
  }


  const lastname_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        last_name: false,
      });
    } else {
      setData({
        ...data,
        last_name: val,
      });
      // Informationlist.last_name=val;
    }
  }

  const email_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        email: false,
      });
    } else {
      setData({
        ...data,
        email: val,
      });
      // Informationlist.email=val;
    }
  }

  const phone_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        phone: val,
      });
    } else {
      setData({
        ...data,
        phone: val,
      });
      //Informationlist.phone=val;
    }
  }

  const address_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        address: false,
      });
    } else {
      setData({
        ...data,
        address: val,
      });
      //Informationlist.address=val;
    }
  }



  const password_Change = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        password: false,
      });
    } else {
      setData({
        ...data,
        password: val,
      });
      //Informationlist.address=val;
    }
  }



  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 20, marginBottom: 15, flex: 1 }}>
      <ScrollView >
        <Text style={{ marginTop: 25, paddingLeft: 10, fontSize: 25, marginRight: 30, fontWeight: 'bold', color: '#BFA38F' }}>  <Icon2 name='user' size={30} color='black'> </Icon2> My Account </Text>
        <View style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 20 }}>

          <View>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Username:  </Text>
              <Text style={{ fontSize: 18 }}>{Informationlist.username} </Text>
            </Text>

            <Text></Text>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>First Name:  </Text>
              <Text style={{ fontSize: 18 }}>{Informationlist.first_name} </Text>
            </Text>
            <Text></Text>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Last Name:  </Text>
              <Text style={{ fontSize: 18 }}>{Informationlist.last_name} </Text>
            </Text>
            <Text></Text>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Email:   </Text>
              <Text style={{ fontSize: 17 }}>{Informationlist.email} </Text>
            </Text>
            <Text></Text>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Phone Number:  </Text>
              <Text style={{ fontSize: 17 }}>{Informationlist.phone} </Text>
            </Text>
            <Text></Text>
            <Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Address: </Text>
              <Text style={{ fontSize: 17 }}>{Informationlist.address} </Text>
            </Text>

            <View style={{ marginTop: 15, flex: 1 }} >
              <View style={{
                //borderBottomColor: '#BFA38F',
                borderColor: '#BFA38F',
                borderBottomWidth: 5,
                borderEndWidth: 1000,
              }}
              />
              <Text style={{ marginTop: 25, fontSize: 25, fontWeight: 'bold', color: '#BFA38F' }}>  <Icon2 name='edit' size={30} color='black'> </Icon2> Update Information </Text>
              <Text></Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Username"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => username_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New First Name"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => firstname_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Last Name"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => lastname_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Email "
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => email_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Phone Number"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => phone_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Address"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => address_Change(val)}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor='#000000bf'
                  style={styles.textInput}
                  onChangeText={(val) => password_Change(val)}
                />
              </View>

            </View>


          </View>

        </View>
      </ScrollView>

      <Button
        title="Update Information"
        onPress={() => {
          if (data.address !== false) {
            Informationlist.address = data.address;
            updateAccount();
          } if (data.email !== false) {
            Informationlist.email = data.email;
            updateAccount();
          }
          if (data.first_name !== false) {
            Informationlist.first_name = data.first_name;
            updateAccount();
          }
          if (data.last_name !== false) {
            Informationlist.last_name = data.last_name;
            updateAccount();
          }
          if (data.phone !== false) {
            Informationlist.phone = data.phone;
            updateAccount();
          }
          if (data.username !== false) {
            Informationlist.username = data.username;
            updateAccount();
          }
          if (data.password !== false) {
           
            updateAccount();
          }
          else { }
          getAccount();
          alert('Your information is updated!')
        }


        }
      />
    </View>

  );
};

export default AccountInformationScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { width: 45, height: 45, marginBottom: 10 },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { color: '#b1b1b1', marginBottom: 10 },
  price: {
    color: '#7de3bb',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notInStock: { textAlign: 'center' },

  together: {

    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  input: {
    height: 30,
    width: 25,
    margin: 2,
    borderWidth: 0.3,
    fontSize: 15,
    textAlign: 'center'
  },


});
