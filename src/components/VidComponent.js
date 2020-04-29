import React, {Component} from 'react';
import './VidComponent.css'
import { NavLink } from 'react-router-dom';

class VidComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div className = "vid-row">
                {this.props.source?this.props.source.map((video,index)=>{
                    return(
                        <div className = "video">
                            <NavLink to={`/video/${video.item.id}`} activeStyle={{textDecoration:'none'}}>
                                <video width = "350" muted autoPlay loop src={video.item.url} />
                            </NavLink>
                            <NavLink className = "vidTitle" to={`/video/${video.item.id}`}>
                                <p >{video.item.title}</p>
                            </NavLink>
                        </div>
                    )
                }):''}
            </div>
        );
    }
}

export default VidComponent;