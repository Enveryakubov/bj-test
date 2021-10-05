
import { combineReducers } from "redux";
import { 
    GET_TASKS, 
    CREATE_TASK, 
    LOG_IN, 
    SHOW_ALERT, 
    HIDE_ALERT, 
    LOG_OUT, 
    GET_TASK_COUNT,
    SET_PAGE,
    EDIT_TASK,
    SET_SEARCH_FIELD,
    SET_SEARCH_ORDER,
    SET_LOADING,
} from "./types";

const initTasks = {
    tasks:[],
    totalTasks:0, 
    loading:false
}

const tasksReducer = (state=initTasks, action) => {
    switch (action.type){
        case GET_TASKS:
            return {
                ...state,
                tasks:action.payload,
                loading:false 
            }
        case CREATE_TASK:
            return {
                ...state,
                tasks:[action.payload, ...state.tasks.slice(0,2)] 
            }
        case GET_TASK_COUNT:
            return {
                ...state,
                totalTasks:action.payload
            }
        case EDIT_TASK:
            return state

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

const initAuth = {
    auth: false,
    token:null
}

const authReducer = (state=initAuth, action) => {
    switch (action.type){
        case LOG_IN:
            return {
                ...state,
                auth:true,
                token:action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                auth:false,
                token:null
            }
        default:
            return state
    }
}
const alertReducer = (alert=null, action) => {
    switch (action.type){
        case SHOW_ALERT:
            return action.payload
        case HIDE_ALERT:
            return null
        default:
            return alert
    }
}

const paginationReducer = (page=1, action) => {
    switch (action.type) {
        case (SET_PAGE):
            return action.payload
        default:
            return page   
    }
}

const searchInit = {
    field:"id",
    order:"desc"
}
const searchReducer = (state=searchInit, action) => {
    switch (action.type) {
        case SET_SEARCH_FIELD:
           return {
               ...state,
               field:action.payload
           }
        case SET_SEARCH_ORDER:
           return {
               ...state,
               order:action.payload
           }
        default:
            return state  
    }
}






export default combineReducers({
    tasks: tasksReducer,
    auth: authReducer,
    alert:alertReducer,
    // visible: visibilityReducer,
    currentPage:paginationReducer,
    search: searchReducer

})