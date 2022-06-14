import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../reduxActions/productActions'
import { FormContainer } from '../components/FormContainer'
import axios from 'axios'



function EditProductPage() {
    const productId = useParams();
    let navigate = useNavigate();

    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [inventory, setInventory] = useState(0 )
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const singleProduct = useSelector(state => state.singleProduct)
    const { error, product } = singleProduct

    const productUpdate = useSelector(state => state.productUpdate)
    const { success: successUpdate, error: errorUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: "PRODUCT_UPDATE_RESET" })
            navigate('/admin/productDatabase')
        }
        else {
            if (!product.name || product.id != productId.id) {
                dispatch(getProduct(productId.id))
            }
            else {
                setName(product.name)
                setCategory(product.category)
                setCompany(product.company)
                setPrice(product.price)
                setImage(product.image)
                setInventory(product.inventory)
                setDescription(product.description)
            }
        }
    }, [dispatch, product, productId.id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({id: productId.id, name, price, image, company, category, inventory, description}))
    }

    const uploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('id', productId.id)
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/polls/products/upload/', formData, config)
            setImage(data)
        }
        catch (error) {
            
        }

    }

    return (
        <div>
            <Link to='/admin/productDatabase' className='btn btn-light my-4'>
                Return
            </Link>
            {error ? <h3>{error}</h3>
                :
                <FormContainer>
                    <h2>Edit Product</h2>
                    {errorUpdate && <h3>{errorUpdate}</h3>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='enter username ...' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='company'>
                            <Form.Label>Company</Form.Label>
                            <Form.Control type='text' placeholder='enter company ...' value={company} onChange={(e) => setCompany(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='enter category ...' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='enter price ...' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='inventory'>
                            <Form.Label>Inventory</Form.Label>
                            <Form.Control type='number' placeholder='enter inventory ...' value={inventory} onChange={(e) => setInventory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='enter description ...' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='enter image ...' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>               
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control type ='file' custom="true" onChange={uploadHandler}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </FormContainer>
            }
        </div>
    )
}

export default EditProductPage