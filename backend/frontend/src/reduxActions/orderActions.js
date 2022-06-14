import { ORDER_SHIPPED_REQUEST, ORDER_SHIPPED_SUCCESS, ORDER_SHIPPED_FAIL, ORDER_SHIPPED_RESET, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_RESET, ORDER_SHOW_ALL_REQUEST, ORDER_SHOW_ALL_SUCCESS, ORDER_SHOW_ALL_FAIL,ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_RESET, ORDER_SHOW_SUCCESS, ORDER_SHOW_REQUEST, ORDER_SHOW_FAIL, ORDER_SHOW_RESET} from '../constants/OrderConstants'
import axios from 'axios'
import {CART_CLEAR_ITEMS} from '../constants/CartConstants'


export const createOrder=(order)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post(`http://127.0.0.1:8000/polls/orders/add/`, order , config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })
        localStorage.removeItem('cartItems')
       
    }
    catch(error){
        dispatch({ type: ORDER_CREATE_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const detailOrder=(id)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`http://127.0.0.1:8000/polls/orders/${id}/` , config)

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
       
    }
    catch(error){
        dispatch({ type: ORDER_DETAIL_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const payOrder=(id, paymentResult)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_PAYMENT_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.put(`http://127.0.0.1:8000/polls/orders/${id}/pay/` , paymentResult, config)

        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
            payload: data
        })
       
    }
    catch(error){
        dispatch({ type: ORDER_PAYMENT_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}


export const showOrder=(id)=>async(dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_SHOW_REQUEST
        })
        const {userLogin: {userInfo},}=getState()
        const config = {
            headers : {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`http://127.0.0.1:8000/polls/orders/myOrders/` , config)

        dispatch({
            type: ORDER_SHOW_SUCCESS,
            payload: data
        })
       
    }
    catch(error){
        dispatch({ type: ORDER_SHOW_FAIL , payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
        
    }

}

export const showAllOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_SHOW_ALL_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/polls/orders/`, config)

        dispatch({
            type: ORDER_SHOW_ALL_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_SHOW_ALL_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const shippedOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_SHIPPED_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/polls/orders/${order.id}/shipped/`, {}, config)

        dispatch({
            type: ORDER_SHIPPED_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_SHIPPED_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const deliveredOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERED_REQUEST
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/polls/orders/${order.id}/delivered/`, {}, config)

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({ type: ORDER_DELIVERED_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}
