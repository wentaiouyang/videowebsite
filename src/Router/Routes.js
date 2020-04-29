import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import VidPlayPage from '../pages/VidPlayPage';
import UploadPage from '../pages/UploadPage';
import CollectionPage from '../pages/CollectionPage';
import LoginPage from '../pages/LoginPage';
import MyProfilePage from '../pages/MyProfilePage';
import ScrollToTop from '../components/ScrollToTop';
import { AppContext } from '../context/AppContext';



class Routes extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render() {
        return (
            <AppContext.Consumer>
                {({auth}) => {
                    return (
                        <ScrollToTop>
                            <Switch>
                                <Route path='/' exact component={LandingPage}/>
                                <Route path='/video/:id' exact component={VidPlayPage}/>
                                <Route path='/UploadPage' exact component={UploadPage}/>
                                <Route path='/MyProfilePage' exact component={MyProfilePage}/>
                                <Route path='/CollectionPage' exact component={CollectionPage}/>
                                <Route path='/LoginPage' exact component={LoginPage}>
                                    {auth?<Redirect to="/"/>:''}
                                </Route>
                                <Redirect from='/*' to='/' />
                            </Switch>
                        </ScrollToTop>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default Routes;