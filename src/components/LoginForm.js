
import { useInput } from '../hooks/customHooks'
import { useDispatch, useSelector} from 'react-redux'
import { logIn} from '../store/actions'
import {Redirect} from "react-router-dom"


const LoginForm = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.auth)

    const username = useInput("")
    const password = useInput("")

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(logIn(username.value, password.value)) 
    }
    
    if (auth){
        return <Redirect to={"/"}/>
    }

    return (
        <div className="rightSide loginform">
            <form className="form" onSubmit={onSubmit}>
                <h1 className="form__title">Авторизация</h1>
                <input
                    type="text"
                    className="form__item"
                    placeholder="Введите вашe имя"
                    {...username.bind}
                    required
                />
                <input
                    type="password"
                    className="form__item"
                    placeholder="Введите ваш пароль"
                    {...password.bind}
                    required
                />
                <button
                className="button loginform__button button-green"
                type="submit"
                >Войти
                </button>     
            </form>
           
        </div>
    ) 
}

export default LoginForm
