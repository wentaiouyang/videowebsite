import React, {Component} from 'react';
import logo from '../images/logo.png'
import './NavBar.css'
import MenuButton from "./HamburgerButton/HamburgerButton";
import ToggleNav from "./ToggleNav/ToggleNav";
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';



class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            open:false,
        };
    }

    handleClick=()=>{
        this.setState((prevState)=>{
            return {open:!prevState.open}
        })
    };


    render() {
        let toggleNav;
        if (this.state.open) {
            toggleNav = <ToggleNav/>
        }
        return (
            <AppContext.Consumer>
                {({auth,resetAuth}) => {
                    return (
                        <div className="newNav">
                            <nav className="nav_bar">
                                <div className="logo_container">
                                    <NavLink to='/'><img className="vids_logo" src={logo} alt="logo"/></NavLink>
                                    <label>VIDS</label>
                                </div>
                                <div className = "btn_container">
                                    {auth?<NavLink to='/'><button className = "login_btn" onClick = {resetAuth}>Logout</button></NavLink>:
                                        <NavLink to='/LoginPage'><button className = "login_btn">Login</button></NavLink>}

                                    {auth? 
                                        <div className="menuBtn">
                                        <   MenuButton open={this.state.open} onClick={this.handleClick}/>
                                        </div>:''}
                                </div>  
                                
                            </nav>
                            <div className="toggleNavContainer">{toggleNav}</div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default NavBar;