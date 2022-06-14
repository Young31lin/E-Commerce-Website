import React, {useState, useEffect} from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Rating from '../Rating'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../reduxActions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'


function HomePage({history, match}) {


    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, products, error, page, pages} = productList

    
    let location = useLocation()
    let keyword = location.search
    useEffect(() => {  
        dispatch(getProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <h1 style={{ margin: '2rem' }}>Products</h1>

            {error ? <h3>{error}</h3>
                :
                <div>
                <Row>
                    {products && products.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Card style={{ width: '20rem', height: '30rem', textAlign: 'center', margin: '2rem', position:'relative' }}>
                                <Link to={'/products/' + parseInt(product.id)}>
                                    <Card.Img src={'http://127.0.0.1:8000' + product.image} style={{ height: 'auto', maxHeight: '250px', width: 'auto', maxWidth: '250px',  }}  />
                                </Link>

                                <Card.Body >
                                    <Card.Title as='h5'>
                                        <Link to={'/products/' + parseInt(product.id)}>
                                            <Button variant="dark" style={{ width: '90%' }}><strong>{product.name}</strong></Button>
                                        </Link>
                                    </Card.Title>

                                    <Card.Text>
                                        <Rating value={product.rating} value2={product.reviews} />
                                    </Card.Text>

                                    <Card.Text as='h3'>
                                        ${product.price}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                    <Paginate page={page} pages={pages} keyword={keyword}/>
                </div>
            }
            
        </div>
    )
}

export default HomePage