
const initState = {
    block: [
        { position: "1x1", value: 1, id: 101 },
        { position: "1x2", value: 2, id: 102 },
        { position: "1x3", value: 3, id: 103 },
        { position: "2x1", value: 4, id: 104 },
        { position: "2x2", value: 5, id: 105 },
        { position: "2x3", value: 6, id: 106 },
        { position: "3x1", value: 7, id: 107 },
        { position: "3x2", value: 99, id: 108 },
        { position: "3x3", value: 8, id: 109 }
    ],
    rankList: [
        { name: "Teresa", times: 9, id: 1001 },
        { name: "Josh", times: 11, id: 1002 },
        { name: "Rita", times: 10, id: 1003 },
        { name: "Crystal", times: 2, id: 1004 }
    ],
    user: { name: "unknown", times: 0, id: 10001 }
};

const gameReducer = (state = initState, action) => {
    let finalState = {};
    let newBlockArray = [];
    let newRankArray = [];
    let newUserObj = {};
    switch (action.type) {
        case "ADD_USER":
            const newObj = { name: action.newUser, times: state.user.times, id: parseInt(Math.random() * 10000000) };
            finalState = {
                ...state,
                user: newObj
            }
            break;
        case "ADD_RANK":
            newRankArray = [...state.rankList, state.user];
            finalState = {
                ...state,
                rankList: newRankArray
            }
            break;
        case "SET_ADJ":
            state.block.forEach(element => (element.isAdjacent = false));
            for (let i = 0; i < action.adjPositionArray.length; i++) {
                newBlockArray = state.block.map(element => {
                    if (action.adjPositionArray[i] === element.position) {
                        element.isAdjacent = true;
                        return element;
                    } else { return element; }
                });
            }
            finalState = {
                ...state,
                block: newBlockArray
            }
            break;
        case "SHUFFLE":
            const emptyValue = state.block.find(element => (element.position === action.emptyPosition)).value;
            const targetValue = state.block.find(element => (element.position === action.targetPosition)).value;
            let copiedState = Object.assign({}, state);
            newBlockArray = copiedState.block.map(element => {
                if (element.position === action.emptyPosition) {
                    element.value = targetValue;
                    return element;
                } else if (element.position === action.targetPosition) {
                    element.value = emptyValue;
                    return element;
                } else { return element; }
            });
            newUserObj = { name: state.user.name, times: state.user.times + 1, id: state.user.id };

            finalState = {
                ...state,
                block: newBlockArray,
                user: newUserObj
            }
            break;
        case "RESET":
            newUserObj = { name: state.user.name, times: 0, id: parseInt(Math.random() * 10000000) };
            finalState = {
                ...state,
                block: [
                    { position: "1x1", value: 1, id: 101 },
                    { position: "1x2", value: 2, id: 102 },
                    { position: "1x3", value: 3, id: 103 },
                    { position: "2x1", value: 4, id: 104 },
                    { position: "2x2", value: 5, id: 105 },
                    { position: "2x3", value: 6, id: 106 },
                    { position: "3x1", value: 7, id: 107 },
                    { position: "3x2", value: 99, id: 108 },
                    { position: "3x3", value: 8, id: 109 }
                ],
                rankList: [
                    { name: "Teresa", times: 9, id: 1001 },
                    { name: "Josh", times: 11, id: 1002 },
                    { name: "Rita", times: 10, id: 1003 },
                    { name: "Crystal", times: 2, id: 1004 }
                ],
                user: newUserObj
            };
            break;
        default:
            return state;
    }

    return finalState;
}

export default gameReducer;