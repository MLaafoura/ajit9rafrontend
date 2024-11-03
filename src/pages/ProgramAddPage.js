import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import { Grid, GridItem, Heading, Box, Center } from '@chakra-ui/react'
import ProgramAddForm from '../components/ProgramAddForm'
import { Link } from 'react-router-dom'


function ProgramAddPage() {
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
              width="80%"
              mt="2em"
              ml="auto"
              height="auto"
              mr="auto"
    >         
    <Box bgImage="url('https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
            height="30em"
            boxShadow='dark-lg' 
            rounded='md'
           
        >
            <Box width="100%"
                height="100%"
                bg="whiteAlpha.400"
                 p='1em 0 0 1em'
            >
             <Heading color="white" 
                      mb="1em" 
                      width="auto"
                      textShadow='2px 2px 4px black'
                      >Add a Program</Heading>
           </Box>
             </Box>
             <Box mt="-20em">
                <ProgramAddForm/>
             </Box>
             <Box ml="auto" mr="auto" mt="1em">
                <Center>
                    <Link to='/program-list'>Check Existed Programs</Link>
                </Center>
             </Box>
      </GridItem>
      </Grid>
    </>
  )
}

export default ProgramAddPage
