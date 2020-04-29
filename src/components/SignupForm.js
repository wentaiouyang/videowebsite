import React, { Component } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import './SignupForm.css';
import logo from '../images/logo.png';
import axios from 'axios';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmpass:'',
            buttonDisabled: false,
        }
        this.doSignup=this.doSignup.bind(this);
    }

    setInputValue(propperty,val){
        val = val.trim();
        if (val.length > 40){
            return;
        }
        this.setState({
            [propperty]:val
        })
    }

    resetForm() {
        this.setState({
            username:'',
            password:'',
            confirmpass:'',
            buttonDisabled: false
        })
    }

    doSignup() {

        if (!this.state.username){
            return;
        }
        if (!this.state.password){
            return;
        }
        if (!this.state.confirmpass){
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try{
            const {username,password,confirmpass} = this.state;
            let formData = new FormData;
            formData.append("username", username);
            formData.append("password", password);
            if (confirmpass===password){
                const url = 'http://localhost:80/react-backend/signup.php';
                axios.post(url,formData).then(res =>{
                    if(res.data==='success'){
                        alert('Signup succeed');
                        this.resetForm();
                    }
                }).catch(err => console.log(err));
                
            }else{
                alert('please confirm your password ')
            }
        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

render() {
    return (
        <div className = "signupForm">
            <div className = "register_title">
                <img className="title_logo" src={logo} alt="logo"/>
                <p>Welcome to join ^ ^</p>
                <p>Create new account here</p>
            </div>
            <div className = "input_container">
                <label>Username: </label>
                <InputField 
                    type = 'text'
                    placeholder = 'Username'
                    value={this.state.username ? this.state.username:''}
                    onChange={(val)=>this.setInputValue('username',val)}
                />
            </div>

            <div className = "input_container">
                <label>&nbsp;Password: </label>
                <InputField 
                    type = 'password'
                    placeholder = 'Password'
                    value={this.state.password ? this.state.password:''}
                    onChange={(val)=>this.setInputValue('password',val)}
                />
            </div>

            <div className = "input_container">
                <label>&nbsp;&nbsp;Confirm:&nbsp;&nbsp;</label>
                <InputField 
                    type = 'password'
                    placeholder = 'Re-enter Password'
                    value={this.state.confirmpass ? this.state.confirmpass:''}
                    onChange={(val)=>this.setInputValue('confirmpass',val)}
                />
            </div>

            <div className = "btn_row">
                <SubmitButton 
                    text = 'Submit'
                    onClick = {this.doSignup}
                />
                <SubmitButton 
                    text = 'Cancel'
                    onClick = {this.props.hideSignup}
                />
            </div>
        </div>

    );
}
}

export default SignupForm;
