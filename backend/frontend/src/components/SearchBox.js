import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
function SearchBox() {
  let navigate=useNavigate()

  const [keyword, setKeyword]=useState('')
  const submitHandler=(e)=>{
      e.preventDefault()
      if(keyword){
          navigate(`/?keyword=${keyword}&page=1`)
      }
      else{
      }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control type='text' name='q' onChange={(e)=>{setKeyword(e.target.value)}} className='mr-sm-2 ml-sm-5'>
        </Form.Control>
        <Button type='submit' variant='primary' className='ms-1'>Submit</Button>
    </Form>
  )
}

export default SearchBox