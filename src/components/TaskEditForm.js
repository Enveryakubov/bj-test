import Cookies from 'js-cookie'
import {useRef, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useInput } from '../hooks/customHooks'
import { editTask } from '../store/actions'
import { useHistory } from 'react-router'

const TaskEditForm = ({match}) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const targetTaskId = match.params.id
    const tasks = useSelector(state => state.tasks.tasks)

    const token = Cookies.get("token")

    const targetTask = tasks.find(task => task.id === Number(targetTaskId))

    const currentText = useInput(targetTask.text)
    const initText = useRef(targetTask.text)

    const statusRef = useRef()

    const [taskStatus, setTaskStatus] = useState(targetTask.status)
    const handleChange = (e) => {
        if (e.target.checked){
            setTaskStatus(Number(e.target.value))
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const modified = !(initText.current === currentText.value)
        let status;
        if (modified && (taskStatus === 10)){
            status = 11
        }else if (modified && (taskStatus === 0)){
            status = 1
        }else{
            status = taskStatus
        }
        dispatch(editTask(targetTaskId, token, currentText.value, status ))
        history.push("/")

    }

   

    return (
        <div className="rightSide">
            <form className="form" onSubmit={handleSubmit}>
                    <h1 className="form__title">Редактировать</h1>
                <div className="editform">
                    <p className="editform__item"><strong>Имя: </strong>{targetTask.username}</p>
                    <p className="editform__item"><strong>E-Почта: </strong>{targetTask.email}</p>
                    <p><strong>Текущий статус: </strong></p>

                    <div className="editform__item_indented" >
                        <input 
                            type="radio" 
                            id="finished" 
                            name="task" 
                            value="10"
                            checked = {taskStatus > 1}
                            onChange={handleChange}
                                />
                        <label htmlFor="finished">Выполнено</label>
                    </div>
                    <div className="editform__item_indented">
                        <input 
                            ref={statusRef}
                            type="radio" 
                            id="pending" 
                            name="task" 
                            value="0"
                            checked={taskStatus < 10}
                            onChange={handleChange}
                            />
                            
                        <label htmlFor="pending">Не выполнено</label>
                    </div>
                    <div className="editform__item">
                        <label htmlFor="text"><strong>Teкст</strong></label>
                        <textarea 
                            type="text"
                            className="form__item" 
                            {...currentText.bind}
                            placeholder="Введите ТЕКСТ задачи"
                            id="text"
                            required/>
                        </div>
                    <button 
                    className="button button-green"
                    type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default TaskEditForm
