import axios from 'axios'
import {REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_RESET, REVIEW_CREATE_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS} from '../constants/ProductConstants'

export const getProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_PRODUCTS_REQUEST' })
        const { data } = await axios.get(`http://127.0.0.1:8000/polls/products/${keyword}`)
        dispatch({ type: 'ALL_PRODUCTS_SUCCESS', payload: data })
    }
    catch (error){
        dispatch({ type: 'ALL_PRODUCTS_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
    }

}

export const topProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_TOP_REQUEST' })
        const { data } = await axios.get(`http://127.0.0.1:8000/polls/products/top/`)
        dispatch({ type: 'PRODUCT_TOP_SUCCESS', payload: data })
    }
    catch (error){
        dispatch({ type: 'PRODUCT_TOP_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
    }

}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_REQUEST' })
        const { data } = await axios.get(`http://127.0.0.1:8000/polls/products/${id}/`)
            dispatch({ type: 'PRODUCT_SUCCESS', payload: data })
    }
    catch (error) {
        dispatch({ type: 'PRODUCT_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })
    }

}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_DELETE_REQUEST'
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`http://127.0.0.1:8000/polls/products/delete/${id}/`, config)

        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({ type: 'PRODUCT_DELETE_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_CREATE_REQUEST'
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/polls/products/create/`, {}, config)

        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS',
            payload: data, 
        })

    }
    catch (error) {
        dispatch({ type: 'PRODUCT_CREATE_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'PRODUCT_UPDATE_REQUEST'
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/polls/products/update/${product.id}/`, product, config)

        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data,
        })

        dispatch({
            type: 'PRODUCT_SUCCESS',
            payload: data,
        })

    }
    catch (error) {
        dispatch({ type: 'PRODUCT_UPDATE_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}

export const reviewProduct = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'REVIEW_CREATE_REQUEST'
        })
        const { userLogin: { userInfo }, } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/polls/products/${id}/reviews`, review, config)

        dispatch({
            type: 'REVIEW_CREATE_SUCCESS',
            payload: data,
        })


    }
    catch (error) {
        dispatch({ type: 'REVIEW_CREATE_FAIL', payload: error.response && error.response.data.detail ? error.response.data.detail : error.message })

    }

}