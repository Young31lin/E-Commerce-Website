import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detail, updateIndividualUser } from '../reduxActions/userActions'
import { FormContainer } from '../components/FormContainer'
import { USER_UPDATE_INDIVIDUAL_SUCCESS, USER_UPDATE_INDIVIDUAL_RESET } from '../constants/UserConstants'



function EditUserPage() {
    const userId  = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { error, user } = userDetail
    
    const userUpdateIndividual = useSelector(state => state.userUpdateIndividual)
    const { error: errorUpdate, success } = userUpdateIndividual
  
    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_INDIVIDUAL_SUCCESS })
            navigate('/admin/userDatabase')
            dispatch({ type: USER_UPDATE_INDIVIDUAL_RESET })
        }
        else {
            if (!user.name || user.id != userId.id) {
                dispatch(detail(userId.id))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                
                setAdmin(user.isAdmin)
               
            }
        }
    }, [user, userId.id, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        const userInput = {
            id: user.id,
            name,
            email,
            isAdmin,
        }
        dispatch(updateIndividualUser(userInput))
    }

    return (
        <div>
            <Link to='/admin/userDatabase' className='btn btn-light my-4'>
                Return
            </Link>
            {error ? <h3>{error}</h3>
                :
                <FormContainer>
                    <h2>Edit User</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='name' placeholder='enter username ...' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>E-mail address</Form.Label>
                            <Form.Control type='email' placeholder='enter email ...' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='is_admin'>
                            <Form.Check inline type='checkbox' label='Admin' checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)} />
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>

                </FormContainer>
            }
        </div>
    )
}

export default EditUserPage