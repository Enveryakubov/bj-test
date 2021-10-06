import {GET_TASKS, 
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
   
} from "./types"
import apiSource from "../api/apiSource"
import Cookies from 'js-cookie'

export const setLoading = (value) => {
    return {
        type:SET_LOADING,
        payload:value
    }
}

export const fetchTasks = (pageNum=1, sortDirection, sortField) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        apiSource.get("/", {
            params:{
                developer:"Enver",
                page:pageNum,
                sort_direction:sortDirection,
                sort_field:sortField
            }})
            .then(res => {
                dispatch({type:GET_TASKS, payload:res.data.message.tasks})
                dispatch({type:GET_TASK_COUNT, payload:res.data.message.total_task_count})})
    }
}

export const createTask = (username, email, text) => {

    const form = new FormData(); 
    form.append("username", username)  
    form.append("email", email)  
    form.append("text", text)  
    return (dispatch) => {
    apiSource.post("/create", form,{ 
        
        params:{
        developer:"Enver"
    }})
    .then(res => {
        if (res.data.status === "ok"){
            dispatch({type:CREATE_TASK, payload: res.data.message})
            dispatch(showAlert("Задача добавлена"))
        }
        else{
            dispatch(showAlert("NO"))
        }   
    })
}}


export const hideAlert = (text) => {
    return {
        type: HIDE_ALERT
    }
}
export const showAlert = (text) => {
    return (dispatch) => {
        dispatch({
            type:SHOW_ALERT, 
            payload: text
        })
        setTimeout(() => dispatch({
            type:HIDE_ALERT
        }), 2000)
    }
    
}

export const logIn = (username, password) => {

    const form = new FormData(); 
    form.append("username", username)  
    form.append("password", password)  

    return (dispatch) => {
    apiSource.post("/login", form,{ 
        
        params:{
        developer:"Enver"
    }})
    .then(res => { 
        if (res.data.status === "error"){
            return dispatch(showAlert(res.data.message.password))
        }
        dispatch({type:LOG_IN, payload: res.data.message.token})
        Cookies.set("admin", true, { expires: 1 })
        Cookies.set("token", res.data.message.token,{ expires: 1 } )
    })
}}

export const logOut = () => {
    return {
        type: LOG_OUT
    }
}


export const setPage = (num) => {
    return {
        type:SET_PAGE,
        payload:num
    }
}

export const editTask = (id, token, text, status) => {
    if (!Cookies.get("admin")){
        window.location.href = '/'
        return showAlert("Пожалуйста, авторизируйтесь!")
    }
    return (dispatch) => {
    const form = new FormData(); 
    form.append("status", status)  
    form.append("text", text)  
    form.append("token", token)  
   
    apiSource.post(`/edit/${id}`, form,{ 
        params:{
        developer:"Enver"
    }})
    .then(res =>{ 
        dispatch({type:EDIT_TASK})
    })
}}

export const setSerchField = (value) => {
    return {
        type:SET_SEARCH_FIELD,
        payload:value
    }
}
export const setSerchOrder = (value) => {
    return {
        type:SET_SEARCH_ORDER,
        payload:value
    }
}



