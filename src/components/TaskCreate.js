import {useEffect} from 'react'
import validator from "validator"
import { useInput } from '../hooks/customHooks'
import { createTask, showAlert } from '../store/actions'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import {sanitize} from "dompurify"
import {debounce} from "../utils/ulits"


const TaskCreate = () => {

    const username = useInput("")
    const  email = useInput("")
    const text = useInput("")

    const dispatch = useDispatch()
    const history = useHistory()
   

    const onFormSubmit = (event) => {
        event.preventDefault()
        if (!validator.isEmail(email.value)){
            return dispatch(showAlert("E-mail не валиден!"))
        }
       dispatch(createTask(sanitize(username.value), sanitize(email.value), sanitize(text.value)))
       username.clear()
       email.clear()
       text.clear()
       history.push("/")
    }


    function validateEmail(val) {
        if (!validator.isEmail(val)){
            dispatch(showAlert("E-mail не валиден!"))
        }
    }

    validateEmail = debounce(validateEmail, 1000)
    function handleData() {validateEmail(this.value)}

    useEffect(() => {
        const emailInput = document.querySelector("#email")
        emailInput.addEventListener("keyup", handleData)
        return () => {
            emailInput.removeEventListener("keyup",handleData)
        }
    })

    return (
        <div className="rightSide">
            <form 
            className="form"
            onSubmit={onFormSubmit}
            >
                <h1 className="form__title">Создать задание</h1>
                <input 
                    className="form__item"
                    type="text" 
                    {...username.bind}
                    placeholder="Введите ваше ИМЯ"
                    required
                    />
                <br/>
                <input 
                    type="text"
                    className="form__item" 
                    {...email.bind} 
                    placeholder="Введите ваш E-MAIL адрес"
                    id="email"
                    required
                    />
                <br/>
                <textarea 
                    type="text"
                    className="form__item form__textarea" 
                    {...text.bind}
                    placeholder="Введите ТЕКСТ задачи"
                    required
                />
                <br/>
                <button className="button button-green" type="submit">Создать</button>
            </form>
        </div>
    )
}

export default TaskCreate
