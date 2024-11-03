import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ApplyForm from '../components/ApplyForm'
import { Box } from '@chakra-ui/react'

function ApplyPage() {
  return (
    <>
      <NavBar/>
      <Box bgImage="url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            height="30em"
            boxShadow='dark-lg' 
            rounded='md'
           
        >
      <ApplyForm/>
      </Box>
      <Box mt="10em">
        <Footer/>
      </Box>
    </>
  )
}

export default ApplyPage
