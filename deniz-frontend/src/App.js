import {Button, Form, FormGroup, Input, Label, Container} from 'reactstrap';
import './App.css';
import {useState} from 'react';

//const signUpButton = document.getElementById('signUp');
// const container = document.getElementById('container');

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  
    return (<>
      
	  
	
	<div class="form-container sign-in-container">
		<form action="#">
			<h2>Create Account</h2>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<input type="name" placeholder="Name" value={name}
          onChange={(e) => setName(e.target.value)} />
			<input type="surname" placeholder="Surname" value={surname}
          onChange={(e) => setSurname(e.target.value)} />
			<input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}/>
			<button style={{marginTop: '20px'}}>Sign Up</button>
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
				<p>If you already have an account, click to login!</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
		</div>
	</div>


</>

  );
}

export default App;
