import React from "react";
import { connect } from "react-redux";

const RankUi = (props) => {

    let sortedRankArray = props.rankArray.sort(function (a, b) {
        return a.times > b.times ? 1 : -1;
       });
    let i = 0;
    
    const rankList = sortedRankArray.length ? (
        sortedRankArray.map( element => { 
            i++;
            return (
            <div className = "collection-item content-font-size flex-container-row padding-large-item" key = { element.id }>
                <span className="list-name-text" style= {i <= 3 ? {color: '#FF9900'} : {color: 'black'}}>{ element.name }</span>
                <span>wins the game in </span>
                <span className="list-times-text" style= {i <= 3 ? {color: '#FF9900', fontSize: '1.4em' } : {color: 'black'}}>{ element.times } times </span>
            </div> )})
    ) : (
        <p className = "center"> There is no rank list</p>
    );
    return (
        <div className = "collection">
            { rankList }
        </div>
    );
}

const mapStoreToProps = (state) => {
    return { rankArray: state.rankList };
}

export default connect(mapStoreToProps)(RankUi);