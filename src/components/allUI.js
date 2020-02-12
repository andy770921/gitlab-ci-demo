import React from "react";
import TodoUi from "./todoUI";
import { connect } from "react-redux";

const AllUi = (props) => {
    return (
        <div>
            <h4 className="center"> All Todo's </h4>
            <TodoUi todoArray={props.todoArray} />
        </div>
    )
}

const mapStoreToProps = (state) => {
    return { todoArray: state.todos };
}

export default connect(mapStoreToProps)(AllUi);