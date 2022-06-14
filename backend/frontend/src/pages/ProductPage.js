import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../Rating'
import { useDispatch, useSelector} from 'react-redux'
import { getProduct, reviewProduct } from '../reduxActions/productActions'
import {REVIEW_CREATE_RESET} from '../constants/ProductConstants'

function ProductPage({ match, history}) {
    const [qty, setQty]=useState(1)
    const [rating, setRating]=useState(0)
    const [comment, setComment]=useState('')


    const dispatch = useDispatch()
    const singleProduct = useSelector(state => state.singleProduct)
    const { loading, product, error } = singleProduct

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productReviewCreate = useSelector(state => state.productReview)
    const { loading: loadingReview, success: successReview, error: errorReview } = productReviewCreate

    const { id } = useParams()
    let navigate=useNavigate()
    useEffect(() => {
        if(successReview){
            setRating(0)
            setComment('')
            dispatch({type : REVIEW_CREATE_RESET})
        }
        dispatch(getProduct(id))
    }, [dispatch, successReview])

    const addToCartHandler=()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }
    const submitReviewHandler=(e)=>{
        e.preventDefault()
        dispatch(reviewProduct(id, {rating, comment}))
    }
    return (
        <div>
            <Link to='/' className='btn btn-light my-4'> Return</Link>
            {error ? <h3>{error}</h3>
                :
                <div>
                    <Row>
                        <Col md={6}>
                            <Image src={'http://127.0.0.1:8000'+ product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup style={{ textAlign: 'center' }} >
                                <ListGroup.Item>
                                    <h4>{product.name}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} value2={product.reviews} />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: 'left' }}>
                                    <strong><i>About this item: </i></strong> <br></br>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup style={{ textAlign: 'center' }}>
                                <ListGroup.Item>
                                    <strong><h4>Price: ${product.price}</h4></strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Status: {product.inventory > 0 ? 'In-Stock' : 'Out of Stock'}
                                </ListGroup.Item>
                                {product.inventory > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col xs="auto" className="my-1">
                                                <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.inventory).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button variant="primary" style={{ width: '90%' }} disabled={product.inventory < 1} onClick={addToCartHandler}>Add to Cart</Button>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: 'left' }}>
                                    <strong><i>Reviews:</i></strong>
                                {product.review ? product.review.map((review) => (
                                    <ListGroup.Item key={review.id} className='mt-3'>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#f8e825' />
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                )) : ""}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>                  
                            <ListGroup variant='flush'>
                            
                                <ListGroup.Item>
                                    <h4>Write a review</h4>
                                    {loadingReview && <h4>Loading</h4>}
                                    {successReview && <h4>Succesfully submitted a review!</h4>}
                                    {errorReview && <h4>{errorReview}</h4>}
                                    {userInfo ? (
                                       <Form onSubmit={submitReviewHandler}>
                                           <Form.Group controlId='rating'>
                                               <Form.Label>
                                                   Rating:
                                               </Form.Label>
                                               <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                                   <option value=''>select...</option>
                                                   <option value='1'>1 - Poor </option>
                                                   <option value='2'>2 - Fair</option>
                                                   <option value='3'>3 - Good </option>
                                                   <option value='4'>4 - Very Good</option>
                                                   <option value='5'>5 - Excellent</option>
                                               </Form.Control>
                                            
                                           </Form.Group>
                                           <Form.Group controlId='comment'>
                                               <Form.Label>
                                                   Review:
                                               </Form.Label>
                                               <Form.Control as = 'textarea' row ='5' value = {comment} onChange = {(e)=>setComment(e.target.value)}>

                                               </Form.Control>
                                           </Form.Group>
                                           <Button disabled = {loadingReview} type='submit' variant='primary' className='mt-3'>Submit</Button>
                                       </Form>
                                    ): (
                                        <Link to='/login'>Login</Link>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>

                        </Col>

                    </Row>
                </div>
            }
        </div>
    )
}

export default ProductPage