import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showAllOrder } from '../reduxActions/orderActions'

function OrderDatabasePage() {
    const dispatch = useDispatch()
    const orderDatabase = useSelector(state => state.orderShowAll)
    const { error, orders } = orderDatabase

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    useEffect(() => {
        dispatch(showAllOrder())
    }, [dispatch, user])

    return (
        <div>
            <h2>Orders</h2>
            {error ? <h3>{error}</h3>
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Price</th>
                            <th>Order Creation Date</th>
                            <th>Paid</th>
                            <th>Shipped</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderCreationDate.substring(0,10)}</td>
                                <td>{order.paid ? (
                                    order.paymentMethod.substring(0, 50)
                                ) : (
                                    <strong>Not Paid</strong>
                                )}</td>
                                <td>{order.shipped ? (
                                    order.deliveryDate.substring(0, 10)
                                ) : (
                                    <strong>Not Shipped</strong>
                                )}</td>
                                <td>{order.delivered ? (
                                    order.deliveredDate.substring(0, 10)
                                ) : (
                                    <strong>Not Delivered</strong>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                        <Button>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default OrderDatabasePage