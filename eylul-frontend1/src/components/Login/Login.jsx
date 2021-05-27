import React from 'react';
import { Label } from 'reactstrap';
import {useState} from "react";
import { Link } from 'react-router-dom';
import './App.css';
import { useHistory } from "react-router-dom"; 
import Cookies from 'js-cookie'

const Login = () => {
    const history = useHistory();
    const [data, setData] = React.useState({
        token:'',
        username: '',
        password: '',
       
    });

    //const { signIn } = React.useContext(AuthContext);

    const login = async () => {
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
            //signIn(data.username, data.token);
            // ProfileScreen();
            Cookies.set("userName", data.username)
            Cookies.set("token", data.token)
            history.push("/home");
            window.location.reload(false);
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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const toRegister = async() => {
        history.push("/register");
    }

    const toHome = async() => {
        history.push("/home");
    }

    return (
            <div class="container" id="container">
                <div class="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                            <Label for="exampleUsername">Username</Label>
                            <input type="username" name="username" id="exampleUsername" value={data.username} placeholder="Username"onChange={(e) => setData({
                                                                                                                                                            ...data,
                                                                                                                                                            username: e.target.value,
                                                                                                                                                          
                                                                                                                                                        })}/>
                        
                            <Label for="examplePassword">Password</Label>
                            <input type="password" name="password" id="examplePassword" placeholder="Password" value={data.password}onChange={(e) => setData({
                                                                                                                                                            ...data,
                                                                                                                                                            password: e.target.value,
                                                                                                                                                
                                                                                                                                                        })}/>
                        
                        <li><Link onClick={() => login()} >Sign in</Link></li>
                        <Link onClick={() => toHome()} style={{marginTop: '5px'}}   >or continue as guest </Link>
                    </form>
                </div>
                <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button onClick={() => toRegister()} class="ghost" id="signIn">Sign Up</button>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default Login;