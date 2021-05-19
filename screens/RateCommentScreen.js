import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image ,TextInput} from 'react-native';
import { Button } from './Products/Button';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon2 from 'react-native-vector-icons/Feather';

const RateCommentScreen = ({ navigation,route }) => {
const [Informationlist, setInformationList] = useState([]);
const { itemName,itemImage } = route.params;

const [data, setData] = React.useState({
    comment: 0,
    rate:0,
  });

  useEffect(() => {
    giveComment();
  }, []);

  let json =0;

  const giveComment = async (user_comment) => {
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

    const response = await fetch('http://localhost:5000/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        user: username,
        token: token_id,

      },
      body: JSON.stringify({
        comment: user_comment,
        product_name: itemName,
      })

    })
     json = await response.json();
   // console.log(" orders::!!!", json);

  }


    
   

  const comment_Change = (val) => {
    if( val.length === 0 ) {
      setData({
        ...data,
        username: false,
    });
  } else {
    setData({
      ...data,
      comment: val,

  }); 
  }
}


  return (
      <View style={{ paddingHorizontal:5 ,paddingVertical:20 ,marginBottom:15, flex: 1 }}>
    <ScrollView >
        <Text style={{ marginTop: 25,fontSize: 20, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}> Give Comment for {itemName} </Text>
        <Image style={styles.image}
          source={{
            uri: itemImage
          }} />
        
     <View>
        
        <Text></Text>
          
          <View style={{ flex: 1 }} >
          <View style={{
            //borderBottomColor: '#BFA38F',
            borderColor: '#BFA38F',
						borderBottomWidth: 5,
						borderEndWidth: 1000,
					}}
				/> 
        <Text></Text>
        <View style={styles.action}>
        <TextInput 
                    placeholder="Enter Your Comment for this product" 
                    placeholderTextColor='#000000bf'
                    style={styles.textInput}   
                    onChangeText={(val) =>comment_Change(val)}          
        />
      </View>
     
      </View>

 </View>
            <Button 
              title="Give Comment"
              onPress={() => { giveComment(data.comment)
              alert("Your comment is sent for approval!")} }
            />
        
  
      </ScrollView>
     

    </View>
    
  );
};

export default RateCommentScreen;


const styles = StyleSheet.create({
  container: {
    shadowColor: '#cdcdcd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  image: { alignSelf:'center' ,width: 200, height: 200, marginBottom: 10,marginTop:15 },
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
      },


});
