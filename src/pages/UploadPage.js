import React, {useState, useContext} from 'react';
import './UploadPage.css'
import ReactS3 from 'react-s3';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const config = {
    // bucketName: 'wis7202',
    // // dirName: 'photos', /* optional */
    // region: 'ap-southeast-2',

};


function UploadPage () {

    const [state, setState] = useState({
        video_url:'',
        buttonDisabled:true,
    });


    const {currentUser} = useContext(AppContext);

    const upload = (e) => {
        console.log('kkk');
        let upload_video = e.target.files[0];
        console.log(upload_video);
        ReactS3.uploadFile(upload_video,config)
            .then((data) => {
                alert('loading succeed');
                setState({buttonDisabled:false,video_url:data.location});
                document.getElementById('showFileName').innerText = upload_video.name;
            })
            .catch((err) => {console.log(err)});
            
    }

    const handleSubmit=(e) => {
        e.preventDefault();
        let description = e.target.description.value;
        let title = e.target.title.value;
        console.log(description);
        // send the video url to php
        const url = 'http://localhost:80/react-backend/upload.php';
        const formData = new FormData;
        formData.append("title", title);
        formData.append("video_upload", state.video_url);
        formData.append("description", description);
        formData.append("uploader", currentUser);
        axios.post(url,formData).then((res)=>{console.log(res)}).catch((err)=>console.log(err));
        alert('Congrats! You have published successfully.');
    };


    return(
        <form className = "uploadPage" onSubmit={handleSubmit}>
            <div className = "uploadBox">
                <span>Please click Select File <br/> OR <br/>Drag your file here to upload</span>
                <a class="uploadBtn">
                    Select File
                    <input class="change" accept = "video/mp4" type="file" multiple="multiple" onChange = {upload}/>
                </a>          
                <p id='showFileName'>uploaded file</p>
            </div>
            
            <label>Title</label>
            <input className = "titleBox" placeholder = "Add a title for your video..." name = "title"/>

            <label>Description</label>
            <textarea className = "descriptionBox" placeholder = "Add descriptions for your video..." name = "description"/>

            <input type="submit" value="Publish" className = "descriptionUpload" disabled = {state.buttonDisabled}/>
        </form>
    )
    }


export default UploadPage;