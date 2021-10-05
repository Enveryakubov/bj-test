import React from 'react'

import logo from "../assets/icons/tasks.svg"
import create from "../assets/icons/edit.svg"
import login from "../assets/icons/login.svg"

import { Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../store/actions'
import Cookies from 'js-cookie'


const Nav = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.auth)

    const loggingOut = () => {
        Cookies.remove("admin")
        Cookies.remove("token")
        dispatch(logOut())
    }

    return (
        <nav className="nav">
            <Link to="/">
                <div className="nav__item">
                    <img src={logo} width="50" alt="Task" />
                    <p>Главная</p>
                </div>
            </Link>
            <Link  to="/create">
                <div className="nav__item">
                    <img src={create} width="50" alt="Create" />
                    <p>Создать задачу</p>
                </div>
            </Link>
            {auth ? 
            <Link to="/" onClick={loggingOut}>
                <div className="nav__item">
                    <img src={login} width="50" alt="Login" />
                    <p>Выход</p>
                </div> 
            </Link>
            :
            <Link to="/login">
                <div className="nav__item">
                    <img src={login} width="50" alt="Login" />
                    <p>Вход</p>
                </div> 
            </Link>
            }
        </nav>
    )
}

export default Nav
