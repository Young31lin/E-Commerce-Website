import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {detail, update} from '../reduxActions/userActions'
import {USER_UPDATE_RESET} from '../constants/UserConstants'
import {showOrder} from '../reduxActions/orderActions'

function ProfilePage() {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message,setMessage]=useState('') 
    const dispatch=useDispatch()
    let navigate=useNavigate()
    const userDetail= useSelector(state=>state.userDetail)
    const {error, loading, user}=userDetail
    const userLogin= useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    const userUpdate= useSelector(state=>state.userUpdate)
    const {success}=userUpdate
    const orderShow= useSelector(state=>state.orderShow)
    const {loading: loadingOrders, error: errorOrders, orders}=orderShow
    useEffect(()=>{
       if(!userInfo){
          navigate('/login')
       }
       else{
           if(!user || !user.name || success || userInfo.id!= user.id){
               dispatch({type:USER_UPDATE_RESET})
               dispatch(detail('profile'))
               dispatch(showOrder())
           }
           else{
               setName(user.name)
               setEmail(user.email)
           }
       }
    
    },[dispatch, user, userInfo, success])

    const submitHandler=(e)=>{
        if(password!=confirmPassword){
            setMessage("passwords do not match")
        }
        else{
            dispatch(update({
                'id': user.id,
                "name": name,
                "password": password,
                "email": email
            }))
            setMessage('')
        }
       
    }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <h3>{message}</h3>}
            {error && <h3>{error}</h3>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type='name' placeholder='enter username ...' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>E-mail address</Form.Label>
                    <Form.Control required type='email' placeholder='enter email ...' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='enter password ...' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Retype password</Form.Label>
                    <Form.Control type='password' placeholder='enter password ...' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My orders</h2>
            {loadingOrders ? (<strong>Loading</strong>): 
             (errorOrders ? (<strong>{error} </strong>):
              (
                  <Table striped responsive className='table-sm'>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Date</th>
                              <th>Total</th>
                              <th>Paid</th>
                              <th>Deliver Status</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {orders.map(order=>(
                              <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.orderCreationDate.substring(0,10)}</td>
                                  <td>${order.totalPrice}</td>
                                  <td>{order.paid ? <strong>Yes </strong> : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                                  <td>{order.delivered ? <strong>Yes </strong> : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                                  <td>
                                      <LinkContainer to={`/order/${order.id}`}>
                                          <Button className='btn-sm'>Details</Button>
                                      </LinkContainer>
                                  </td>
                              </tr>

                          ))}
                      </tbody>
                  </Table>
              ))
            }
        </Col>
    </Row>
  )
}

export default ProfilePage