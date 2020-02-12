import React from "react";
import { connect } from "react-redux";

const TodoUi = (props) => {
    
    const todoList = props.todoArray.length ? (
        props.todoArray.map( element => { 
            return (
            <div className = "collection-item pos-relative content-font-size" key = { element.id }>
                <span style= {element.isFinished === true ? {color: 'limeGreen'} : {color: 'black'}}>{ element.content }</span>
                    <div className="cross" onClick = { () => props.deleteTodoRedux(element.id) }></div>
                    {(element.isFinished === false) ? (<div className="victor" onClick = { () => props.confirmTodoRedux(element.id) }></div>) : ( null )}
            </div> )})
    ) : (
        <p className = "center"> You have no todo's left </p>
    );
    return (
        <div className = "todo-list collection">
            { todoList }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return { deleteTodoRedux : id => { dispatch({ type: "DELETE_TODO", id : id })},
             confirmTodoRedux: id => { dispatch({ type: "CONFIRM_TODO", id : id })}   
            };
}


export default connect(null, mapDispatchToProps)(TodoUi);