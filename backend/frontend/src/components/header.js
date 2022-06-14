import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from "../reduxActions/userActions"
import SearchBox from './SearchBox.js'

export function Header() {

  const userLogin= useSelector(state=> state.userLogin)
  const {userInfo}=userLogin
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(logout())
  }
  
  return (
    <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>ShopCo</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="ml-auto">
                      {userInfo? (
                        <NavDropdown title={userInfo.name} id='username'>
                               <LinkContainer to='/profile'>
                                   <NavDropdown.Item>Profile</NavDropdown.Item>
                               </LinkContainer>
                               <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                      ):(
                        <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                      )
                          }

                          {userInfo && userInfo.isAdmin && (
                              <NavDropdown title='Manage' id='adminPriviledges'>
                                  <LinkContainer to='/admin/userDatabase'>
                                      <NavDropdown.Item>Users</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to='/admin/productDatabase'>
                                      <NavDropdown.Item>Products</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to='/admin/orderDatabase'>
                                      <NavDropdown.Item>Orders</NavDropdown.Item>
                                  </LinkContainer>
                              </NavDropdown>
                          )}
                        <LinkContainer to='/cart'>
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>          
  )
}

export default Header
