import { Container, Row, Navbar, Nav } from 'react-bootstrap'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserDatabasePage from './pages/UserDatabasePage'
import EditUserPage from './pages/EditUserPage'
import ProductDatabasePage from './pages/ProductDatabasePage'
import EditProductPage from './pages/EditProductPage'
import OrderDatabasePage from './pages/OrderDatabasePage'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import React, { Component }  from 'react';
import {Header} from './components/header'
import {Footer} from './components/footer'

//https://react-bootstrap.github.io/components/navbar/ 
function App() {
    return (

        <HashRouter>
        <Header />
            <main>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path="products" element={<ProductPage />} >
                            <Route path=":id" element={<ProductPage />} />
                        </Route>
                        <Route path="cart" element={<CartPage />} >
                            <Route path=":id" element={<CartPage />} />
                        </Route>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/shipping' element={<ShippingPage />} />
                        <Route path='/payment' element={<PaymentPage />} />
                        <Route path='/placeOrder' element={<PlaceOrderPage />} />
                        <Route path='/order/:id' element={<OrderPage />} />
                        <Route path='/admin/userDatabase' element={<UserDatabasePage />} />
                        <Route path='/admin/user/:id/edit' element={<EditUserPage />} />
                        <Route path='/admin/productDatabase' element={<ProductDatabasePage />} />
                        <Route path='/admin/product/:id/edit' element={<EditProductPage />} />
                        <Route path='/admin/orderDatabase' element={<OrderDatabasePage />} />
                    </Routes>
                </Container>
            </main>
        <Footer/>
        </HashRouter>
  );
}

export default App;
