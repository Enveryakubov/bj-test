import React from 'react'
import { setPage } from '../store/actions'
import { useDispatch } from 'react-redux'

const Pagination = ({totalTasks, currentPage}) => {

    const itemsPerPage = 3

    const dispatch = useDispatch()
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalTasks/itemsPerPage); i++){
        pageNumbers.push(i)
    }

    const highlight = (number) => number === currentPage ? "grey": "white"
        

    return (
        <div>
            <ul className="pagination-box">
                {pageNumbers.map(number => (
                    <li key={number} 
                    className="pagination__item" 
                    style={{background:`${highlight(number)}`}}
                    onClick={() => dispatch(setPage(number))}
                    >
                        {number}   
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Pagination
