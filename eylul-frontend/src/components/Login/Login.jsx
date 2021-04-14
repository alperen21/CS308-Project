import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { IconButton } from '@material-ui/core';
import {useState} from "react";
import { Link } from 'react-router-dom';
import './App.css';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <div>
             <div>
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
                <Link to="/home" onClick={() => login()} >Sign in</Link>
                <IconButton component={Link} to="/home">Don't have an account? Sign up here!</IconButton>
            </Form>
        </div>
        </div>
    )
}

export default Login;