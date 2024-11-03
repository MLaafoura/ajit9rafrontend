import React from 'react'
import { 
         Grid,
         GridItem,
         Heading,
      
        } from '@chakra-ui/react'
import Sidebar from '../components/SideBar'
import StudentAddForm from '../containers/StudentAddForm'
import Header from '../components/Header'
 

function StudentAdd() {
    
  return (
    <Grid
    templateAreas={`"header header"
                    "nav main"
                    "nav main"`}
    gridTemplateRows={'50px 1fr 30px'}
    gridTemplateColumns={'200px 1fr'}
    h='200px'
    gap='1'
    color='blackAlpha.700'
    fontWeight='bold'
    >
    <GridItem pl='2'  area={'nav'}>
        <Sidebar/>
    </GridItem>
    <GridItem pl='2'  area={'header'}
        width="100%"
        ml="auto"
       
       
    >
       <Header/>
    </GridItem>
    <GridItem pl='2' 
              area={'main'}
              width="80%"
              mt="2em"
              ml="auto"
              height="auto"
              mr="auto"
    >
             <Heading color="black" mb="1em">Add a Student</Heading>
            <StudentAddForm/>
      </GridItem>
      </Grid>
  )
}

export default StudentAdd
