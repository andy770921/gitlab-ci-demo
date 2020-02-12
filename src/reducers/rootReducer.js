const initState = {
    todos: [
        { content: "Buy some milk", isFinished: false, id: 1 },
        { content: "Play games", isFinished: false, id: 2 },
        { content: "Sleep", isFinished: true, id: 3 }
    ]
};

const rootReducer = (state = initState, action) => {
    let newTodoArray = [];
    switch (action.type) {
        case "DELETE_TODO":
            newTodoArray = state.todos.filter(element => (action.id !== element.id));
            break;
        case "CONFIRM_TODO":
            newTodoArray = state.todos.map(element => {
                if (action.id === element.id) {
                    element.isFinished = true;
                    return element;
                } else { return element; }
            });
            break;
        case "ADD_TODO":
            const newObj = { content: action.newTodoContent, isFinished: false, id: parseInt(Math.random() * 1000000) };
            newTodoArray = [...state.todos, newObj];
            break;
        default:
            return state;
    }

    return {
        ...state,
        todos: newTodoArray
    }
}

export default rootReducer;