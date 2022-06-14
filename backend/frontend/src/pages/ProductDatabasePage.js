import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, deleteProduct, createProduct } from '../reduxActions/productActions'
import { useNavigate , useLocation} from 'react-router-dom'
import Paginate from '../components/Paginate'

function ProductDatabasePage({ history, match }) {

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const productList = useSelector(state => state.productList)
    const { error, products, loading, page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { error: errorDeleting, success: successfullyDeleted } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { error: errorCreating, success: successfullyCreated, product: createdProduct } = productCreate

    let keyword = useLocation().search


    useEffect(() => {
        dispatch({type: "PRODUCT_CREATE_RESET"})
        if (successfullyCreated) {
            navigate(`/admin/product/${createdProduct.id}/edit`)
        }
        else {
            dispatch(getProducts(keyword))
        }     
    }, [dispatch, history, userInfo, successfullyDeleted, successfullyCreated, createdProduct, keyword])

    const productDeletion = (id) => {
        if (window.confirm("Confirm deletion")) {
            dispatch(deleteProduct(id))
        }
    }

    const productCreation = (product) => {
        console.log('yes')
        dispatch(createProduct())
        
    }

    return (
        <div>
            <Row>
                <Col className = 'mt-2'>
                    <h2 className = 'ms-4'>Products</h2>
                </Col>
                <Col sm={3} className='mt-3'>
                    <Button variant = 'primary' size = 'lg' onClick={productCreation} className='ms-4'>
                        Add Product
                    </Button>
                </Col>
            </Row>

            {errorDeleting && <h3>{errorDeleting}</h3>}
            {errorCreating && <h3>{errorCreating}</h3>}

            {error ? <h3>{error}</h3>
                :
                <div>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Inventory</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.company}</td>
                                <td>{product.inventory}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                        <Button>
                                            Edit
                                        </Button>
                                    </LinkContainer>

                                    <Button variant="danger" onClick={() => productDeletion(product.id)}>
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate page={page} pages={pages} isAdmin={true} />
                </div>
            }

        </div>
    )
}

export default ProductDatabasePage