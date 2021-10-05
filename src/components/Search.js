import React from 'react'
import { setSerchField, setSerchOrder } from '../store/actions'
import { useDispatch} from 'react-redux'


const Search = () => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const field = document.querySelector("#field")
        const order = document.querySelector("#order")

        dispatch(setSerchField(field.value))
        dispatch(setSerchOrder(order.value))
    
    }
    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="field">Сортировать по полю:</label>
                <select name="field" id="field" className="searchBar__item">
                    <option value="id">--Выберите--</option>
                    <option value="username">Имя</option>
                    <option value="email">Е-почта</option>
                    <option value="status">Статус</option>
                </select>
                <select name="order" id="order" className="searchBar__item">
                    <option value="desc">По убыванию</option>
                    <option value="asc">По возрастанию</option>
                </select>
                <button type="submit" className="button searchBar__button button-green">Сортировать</button>
            </form>
        </div>
    )
}

export default Search
