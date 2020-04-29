import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Routes from "./Router/Routes";
import { AppContext } from './context/AppContext';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list:'',
      auth: false,
      currentUser: ''
    }
  }



  // componentWillMount(){
  //   window.addEventListener('scroll', this.loadMore);
  // }
  
  // componentWillUnmount(){
  //     window.removeEventListener('scroll', this.loadMore);
  // }
  
  // loadMore(){
  //     if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
  //         // Do load more content here!
  //     }
  // }

  componentDidMount() {
    const url = 'http://localhost:80/react-backend/index.php';
    axios.get(url)
        .then((res)=>{
            this.setState({list:res.data.video});
            console.log(res.data);
        })
        .catch((err)=>console.log(err));
        // const session_url = 'http://localhost:80/react-backend/session_config.php';
        // axios.get(session_url)
        //     .then((res)=>{
        //       this.setState({auth:res.data});
        //       console.log(res.data);
        //     })
        //     .catch((err)=>console.log(err));
        // console.log(this.state.auth);

  }

  // componentDidUpdate(){
  //
  // }

  setAuth = () => {
    this.setState({auth: true})
  };

  resetAuth = () => {
    this.setState({auth: false});
    // const resetState = false;
    const formData = new FormData;
    formData.append('status',false)
    const session_url = 'http://localhost:80/react-backend/logout.php';
    axios.post(session_url, formData).then((res)=>{
      console.log(res.data)
    }).catch((err)=>console.log(err));
  };

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  render(){
    return (
      <BrowserRouter>
        <AppContext.Provider  
        value = {
          {
            auth: this.state.auth,
            videos: this.state.list,
            setAuth: this.setAuth,
            resetAuth: this.resetAuth,
            currentUser: this.state.currentUser,
            setCurrentUser: this.setCurrentUser
          }
          }>
            <div className="App site">
              <NavBar/>
              <Routes/>
            </div>
        </AppContext.Provider>
      </BrowserRouter>      
    );}
}
  


export default App;
