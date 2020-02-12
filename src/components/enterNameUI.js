import React, { Component } from "react";
import { connect } from "react-redux";

class EnterNameUi extends Component {
    state = {
        inputValue: ""
    }

    handleChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.inputValue !== "") {
            this.props.addUserRedux(this.state.inputValue);
            alert(" 報名成功 ");
            this.setState({inputValue: ""});
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="flex-container-row container">
                <div className="flex-container-column flex-3">
                <label>Enter Your Name:</label>
                <input type="text" className="margin-0" id="name-text" onChange={this.handleChange}/>
                </div>
                <button className="btn waves-effect waves-light flex-end chinese-font flex-1"> 報名參賽 </button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return { addUserRedux : newUser => { dispatch({ type: "ADD_USER", newUser : newUser })}};
}

export default connect(null, mapDispatchToProps)(EnterNameUi);