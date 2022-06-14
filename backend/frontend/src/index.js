import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productPageReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer, productTopReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/CartReducer'
import { orderCreateReducer, orderDeliveredReducer, orderDetailReducer , orderPayReducer, orderShippedReducer, orderShowAllReducer, orderShowReducer} from './reducers/OrderReducer'
import { userUpdateIndividualReducer, userDeleteReducer, userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateReducer, userDatabaseReducer} from './reducers/UserReducer'

const reducer = combineReducers({
    productList: productReducer,
    singleProduct: productPageReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer, 
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdate: userUpdateReducer,
    userDatabase: userDatabaseReducer,
    userDelete: userDeleteReducer,
    userUpdateIndividual: userUpdateIndividualReducer, 
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderShow: orderShowReducer,
    orderShowAll: orderShowAllReducer,
    orderShipped: orderShippedReducer,
    orderDelivered: orderDeliveredReducer, 
    productReview : productReviewReducer,
    productTop: productTopReducer,


})

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null



const initialState = {
  cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage}, 
  userLogin: {userInfo: userInfoFromStorage},
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
