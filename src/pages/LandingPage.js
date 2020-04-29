import React, {Component} from 'react';
import './LandingPage.css';
import Search from "../components/SearchBar";

class LandingPage extends Component {
    render(){
        return (
            <div className = "landingPage">

                <div className = "searchBar">
                <Search/>
                </div>

                


            </div>
        );
    }
}

export default LandingPage;