import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './App.css';
import {useState} from "react";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

  return (
    <div className="container" >
        <h2>Log in</h2>
        <Form>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormGroup>
            <a href="#">Forgot your password?</a>

            <Button onClick={() => login()}>Log In</Button>
        </Form>
    </div>
  );
}

export default App;
