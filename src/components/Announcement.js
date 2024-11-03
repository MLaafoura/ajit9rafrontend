import React from 'react'
import { Box, Text } from '@chakra-ui/react'

function Announcement({title, content}) {
  return (
    <Box backgroundColor="#EEF7FF" 
        m={2}
    >
        <Text fontSize="lg" 
            fontWeight="bold"
            m={2}
        >{title}</Text>
        <Text fontSize="md"
            ml={5}
            mb={5}
        >{content}</Text>
    </Box>
  )
}

export default Announcement
