import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon2 from 'react-native-vector-icons/Feather';

const AccountInformationScreen = ({ navigation }) => {
const [Informationlist, setInformationList] = useState([]);

  useEffect(() => {
    getAccount();
  }, []);

  let json =0;
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
    console.log(" orders::!!!", json);
    setInformationList(json);
  }

  

  const renderItem = ({ item }) => {
    return (
<View>
      <View style={{ flexDirection: 'row', marginVertical: 40, paddingHorizontal: 20 }}>
        
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Username: {item.username} </Text>
          <Text style={{ fontSize: 17 }}>First Name :{item.first_name} </Text>
          <Text style={{ fontSize: 17 }}>Last Name :{item.last_name} </Text>
          <Text style={{ fontSize: 17 }}>Email address :{item.email} </Text>
          <Text style={{ fontSize: 17 }}>Phone Number :{item.phone} </Text>
          <Text style={{ fontSize: 17 }}>Address :{item.address} </Text>
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          <View style={styles.together}>
          <Button
              title="Change"
              onPress={() => alert()}  //navigate
            />
            
          </View>


        </View>
        
      </View>
      <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/>
      
       </View>

    )

  };

  return (
    <ScrollView style={{ paddingVertical:10 ,flex: 1 }}>
        <Text style={{ marginTop: 25, paddingLeft:10,fontSize: 25, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}>  <Icon2 name='user' size={30} color= 'black'> </Icon2> My Account </Text>
        <View style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 20 }}>
        
        <View>
            <Text>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Username:  </Text>
                <Text style={{ fontSize: 18 }}>{Informationlist.username} </Text>
            </Text>
                   
          {/* <View style={{
            //borderBottomColor: '#BFA38F',s
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}
                <Text></Text>
          <Text>
          <Text style={{ fontSize: 20 , fontWeight: '600'}}>First Name:  </Text>
          <Text style={{ fontSize: 18 }}>{Informationlist.first_name} </Text>
          </Text>
          {/* <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}
          <Text></Text>
          <Text>
          <Text style={{ fontSize: 20,  fontWeight: '600' }}>Last Name:  </Text>
          <Text style={{ fontSize: 18 }}>{Informationlist.last_name} </Text>
          </Text>
          {/* <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}

          <Text></Text>
          <Text>
          <Text style={{ fontSize: 20 ,fontWeight: '600'}}>Email address:  </Text>
          <Text style={{ fontSize: 17 }}>{Informationlist.email} </Text>
          </Text>
          {/* <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}
          <Text></Text>
          <Text>
          <Text style={{ fontSize: 20 ,fontWeight: '600'}}>Phone Number:  </Text>
          <Text style={{ fontSize: 17 }}>{Informationlist.phone} </Text>
          </Text>
          {/* <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}
          <Text></Text>
          <Text>
          <Text style={{ fontSize: 20 ,fontWeight: '600'}}>Address: </Text>
          <Text style={{ fontSize: 17 }}>{Informationlist.address} </Text>
          </Text>
          {/* <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 2,
						borderEndWidth: 1000,
					}}
				/> */}
          {/* <Text style={{fontSize:18}}> Rating: {item.rating }</Text> */}
          
          <View style={{ marginTop: 15,flex: 1 }} >
          <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 5,
						borderEndWidth: 1000,
					}}
				/> 
        <Text style={{ marginTop: 25,fontSize: 25 ,fontWeight: 'bold', color: '#BFA38F'  }}>  <Icon2 name='edit' size={30} color= 'black'> </Icon2> Update Information </Text>

          <Button
              title="Update Information"
              onPress={() => alert()}  //navigate
            />
            
          </View>


        </View>
        
      </View>
     
  

    </ScrollView>
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


});
