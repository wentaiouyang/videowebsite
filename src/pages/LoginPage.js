import React, {Component} from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import './LoginPage.css'
import { AppContext } from '../context/AppContext';


class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            signup: false
        };
        this.showSignup = this.showSignup.bind(this);
        this.hideSignup = this.hideSignup.bind(this);
    };

    showSignup() {
        this.setState({signup:true})
    };
    hideSignup() {
        this.setState({signup:false})
    };

    render() {
        
        return (
            <AppContext.Consumer>
                {({setAuth,setCurrentUser})=>{
                    return(
                        <div className = "loginPage">
                            <div className = "container">
                                {this.state.signup?<SignupForm hideSignup={this.hideSignup}/>:<LoginForm showSignup={this.showSignup} auth={setAuth} currentUser = {setCurrentUser}/>}
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default LoginPage;