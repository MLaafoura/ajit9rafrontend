import React from 'react'
import { Flex, VStack, Text, Heading, Box } from '@chakra-ui/react'

function Notifications() {
  return (
    <>
       <Box p={4} shadow='md' borderWidth='1px'>
            <Heading fontSize='xl'>title</Heading>
            <Text mt={4}>Content of notification</Text>
        </Box>
    </>
  )
}

export default Notifications
