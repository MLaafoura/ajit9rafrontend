import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function Stats({count, percentage, status}) {
  return (
    <div>
            <Box backgroundColor="#CDE8E5"  
            textAlign="center" width="15rem" 
            height="10rem"
                borderRadius={5}
                boxShadow="xl"
            >
                <Heading
                pt={3}
                pb={5}
                >{count}</Heading>
                <Text fontSize="md">{percentage}</Text>
                <Text fontSize="lg" mt={4}>{status}</Text>
            </Box>
    </div>
  )
}

export default Stats
