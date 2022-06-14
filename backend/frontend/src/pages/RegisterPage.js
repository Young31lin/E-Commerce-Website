import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../reduxActions/userActions'
import {FormContainer} from '../components/FormContainer'



function RegisterPage() {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [message,setMessage]=useState('') 

    const dispatch=useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !=confirmPassword){
            setMessage("passwords do not match")
        }else{
            dispatch(
                register(name, email,password)
       )}
    }
    let location=useLocation()
    let navigate=useNavigate()
    const redirect= location.search ? location.search.split("=")[1] : "/"
    const userRegister= useSelector(state=>state.userRegister)
    const {error, loading, userInfo}=userRegister
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    
    },[userInfo, redirect])

  return (
    <FormContainer>
         <h1>login</h1>
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
                <Form.Control required type='password' placeholder='enter password ...' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Retype password</Form.Label>
                <Form.Control required type='password' placeholder='enter password ...' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className="py-3">
            <Col>
              Have an account? <Link to={'/login'}> Login </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterPage