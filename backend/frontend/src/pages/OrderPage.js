import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link, Navigate, useLocation, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../reduxActions/cartActions'
import {FormContainer} from '../components/FormContainer'
import { detailOrder, payOrder, shippedOrder, deliveredOrder} from '../reduxActions/orderActions'
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAYMENT_RESET, ORDER_DELIVERED_RESET, ORDER_SHIPPED_RESET} from '../constants/OrderConstants'

function OrderPage() {
    const ID=useParams()
    const {id}=ID
    const dispatch=useDispatch()
    const [sdkReady,setSdkReady]=useState(false)

    const orderDetail=useSelector(state=>state.orderDetail)
    const {order, error, loading}=orderDetail
    
    const orderPay=useSelector(state=>state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDelivered = useSelector(state => state.orderDelivered)
    const { success: successDelivered } = orderDelivered

    const orderShipped = useSelector(state => state.orderShipped)
    const { success: successShipped } = orderShipped

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    let navigate=useNavigate()
    if(!loading && !error){
       order.itemsPrice=order.orderItems.reduce((acc,item)=> acc + item.price * item.quantity , 0).toFixed(2) 
    }
   const addPayPal=()=>{
       const script=document.createElement('script')
       script.type='text/javascript'
       script.src='https://www.paypal.com/sdk/js?client-id=AXyEjHdpl9lCjcyJqEiUYIsuJRnajWoAUNbDqECNF5fptYWnWKJxw_biibTwdwbV3xCV8oYwrzUHdQlL'
       script.async=true
       script.onload=()=>{
           setSdkReady(true)
       }
       document.body.appendChild(script)
       

   } 
    useEffect(() => {
        if (!order || successPay || order.id != Number(id) || successDelivered || successShipped) {
            dispatch({ type: ORDER_PAYMENT_RESET })
            dispatch({ type: ORDER_SHIPPED_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })

            dispatch(detailOrder(id))
        }
        else if (!order.paid){
            if(!window.paypal){
                addPayPal()
            }
            else{
                setSdkReady(true)
            }
        }

    },[dispatch, order, id, successPay, successDelivered, successShipped])

    const successPaymentHandler=(paymentResult)=>{
        dispatch(payOrder(id, paymentResult))
    }

    const successShippedHandler = () => {
        dispatch(shippedOrder(order))
    }

    const successDeliveredHandler = () => {
        dispatch(deliveredOrder(order))
    }

  return loading ? (
  <h3>Loading</h3>
  ): error ? (
  <h3>{error} </h3>
  ): (
    <div>
        <h1>Order {id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <p>
                        <strong> Name: </strong> {order.user.name}
                    </p>

                    <p>
                        <strong>Email: </strong> {order.user.email}
                    </p>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Shipping:</strong> {order.shippingAddress.streetAddress}, {order.shippingAddress.city }, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                        <p>{order.delivered ? <strong>Order delivered</strong> : <strong>Order is not delivered</strong>}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p><strong>Method:</strong> {order.paymentMethod } </p>
                        {order.paid ? <strong>Order is paid</strong> : <strong>You haven't paid the order yet</strong>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems && order.orderItems.length === 0 ? <h3>
                                Your order is empty
                            </h3> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems && order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>

                                                    <Col>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
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
                                ${order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                ${order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                ${order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item> 
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total:
                                </Col>
                                <Col>
                                ${order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.paid && (
                            <ListGroup.Item>
                                {loadingPay && <strong>Loading</strong>}
                                {!sdkReady ? (<strong>Loading</strong>) : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/> )}

                            </ListGroup.Item>
                        )} 
                     
                              </ListGroup>

                              {userInfo && userInfo.isAdmin && order.paid && !order.shipped && (
                                  <ListGroup.Item>
                                      <Button variant="primary" style={{ width: '100%' }} onClick={successShippedHandler}>Mark as Shipped</Button>
                                  </ListGroup.Item>
                              )}
                            
                              {userInfo && userInfo.isAdmin && order.paid && !order.delivered && (
                                  <ListGroup.Item>
                                      <Button variant="primary" style={{ width: '100%' }} onClick={successDeliveredHandler}>Mark as Delivered</Button>
                                  </ListGroup.Item>
                              )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderPage