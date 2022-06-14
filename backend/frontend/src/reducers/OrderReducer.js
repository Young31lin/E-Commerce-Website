
import { ORDER_SHIPPED_REQUEST, ORDER_SHIPPED_SUCCESS, ORDER_SHIPPED_FAIL, ORDER_SHIPPED_RESET, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_RESET, ORDER_SHOW_ALL_REQUEST, ORDER_SHOW_ALL_SUCCESS, ORDER_SHOW_ALL_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_RESET, ORDER_SHOW_REQUEST, ORDER_SHOW_SUCCESS, ORDER_SHOW_FAIL, ORDER_SHOW_RESET} from '../constants/OrderConstants'

export const orderCreateReducer=(state={}, action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return{
                
            }
        default:
            return state
    }
   

}

export const orderDetailReducer=(state={loading: true, orderItems:[], shippingAddress: {}}, action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAIL_SUCCESS:
            return{
                loading: false,
                order: action.payload
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
   

}

export const orderPayReducer=(state={}, action)=>{
    switch(action.type){
        case ORDER_PAYMENT_REQUEST:
            return {
                loading: true,
            }
        case ORDER_PAYMENT_SUCCESS:
            return{
                loading: false,
                success: true
            }
        case ORDER_PAYMENT_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_PAYMENT_RESET:
            return{
            }
        default:
            return state
    }
   

}

export const orderShowReducer=(state={orders:[]}, action)=>{
    switch(action.type){
        case ORDER_SHOW_REQUEST:
            return {
                loading: true,
            }
        case ORDER_SHOW_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }
        case ORDER_SHOW_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_SHOW_RESET:
            return {
                orders:[]
            }
        default:
            return state
    }
   

}

export const orderShowAllReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_SHOW_ALL_REQUEST:
            return {
                loading: true,
            }
        case ORDER_SHOW_ALL_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_SHOW_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }


}

export const orderShippedReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SHIPPED_REQUEST:
            return {
                loading: true,
            }
        case ORDER_SHIPPED_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_SHIPPED_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_SHIPPED_RESET:
            return {
            }
        default:
            return state
    }
}

export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return {
                loading: true,
            }
        case ORDER_DELIVERED_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_DELIVERED_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_DELIVERED_RESET:
            return {
            }
        default:
            return state
    }
}