import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import AnnouncementList from '../components/AnnouncementList'


function AnnouncementPage() {
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
   
      
        <GridItem pl='2'  area={'main'}
        width="90%"
        ml="auto"
        mr="auto"
        mt="2em"
      
    >

       <AnnouncementList/>

    </GridItem>
      </Grid>
    
    </>
  )
}

export default AnnouncementPage
