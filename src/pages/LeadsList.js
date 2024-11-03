import React from 'react'
import Leads from '../containers/Leads'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import { Grid, GridItem, Heading } from '@chakra-ui/react'
function LeadsList() {
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
             <Heading color="black" mb="1em">Leads</Heading>
            <Leads/>
      </GridItem>
      </Grid>
    </>
  )
}

export default LeadsList
