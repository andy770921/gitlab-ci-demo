import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';


class BoardUi extends Component {
    state = {
        block: [
            { position: "1x1", isAdjacent: false },
            { position: "1x2", isAdjacent: false },
            { position: "1x3", isAdjacent: false },
            { position: "2x1", isAdjacent: false },
            { position: "2x2", isAdjacent: false },
            { position: "2x3", isAdjacent: false },
            { position: "3x1", isAdjacent: false },
            { position: "3x2", isAdjacent: false },
            { position: "3x3", isAdjacent: false }
        ]
    };

    findEmptyBox = () => {
        return this.props.blockArray.find(element => (element.value === 99)).position;
    }
    findAdjacent = (emptyPosition) => {
        const firstNum = parseInt(emptyPosition.slice(0, 1));
        const lastNum = parseInt(emptyPosition.slice(2));
        const posiblePosition = [firstNum + "x" + (lastNum + 1), firstNum + "x" + (lastNum - 1), (firstNum + 1) + "x" + lastNum, (firstNum - 1) + "x" + lastNum];
        let adjacentPosition = posiblePosition.filter(str => !(str.indexOf("0") !== -1 || (str.indexOf("4") !== -1)));
        return adjacentPosition;

    }
    static getDerivedStateFromProps(props, state) {
        // 找到空值的位置
        let emptyPosition = props.blockArray.find(element => (element.value === 99)).position;
        // 找到空值旁的鄰近位置
        const firstNum = parseInt(emptyPosition.slice(0, 1));
        const lastNum = parseInt(emptyPosition.slice(2));
        const posiblePosition = [firstNum + "x" + (lastNum + 1), firstNum + "x" + (lastNum - 1), (firstNum + 1) + "x" + lastNum, (firstNum - 1) + "x" + lastNum];
        let adjPositionArray = posiblePosition.filter(str => !(str.indexOf("0") !== -1 || (str.indexOf("4") !== -1)));
        // 設定 state ，若與空位置相鄰，則改變狀態
        let resetedState = Object.assign({}, state);
        // 步驟一: 先把所有位置通通設定不相臨
        resetedState = state.block.map(element => {
            element.isAdjacent = false;
            return element;
        });
        // 步驟二: 再設定相臨
        for (let i = 0; i < adjPositionArray.length; i++) {
            resetedState = resetedState.map(element => {
                if (adjPositionArray[i] === element.position) {
                    element.isAdjacent = true;
                    return element;
                } else { return element; }
            });
        }
        return resetedState;
        // return null 也可以， react 似乎會在變動 state 時直接更新，不用最後再回傳
    }

    render() {
        // 找到空值的位置
        let emptyPosition = this.findEmptyBox();
        // 生成 block 內容，若是鄰近空位置者，加掛 click 事件換值，及手指游標圖案
        const blockList = this.state.block.length ? (
            this.state.block.map(element => {
                // 單個 block 的 class 名稱設定
                const divClassName = `div-${element.position} grid-inner-text`;
                // 單個 block 內的數字設定
                let divValue = this.props.blockArray.find(ele => (ele.position === element.position)).value;
                // 單個 block 的 id 設定， 在迴圈渲染的狀況，react 一定要設定 key
                let divKey = this.props.blockArray.find(ele => (ele.position === element.position)).id;
                // 若鄰近，加掛 click 事件換值，及手指游標圖案，若不是，再判斷是否值是 99 ，若是，設定為不可見
                return (
                    <React.Fragment key={divKey + 500} >
                        {(element.isAdjacent) ? (<div className={divClassName}
                            onClick={() => this.props.shuffleRedux(emptyPosition, element.position)}
                            style={{ cursor: 'pointer' }}
                            key={divKey} > {divValue} </div>) :
                            (<div className={divClassName}
                                style={element.position === emptyPosition ? { visibility: 'hidden' } : { color: 'black' }}
                                key={divKey} > {divValue} </div>)}
                    </React.Fragment>)
            })
        ) : (
                <p className="center"> You have no state </p>
            );

        return (
            <React.Fragment>
                <div className="flex-container-center">
                    <div className="grid-container">
                        {blockList}
                    </div>
                </div>
                <h5 className="center"> You've moved {this.props.clicktimes} times.</h5>
                <button className="btn waves-effect waves-light chinese-font btn-center" onClick={() => this.props.resetGameRedux()}> 再玩一次 ! </button>
            </React.Fragment>
        );
    }
    componentDidUpdate() {
        let checkWin = 0;
        for (let i = 0; i < this.props.blockArray.length - 1; i++) {
            if (this.props.blockArray[i].value < this.props.blockArray[i + 1].value) { checkWin++; }
        }
        if (checkWin >= 8) { 
            this.props.addRankRedux();
            alert ("You Win! Lead to ranking page"); 
            setTimeout(() => {this.props.history.push('/ranking')}, 2000);
        }
    }
    componentDidMount() {
        this.props.resetGameRedux();
    }
}

const mapStoreToProps = (state) => {
    return { blockArray: state.block, clicktimes: state.user.times };
}

const mapDispatchToProps = (dispatch) => {
    return {
        shuffleRedux: (emptyPosition, targetPosition) => { dispatch({ type: "SHUFFLE", emptyPosition: emptyPosition, targetPosition: targetPosition }) },
        resetGameRedux: () => { dispatch({ type: "RESET" }) },
        addRankRedux: () => { dispatch({ type: "ADD_RANK" }) },
        setAdjacentRedux: (adjPositionArray) => { dispatch({ type: "SET_ADJ", adjPositionArray: adjPositionArray }) }
    };
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(BoardUi));