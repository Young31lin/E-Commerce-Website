import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import { Navigate, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {savePaymentMethod} from '../reduxActions/cartActions'
import {FormContainer} from '../components/FormContainer'
import {Checkout} from '../components/Checkout'

function PaymentPage() {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const dispatch=useDispatch()
    let navigate=useNavigate()
    if(!shippingAddress){
        navigate('/shipping')
    }
    const [payment, setPayment]=useState('PayPal')
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod({payment}))
        navigate('/placeOrder')
    }
  return (
    <FormContainer>
        <Checkout step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select methods
                </Form.Label>
                <Col>
                    <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='payment' checked onChange={(e)=>setPayment(e.target.value)}>       
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
       
    </FormContainer>
  )
}

export default PaymentPage