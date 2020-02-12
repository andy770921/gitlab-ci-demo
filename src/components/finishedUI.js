import React from "react";
import TodoUi from "./todoUI";
import { connect } from "react-redux";

const FinishedUi = (props) => {
    
    const filteredTodos = props.todoArray.filter(element => { return element.isFinished === true });
    return (
        <div>
            <h4 className = "center">Finished Todo's</h4>
            <TodoUi todoArray={filteredTodos}/>
        </div>
    );
}

const mapStoreToProps = (state) => {
    return { todoArray : state.todos };
}

export default connect(mapStoreToProps)(FinishedUi);