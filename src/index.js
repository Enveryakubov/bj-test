import ReactDOM from "react-dom"
import App from "./components/App"
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from "./store/reducers"
import thunk from "redux-thunk"

// const store = createStore(rootReducer, applyMiddleware(thunk))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));




ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector("#root")
)


