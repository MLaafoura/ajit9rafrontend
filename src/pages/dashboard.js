import React from 'react'
import Sidebar from '../components/SideBar'
import { HStack, Box, Heading, Flex, Center, Grid, GridItem, VStack, Stack, Divider } from '@chakra-ui/react'
import Stats from '../components/stats'
import Announcement from '../components/Announcement'
import Header from '../components/Header'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function Dashboard({isAuthenticated}) {
    if(!isAuthenticated){
       return <Navigate to="/signin"/>
    }
  return (
    <>
    <Flex>
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
    <GridItem  area={'header'}
        width="100%"
      
    >
        <Header/>
    </GridItem>
   
      
        <GridItem pl='2'  area={'main'}
        width="100%"
        ml="auto"
    >
        <Stack>
        <HStack w="auto" 
            height="auto"
            top={20}
            ml="auto"
            mr="auto"
            mt="2em"
        >
             
            <Flex>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <Stats
                count="132"
                percentage="12%"
                status="Pending"
            />
            <Stats
                count="243"
                percentage="23%"
                status="Applied"
            />
            <Stats
                count="23"
                percentage="1"
                status="Conditional Acceptance"
            />
            <Stats
                count="8"
                percentage="7%"
                status="Awaiting Payment"
            />
            
            <Stats
                count="10"
                percentage="10%"
                status="Paid"
            />
            <Stats
                count="10"
                percentage="10%"
                status="Awaiting Admission"
            />
            <Stats
                count="14"
                percentage="12%"
                status="Awaiting Registration"
            />
            <Stats
                count="15"
                percentage="13%"
                status="Registred"
            />
            </Grid>
            </Flex>
            
        </HStack>
        <Flex
            w="100rem"
            mt="5em"
            bgColor="#CDE8E5"
            ml={10}
            alignContent="left"
            direction="column"
        >
            <Heading 
                mb={5}
                border="1px solid black"
                p={5}
            >Announcements</Heading>
            <Announcement
                title="Uskudar University"
                content="Registration started for AI master (with thesis)"
            />
             <Announcement
                title="Uskudar University"
                content="Master of AI (without thesis)(English) ---- Quota full"
            />
        </Flex>
        </Stack>
        </GridItem>
        </Grid>
        </Flex>
    </>
  )
}

const mapStateProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateProps)(Dashboard)
