import React from 'react'
import { 
    Grid,
    GridItem,
    Heading,
 
   } from '@chakra-ui/react'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import StudentList from '../containers/StudentList'


function ListStudent() {
  return (
    <>
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
              width="90%"
              mt="4em"
              ml="auto"
              height="auto"
              mr="auto"
    >
            <Heading color="black" mb="1em">List of Students</Heading>
            <StudentList/>
      </GridItem>
      </Grid>
    </>
  )
}

export default ListStudent
