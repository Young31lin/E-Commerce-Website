import { USER_UPDATE_INDIVIDUAL_REQUEST, USER_UPDATE_INDIVIDUAL_SUCCESS, USER_UPDATE_INDIVIDUAL_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DATABASE_REQUEST, USER_DATABASE_SUCCESS, USER_DATABASE_FAIL, USER_DATABASE_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAIL_RESET} from "../constants/UserConstants";
import axios from 'axios'
import {ORDER_SHOW_RESET} from '../constants/OrderConstants'

export const login=(email, password)=>async(dispatch)=>{
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const {data}=await axios.post('http://127.0.0.1:8000/polls/users/login/', {'username':email,'password':password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
       localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch(error){
        dispatch({ type: USER_LOGIN_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT_REQUEST
    })
    dispatch({
        type: USER_DETAIL_RESET
    })
    dispatch({
        type: ORDER_SHOW_RESET
    })
    dispatch({
        type: USER_DATABASE_RESET
    })
}

export const register=(name, email, password)=>async(dispatch)=>{
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }
        const {data}=await axios.post('http://127.0.0.1:8000/polls/users/register/', {'name': name, 'email':email,'password':password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        })
       localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch(error){
        dispatch({ type: USER_REGISTER_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const detail=(id)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`http://127.0.0.1:8000/polls/users/${id}/`, config)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch({ type: USER_DETAIL_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const update=(user)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.put(`http://127.0.0.1:8000/polls/users/profile/update/`, user , config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload: data
        }) 
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({ type: USER_UPDATE_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const getUserDatabase = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DATABASE_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/polls/users/`, config)

        dispatch({
            type: USER_DATABASE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: USER_DATABASE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`http://127.0.0.1:8000/polls/users/delete/${id}/`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}


export const updateIndividualUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_INDIVIDUAL_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/polls/users/update/${user.id}/`, user, config)

        dispatch({
            type: USER_UPDATE_INDIVIDUAL_SUCCESS,
        })

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: USER_UPDATE_INDIVIDUAL_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}