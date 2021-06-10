import React from 'react';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"; 

const Profile = () => {
    const history = useHistory();
    const [Informationlist, setInformationList] = useState([]);
    let userType =  Cookies.get('userType');
    const [data, setData] = React.useState({
    
        username: Informationlist.username,
        first_name: Informationlist.first_name,
        last_name: Informationlist.last_name,
        email: Informationlist.email,
        phone: Informationlist.phone,
        address:Informationlist.address,
        //password: false,
    });
    

    useEffect(() => {
    
    getAccount();
    }, []);

    let json =0;

    const getAccount = async () => {
        let token_id = 0;
        let username = 0;
        
        try {
            token_id = await Cookies.get('token');
            
            //setToken(token_id);
            console.log(token_id)
        } catch (e) {
            console.log(e);
        }
        
        try {
            // await AsyncStorage.setItem('userToken', userToken);
            username = await Cookies.get('userName');
            console.log(username)
            //setUsername(username);
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
            console.log(json)
        // console.log(" orders::!!!", json);
        setInformationList(json);
        }

        const updateAccount = async () => {
            //console.log("HEYYYY",new_val);
            //console.log("HEYYYY",item_to_update);
            let token_id = 0;
            let username = 0;
        
            try {
              token_id = await Cookies.get('token');
              // setToken(token_id);
            } catch (e) {
              console.log(e);
            }
        
            try {
              // await AsyncStorage.setItem('userToken', userToken);
              username = await Cookies.get('userName');
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
                  'phone':data.phone,   
                'address': data.address,
                
                })
        
            })
            json = await response2.json();
            // console.log("CODEEEE",json.status_code);
        
          }

    const username_Change = (val) => {
        //console.log(val.target.value)
        if( val.length === 0 ) {
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
        if( val.length === 0 ) {
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
        if( val.length === 0 ) {
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
        if( val.length === 0 ) {
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
        if( val.length === 0 ) {
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
        if( val.length === 0 ) {
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
    const toPm = async() => {
        history.push("/pm_page");
    }

    const toAddProduct = async() => {
        history.push("/add_product");
    }
    const toChart = async() => {
        history.push("/chart");
    }
    
    return (
        <div style={{ paddingHorizontal:5 ,paddingVertical:20 ,marginBottom:15, flex: 1 }}>
        <div >
            <text style={{ marginTop: 25, paddingLeft:10,fontSize: 25, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}>  <icon name='user' size={30} color= 'black'> </icon> My Account </text>
            <div style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 20 }}>
            
            <div>
                <text>
                    <text style={{ fontSize: 20, fontWeight: '600' }}>Username:  </text>
                    <text style={{ fontSize: 18 }}>{Informationlist.username} </text>
                </text>

            <div></div>
            <div>
            <div style={{ fontSize: 20 , fontWeight: '600'}}>First Name:  </div>
            <div style={{ fontSize: 18 }}>{Informationlist.first_name} </div>
            </div>
            <div></div>
            <div>
            <div style={{ fontSize: 20,  fontWeight: '600' }}>Last Name:  </div>
            <div style={{ fontSize: 18 }}>{Informationlist.last_name} </div>
            </div>
            <div></div>
            <div>
            <div style={{ fontSize: 20 ,fontWeight: '600'}}>Email:   </div>
            <div style={{ fontSize: 17 }}>{Informationlist.email} </div>
            </div>
            <div></div>
            <div>
            <div style={{ fontSize: 20 ,fontWeight: '600'}}>Phone Number:  </div>
            <div style={{ fontSize: 17 }}>{Informationlist.phone} </div>
            </div>
            <div></div>
            <div>
            <div style={{ fontSize: 20 ,fontWeight: '600'}}>Address: </div>
            <div style={{ fontSize: 17 }}>{Informationlist.address} </div>
            </div>
        
            <div style={{ marginTop: 15,flex: 1 }} >
            <div style={{
                //borderBottomColor: '#BFA38F',
                borderColor: '#BFA38F',
                            borderBottomWidth: 5,
                            borderEndWidth: 1000,
                        }}
                    /> 
            <div style={{ marginTop: 25,fontSize: 25 ,fontWeight: 'bold', color: '#BFA38F'  }}>  <icon name='edit' size={30} color= 'black'> </icon> Update Information </div>
            <div></div>
            <div >
            <input 
                        placeholder="Enter New Username"
                        placeholderTextColor='#000000bf'
                            
                        onChange={(val) =>username_Change(val.target.value)}          
            />
        </div>
        <div >
            <input 
                        placeholder="Enter New First Name"
                        placeholderTextColor='#000000bf'
                            
                        onChange={(val) => firstname_Change(val.target.value)}          
            />
        </div>
        <div >
            <input 
                        placeholder="Enter New Last Name"
                        placeholderTextColor='#000000bf'
                            
                        onChange={(val) => lastname_Change(val.target.value)}          
            />
        </div>
        <div >
            <input 
                        placeholder="Enter New Email "
                        placeholderTextColor='#000000bf'
                        
                        onChange={(val) => email_Change(val.target.value)}          
            />
        </div>
        <div >
            <input 
                        placeholder="Enter New Phone Number"
                        placeholderTextColor='#000000bf'
                        
                        onChange={(val) => phone_Change(val.target.value)}          
            />
        </div>
        <div >
            <input 
                        placeholder="Enter New Address"
                        placeholderTextColor='#000000bf'
                        
                        onChange={(val) => address_Change(val.target.value)}          
            />
        </div>
            
            </div>


            </div>
            
        </div>
        </div>
                <br>
                </br>
        <Button style={{marginLeft:20}}
                title="Update inff"
                onClick={() => {
                    if (data.address !==false ) {
                        Informationlist.address=data.address;
                        updateAccount();
                    }if (data.email !==false ){
                        Informationlist.email=data.email;
                        updateAccount();
                    }
                    if (data.first_name !==false){
                        Informationlist.first_name=data.first_name;
                        updateAccount();
                    }
                    if (data.last_name !==false){
                        Informationlist.last_name=data.last_name;
                        updateAccount();
                    }
                    if (data.phone !==false){
                        Informationlist.phone=data.phone;
                        updateAccount();
                    }
                    if (data.username !==false){
                        Informationlist.username=data.username;
                        updateAccount();
                    }
                    else{ }
                    getAccount();
                    alert('Your information is updated!')
                }
                }
                > Update Info </Button>
                <br>
                </br>
                <br>
                </br>
                {userType==="undefined" && <Link to="/orders" style={{ marginTop: 25, paddingLeft:10,fontSize: 25, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}>  <icon name='user' size={30} color= 'black'> </icon> See Previous Orders </Link>}
                <br></br>

                
                {userType==="product manager" &&<text style={{ marginTop: 25, paddingLeft:10,fontSize: 25, marginRight: 30,fontWeight: 'bold', color: '#BFA38F'  }}>  <icon name='user' size={30} color= 'black'> </icon> Managerial Opeartions </text>}
                <br></br>
                {userType==="product manager" && <Button onClick={() => toPm()}> All Orders </Button>}

                {userType==="product manager" && <button onClick={() => toAddProduct()} style={{marginLeft:70}} > Add New Product </button>}

                {userType==="sales manager" && <Button onClick={() => toChart()}> Sales Manager Operations </Button>}
        </div>
    );
};
export default Profile;