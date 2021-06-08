import React from 'react';
import {useState} from 'react';
import { useHistory } from 'react-router';
import "./Register.css";

export const Register = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const hist = useHistory();
  const register = async() => {
	  const response = await fetch ('http://localhost:5000/users', {
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/json'
		  },

		  body : JSON.stringify({
            first_name: name,
			last_name: surname,
            username: username,
			password: password,
            email: email,
            phone: phoneNumber,
            address: address
		  })
	  })
	  let json = await response.json();
	  console.log(json);
	  if (json.status_code === 200){
		  hist.push("/home");
	  }
	  else {
		  alert("error");
	  }
  }
  const tologin = async() => {
	hist.push("/");
}
  
    return (<div>
	
    <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form action="#">
                <h2>Create Account</h2>
                <input style ={{marginTop: '3px'}} type="name" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="surname" placeholder="Surname" value={surname}
            onChange={(e) => setSurname(e.target.value)} />
            <input style ={{marginTop: '3px'}} type="username" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
                <input style ={{marginTop: '3px'}} type="number" placeholder="Phone Number" value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="address" placeholder="Address" value={address}
            onChange={(e) => setAddress(e.target.value)}/>
                
                <button style={{marginTop: '3px'}} onClick={() => register()}>Sign Up!</button>

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
                        <p>If you already have an account, click to sign in!</p>
                        <button onClick={() => tologin()} class="ghost" id="signIn">Sign In</button>
                    </div>
                </div>
            </div>
        </div>

</div>

  );
}

export default Register;