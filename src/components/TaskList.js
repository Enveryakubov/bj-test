
import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks} from '../store/actions'
import {capitalize} from "../utils/ulits"

import Pagination from './Pagination'
import Search from './Search'


const TaskList = () => {
    const auth = useSelector(state => state.auth.auth)

    const statusConfig = (val) => {
        const table = {
            0: "задача не выполнена",
            1: "задача не выполнена, отредактирована админом",
            10:"задача выполнена",
            11: "задача отредактирована админом и выполнена"
        }
        return table[val]
    }

    const dispatch = useDispatch()
    const {totalTasks, tasks, loading} = useSelector(state => state.tasks)
    const currentPage = useSelector(state => state.currentPage)
    const {field, order} = useSelector(state => state.search)
   
    
    useEffect(() => {
        dispatch(fetchTasks(currentPage, order, field))
        console.log("List rendered")
    },[currentPage, field, order, dispatch])


    if (loading && (tasks.length === 0)){
        return (
           <div className="rightSide rightSide--bg-grey">
               <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
           </div>
        )
    }
    if (tasks.length === 0){
        return (
            <div className="taskList-empty rightSide">
                <h1>Пока заданий нет!</h1>
            </div>
        )
    }
    return (
        <div className="taskList rightSide">
            <h1 className="taskList__title">Все задания</h1>
            <Search/>
            {tasks.map(task =>
            <div key={task.id} className="task taskList__item">
                <p className="task__item "><strong>Имя:</strong> {capitalize(task.username)}</p>
                <p className="task__item"><strong>E-почта:</strong> {task.email.toLowerCase()}</p>
                <p className="task__item"><strong>Задача: </strong>{capitalize(task.text)}</p>
                <p className="task__item"><strong>Статус: </strong>{capitalize(statusConfig(task.status))}</p>
                {auth &&
                <Link to={`/edit/${task.id}`}>
                <div className="task__button-center">
                    <button className="button button-blue">Редактировать</button>
                </div>
                </Link>}
            </div>
            )}
            <Pagination 
                totalTasks={totalTasks}
                currentPage={currentPage}
                 />
        </div>
    )
    
}

export default TaskList
