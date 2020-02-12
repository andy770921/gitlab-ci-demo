import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter , Route } from 'react-router-dom';
import NavbarUi from "./navbarUI";
import AllUi from "./components/allUI";
import OngoingUi from "./components/onGoingUI";
import FinishedUi from "./components/finishedUI";
import TypeUi from "./components/typeUI";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

class App extends React.Component {
    render() {
        return (
            <HashRouter>
            <div className="app-content container">
                <h1 className="blue-text center"> Todo's </h1>
                <NavbarUi />
                <Route exact path="/" component={AllUi} />
                <Route path="/ongoing" component={OngoingUi} />
                <Route path="/finished" component={FinishedUi} />
                <TypeUi />
            </div>
            </HashRouter>
        )
    }
}


ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector("#root"));