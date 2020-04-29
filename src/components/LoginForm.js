import React, { Component } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import './LoginForm.css';
import logo from '../images/logo.png'
import axios from 'axios';



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.doLogin=this.doLogin.bind(this);
    }

    setInputValue(property, val) {
        val = val.trim();
        if (val.length > 40) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
        })
    }

    doLogin() {
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        try {
            const {username, password} = this.state;
            let formData = new FormData;
            formData.append("username", username);
            formData.append("password", password);
            const url = 'http://localhost:80/react-backend/login.php';
            axios.post(url,formData).then(res =>{
                console.log(res.data);
                if (res.data==='ok'){
                    this.props.auth();
                    this.props.currentUser(username);
                }
            }).catch(err => console.log(err));
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }
    
    render() {

        return (
            <div className = "loginForm">
                <div className = "signin_title">
                    <img className="title_logo" src={logo} alt="logo"/>
                    <p>Sign in</p>
                    <p>for more features</p>
                </div>
                <div className = "input_container">
                    <label>Username: </label>
                    <InputField 
                        type = 'text'
                        placeholder = 'Username'
                        value = {this.state.username ? this.state.username : ''}
                        onChange = {(val) => this.setInputValue('username', val)}
                    />
                </div>

                <div className = "input_container">
                    <label>Password: </label>
                    <InputField 
                        type = 'password'
                        placeholder = 'Password'
                        value = {this.state.password ? this.state.password : ''}
                        onChange = {(val) => this.setInputValue('password', val)}
                    />
                </div>

                <div className = "btn_row">
                    <SubmitButton 
                        text = 'Register'
                        onClick = {this.props.showSignup}
                    />
                    <SubmitButton 
                        text = 'Login'
                        onClick = {this.doLogin}
                    />
                </div>
            </div>

        );
    }
}

export default LoginForm;