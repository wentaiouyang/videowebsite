import React, { Component } from 'react'
import './Comment.css';

class Comment extends Component {
  render () {
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>{this.props.comment.username} </span>：
        </div>
        <p>{this.props.comment.comment}</p>
      </div>
    )
  }
}

export default Comment