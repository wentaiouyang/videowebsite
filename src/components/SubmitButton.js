import React, { Component } from 'react';
import './SubmitButton.css';

class SubmitButton extends Component {
    render() {
        return (
            <div className = "submitButton">
                <button className = "submit_btn" disabled = {this.props.disabled} onClick = {this.props.onClick}>
                    {this.props.text}
                </button>
                
            </div>
        );
    }
}

export default SubmitButton;