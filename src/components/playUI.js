import React from "react";
import EnterNameUi from "./enterNameUI";
import BoardUi from "./boardUI";

const PlayUi = () => {
    return (
        <div>
            <h4 className="center"> Play </h4>
            <EnterNameUi />
            <BoardUi />
        </div>
    )
}


export default PlayUi;