import React, {Component} from 'react';
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import { AppContext } from '../context/AppContext';
import whiteStar from '../images/star_white.png'
import blackStar from '../images/star_black.png'
import axios from 'axios';
import './VidPlayPage.css';
import { NavLink } from 'react-router-dom';


class VidPlayPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
          comments: [],
          favorite: false,
            v_id :this.props.match.params.id,
        }
      }

    componentDidMount() {
        console.log('vid:'+this.state.v_id);
        var vid = document.getElementsByClassName("vidInList");
        [].forEach.call(vid, function (item) {
            item.addEventListener('mouseover', hoverVideo, false);
            item.addEventListener('mouseout', hideVideo, false);
        });
        function hoverVideo(e){   
            this.play();
        }
        function hideVideo(e){
            this.pause();
        }
        const formData = new FormData;
        formData.append('videoid',this.state.v_id);
        const com_url = 'http://localhost:80/react-backend/getcomments.php'
        axios.post(com_url,formData).then((res)=>{
            console.log(res.data);
            this.setState({comments:res.data.comments})
        }).catch((err)=>console.log(err));
    }


    handleSubmitComment (comment) {
        if (!comment.content) return alert('The comments cannot be empty! Please enter your comments.');
        const formData = new FormData;
        console.log(comment.username,comment.content);
        formData.append('user',comment.username);
        formData.append('content',comment.content);
        formData.append('videoid',this.state.v_id);
        const url = 'http://localhost:80/react-backend/addcomments.php';
        axios.post(url, formData).then((res)=>{
            console.log(res);
        }).catch((err)=>console.log(err));

        setTimeout(()=>{
            const formData = new FormData;
            formData.append('videoid',this.state.v_id);
            const com_url = 'http://localhost:80/react-backend/getcomments.php'
            axios.post(com_url,formData).then((res)=>{
                console.log(res.data);
                this.setState({comments:res.data.comments})
            }).catch((err)=>console.log(err));
            },500
        );
        // this.state.comments.push(comment);
        // this.setState({
        //   comments: this.state.comments
        // })

    }

    handleFavorite = () => {
        this.setState({favorite:!this.state.favorite});
    };

    render(){

        return (
            <AppContext.Consumer>
                {({videos})=>{
                    let video = videos[this.state.v_id-1];
                    const vid_list = [
                        {url:'https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_sky.mp4'},
                        {url:'https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_fire.mp4'},
                        {url:'https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_trees.mp4'},
                        {url:'https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_beer.mp4'},
                    ];
                    return(
                        <div className = "vidPlayPage">
                            <div className = "vidNComments">
                                <div className = "vidPlayWindow">
                                    {video?<video width = "800" height = "450" controls autoPlay src = {video.url} />:''}
                                </div>
                                <div className = "vidDescription">
                                    <div>
                                        <h2>Description</h2>
                                        {video?<p>{video.description}</p>:''}
                                    </div>
                                    <div>
                                        <div className = "collectIcon">
                                            {this.state.favorite?
                                            <img id = "starIcon" src = {blackStar} width = "25" onClick = {this.handleFavorite} />:
                                            <img id = "starIcon" src = {whiteStar} width = "25" onClick = {this.handleFavorite} />
                                            }
                                            Favorite
                                        </div>
                                    </div>
                                </div>
                                <div className = "commentsArea">
                                    <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                                    <CommentList comments={this.state.comments} />
                                </div>
                            </div>
                            <div className = "vidsList">
                                {vid_list.map((vid, index)=>{
                                    return(
                                        <NavLink to={`/video/${vid.id}`} activeStyle={{textDecoration:'none'}}>
                                            <video muted className = "vidInList" width = "250" height = "140" src = {vid.url} />
                                        </NavLink>
                                    )
                                })}
                                
                                {/* <video width = "250" height = "140" src = "https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_sky.mp4" />
                                <video width = "250" height = "140" src = "https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_bird.mp4" />
                                <video width = "250" height = "140" src = "https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_bird.mp4" />
                                <video width = "250" height = "140" src = "https://wis7202.s3-ap-southeast-2.amazonaws.com/vid_bird.mp4" /> */}
                            </div>
                        </div>
                    )
                }}
            </AppContext.Consumer>
        );
    }
}

export default VidPlayPage;