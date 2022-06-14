import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import { Navigate, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../reduxActions/cartActions'
import {FormContainer} from '../components/FormContainer'
import {Checkout} from '../components/Checkout'


function ShippingPage() {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const[address,setAddress]=useState(shippingAddress ? shippingAddress.address : '')
    const[city,setCity]=useState(shippingAddress ? shippingAddress.city : '')
    const[postal,setPostal]=useState(shippingAddress ? shippingAddress.postal : '')
    const[country,setCountry]=useState(shippingAddress ? shippingAddress.country : '')
    const dispatch=useDispatch()
    let navigate=useNavigate()
    const submitHandler=(e)=>{
         e.preventDefault()
         dispatch(saveShippingAddress({address, city, postal, country}))
         navigate('/payment')
    }

  return (
    <FormContainer>
        <Checkout step1 step2/>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control required type='text' placeholder='enter address ...' value={address ? address : ''} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control required type='text' placeholder='enter city ...' value={city ? city : ''} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postal'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control required type='text' placeholder='enter postal code ...' value={postal ? postal : ''} onChange={(e)=>setPostal(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control required type='text' placeholder='enter country ...' value={country ? country : ''} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingPage