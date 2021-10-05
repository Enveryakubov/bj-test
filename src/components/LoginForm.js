
import { useInput } from '../hooks/customHooks'
import { useDispatch} from 'react-redux'
import { logIn} from '../store/actions'





const LoginForm = () => {
    const dispatch = useDispatch()

    const username = useInput("")
    const password = useInput("")

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(logIn(username.value, password.value))  
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
