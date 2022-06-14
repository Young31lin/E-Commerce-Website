import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../reduxActions/cartActions'
import {FormContainer} from '../components/FormContainer'
import {Checkout} from '../components/Checkout'
import {createOrder} from '../reduxActions/orderActions'
import {ORDER_CREATE_RESET} from '../constants/OrderConstants'

function PlaceOrderPage() {
    const orderCreate=useSelector(state=>state.orderCreate)
    const {order, error, success}=orderCreate
    const cart=useSelector(state=>state.cart)
    const dispatch=useDispatch()
    let navigate=useNavigate()
    const submitOrderHandler=()=>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            payment: cart.payment,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    cart.itemsPrice=cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty , 0).toFixed(2) 
    cart.shippingPrice=((cart.itemsPrice >=100 ) ? 0 : 10).toFixed(2)
    cart.taxPrice=(cart.itemsPrice * 0.05).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    useEffect(()=>{
        if(!cart.payment){
            navigate('/payment')
        }
        if (success){
            dispatch({
                type: ORDER_CREATE_RESET
            })
            navigate(`/order/${order.id}`)
        }


    },[success])
  return (
    <div>
        <Checkout step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Shipping:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city }, {cart.shippingAddress.postal}, {cart.shippingAddress.country}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p><strong>Method:</strong> {cart.payment ? cart.payment.payment : '' } </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems && cart.cartItems.length === 0 ? <h3>
                                Your cart is empty
                            </h3> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems && cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={'http://127.0.0.1:8000'+item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>Order summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Item:
                                </Col>
                                <Col>
                                ${cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item> 
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total:
                                </Col>
                                <Col>
                                ${cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item> 
                        <ListGroup.Item>
                            {error ? <h3>{error}</h3> : ''}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems.length===0 } onClick={submitOrderHandler}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderPage