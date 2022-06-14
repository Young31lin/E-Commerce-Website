import React, {useEffect} from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row,Col, ListGroup, Button, Card, Image, Form }from 'react-bootstrap'
import {addToCart, removeFromCart} from '../reduxActions/cartActions'


function CartPage() {
  const {id}=useParams()
  const productId=id
  
  let navigate=useNavigate()
  const location=useLocation()
  const qty=location.search ? Number(location.search.split('=')[1]): 1
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart)
  const {cartItems} = cart


  useEffect(()=>{
      if(productId){
          dispatch(addToCart(productId,qty))
      }

  },[dispatch,productId,qty])

  const removeFromCartHandler=(id)=>{
      dispatch(removeFromCart(id))
  }

  const checkoutHandler=()=>{
      navigate('/login?redirect=shipping')
  }
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (<strong> Your cart is Empty! 
                <Link to="/">
                      Go back
                </Link>
            </strong>) : (
                <ListGroup variant="flush">
                    {cartItems.map(item=>(
                        <ListGroup.Item key={item.product}>
                            <Row>
                                    <Col md={2}>
                                        <Image src={'http://127.0.0.1:8000'+item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}/`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.inventory).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>

                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                                    </Col>
                            </Row>

                        </ListGroup.Item>
                    ))}

                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
                        $: {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)} 
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}> Checkout </Button>
                    </ListGroup.Item>

                </ListGroup>
            </Card>
         </Col>
    </Row>
  )
}

export default CartPage