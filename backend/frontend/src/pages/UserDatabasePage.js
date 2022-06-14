import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDatabase, deleteUser } from '../reduxActions/userActions'

function UserDatabasePage() {
    const dispatch = useDispatch()
    const userDatabase = useSelector(state => state.userDatabase)
    const { error, userInfo } = userDatabase

    const userDelete = useSelector(state => state.userDelete)
    const { success } = userDelete

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    useEffect(() => {
        dispatch(getUserDatabase())
    }, [dispatch, success, user])

    const userDeletion = (id) => {
        if (window.confirm("Confirm deletion")) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h2>All Users</h2>
            {error ? <h3>{error}</h3>
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo && userInfo.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <strong>Yes</strong>
                                ) : (
                                    <strong>No</strong>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user.id}/edit`}>
                                        <Button>
                                            Edit
                                        </Button>
                                    </LinkContainer>
                                    
                                    <Button variant="danger" onClick={() => userDeletion(user.id)}>
                                        Delete
                                    </Button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default UserDatabasePage