import React, {Component, useContext, useEffect, useState} from 'react';
import './CommentInput.css';
import {AppContext} from "../context/AppContext";

function CommentInput(props) {
    const [state, setState] = useState(
        {
            username:undefined,
            content: ''
        }
    );

    const user = useContext(AppContext).currentUser;

    // useEffect(()=>{
    //     setState({username:user})
    // },[]);

    //   handleUsernameChange (event) {
    //     this.setState({
    //       username: event.target.value
    //     })
    //   }

    const handleContentChange = (event) => {
        setState({
            username: user,
            content: event.target.value
        })
    };

    const handleSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit({
                username: state.username,
                content: state.content
            })
        }
        console.log(state.username);
        setState({content: ''})
    };


    return (
        <div className="commentInput">
            <div className='comment-field'>
                <span className='comment-field-name'>Add Public Comments：</span>
                <div className='comment-field-input'>
                        <textarea
                            placeholder="Please leave your own comments here :)"
                            value={state.content}
                            onChange={handleContentChange}
                        />
                </div>
            </div>
            <div className='comment-field-button'>
                <button onClick={handleSubmit}>
                    POST
                </button>
            </div>
        </div>
    );
}



export default CommentInput;