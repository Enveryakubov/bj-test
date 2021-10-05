import { useEffect} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Cookies from "js-cookie"

import "../assets/styles.css"

import TaskList from "./TaskList"
import Nav from "./Nav"
import TaskEditForm from "./TaskEditForm"
import TaskCreate from "./TaskCreate"
import Custom404 from "./Custom404"
import LoginForm from "./LoginForm"
import Alert from "./Alert"

import { useSelector, useDispatch } from "react-redux"
import { LOG_IN } from "../store/types"






const App = () => {
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()

    const readCookies = () => {
        const token = Cookies.get("token")
        if (token) {
            dispatch({type:LOG_IN, payload:token})
        }
    }
    useEffect(() => {
        readCookies()
    })
    return (
        <Router>
            {alert ? <Alert/>: null}
            <Nav/>
            <Switch>
                <Route path="/" exact component={TaskList}/>
                <Route path="/edit/:id" exact component={TaskEditForm}/>
                <Route path="/create" exact component={TaskCreate}/>
                <Route path="/login" exact component={LoginForm}/>
            </Switch>
        </Router>
    )
}

export default App
