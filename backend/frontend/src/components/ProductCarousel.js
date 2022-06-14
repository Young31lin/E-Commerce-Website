import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import {topProducts} from '../reduxActions/productActions'

function ProductCarousel() {
  const dispatch = useDispatch()
  const productTopRate = useSelector(state => state.productTop)
  const {loading, error, products} =  productTopRate

  useEffect(()=>{
    dispatch(topProducts())
  },[dispatch])
  return (
   <Carousel pause='hover' className='bg-white'>
     {products.map((product)=>(
       <Carousel.Item key={product.id}>
         <Link to={`/product/${product.id}`}>
         <Image src={'http://127.0.0.1:8000'+product.image} alt={product.name} fluid/>
         <Carousel.Caption className='carousel.caption'>
           <h4>
             {product.name} (${product.price})
           </h4>
         </Carousel.Caption>
         </Link>
       </Carousel.Item>
     ))}
   </Carousel>


  )
}

export default ProductCarousel