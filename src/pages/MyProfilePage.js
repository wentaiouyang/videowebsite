import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import './MyProfilePage.css';


function MyProfilePage() {


    const {currentUser} = useContext(AppContext);
    const [myVids, setMyVids] = useState('');
    const [Bio, setBio] = useState('');

    useEffect(() => {
        const url = 'http://localhost:80/react-backend/profile.php';
        const formData = new FormData;
        formData.append('uploader', currentUser);
        axios.post(url, formData).then((res)=>{
            console.log(res);
            setMyVids(res.data.video);
        }).catch((err)=>console.log(err));

        // get the bio from the database and sent the data to state
        getBio();

    }, []);

    const getBio = () =>{

        const url = 'http://localhost:80/react-backend/profile_get_bio.php';
        const formData = new FormData;
        console.log(currentUser);
        formData.append('username', currentUser);
        axios.post(url,formData).then(
            (res)=>{
                console.log(res.data);
                setBio(res.data.userbio[0].bio);
            }
        ).catch((err)=>console.log(err));

    };
    
    const buttonClick = () => {
        let modal = document.getElementById('myModal');
        modal.style.display = "block";
    };

    const spanClick = () => {
        let modal = document.getElementById('myModal');
        modal.style.display = "none";
    };
   
    const handleSubmit=(e) => {
        e.preventDefault();
        let newBio = e.target.newBio.value;
        console.log(newBio);
        // send the new username to php
        document.getElementById('myModal').style.display = "none";
        const add_bio_url = 'http://localhost:80/react-backend/profile_post_bio.php';
        const formData = new FormData;
        formData.append('newBio',newBio);
        formData.append('username', currentUser);
        axios.post(add_bio_url,formData).then((res)=>console.log(res.data)).catch((err)=>console.log(err));
        // document.getElementById('bio').innerText = newBio;
        getBio();
    };

    return(
        <div className = "profilePage">
            <div className = "welcomeTitle">
                <h1 id = "welcomeTitle">Hi {currentUser}, welcome to your profile!</h1>
                <p id = "bio"> {Bio?Bio:'Write something about yourself...'}</p>
                <button onClick = {buttonClick} id = "resetBtn">Edit Bio</button>
                <form className = "resetWindow" onSubmit={handleSubmit}>
                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onClick = {spanClick}>&times;</span>
                            <input placeholder = "Enter your new new Bio here" name = "newBio"/>
                            <button type="submit">confirm</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className = "vid-row">
                {myVids?Object.values(myVids).map((vid) => {
                    return(
                        <div className="video">
                            <video controls width = '350' autoPlay muted loop src = {vid.url} />
                        </div>
                    );
                }):''}
            </div>
        </div>
    );
    
}

export default MyProfilePage;