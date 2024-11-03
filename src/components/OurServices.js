import React from 'react'
import { Box, SimpleGrid, Stack, Image, Heading, Text, useColorModeValue, Center } from '@chakra-ui/react'
function OurServices() {

    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');
  return (
    <>
        <Center>
            <Heading mt="2em">Our Services</Heading>
        </Center>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="80%" ml="auto" mr="auto" mt="5em">
        
          <Box
            p={5}
            shadow="lg"
            borderWidth="1px"
            rounded="lg"
            bg={bg}
            color={color}
            overflow="hidden"
            _hover={{ shadow: '2xl', transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            <Image
             
              roundedTop="lg"
              w="100%"
              h="200px"
              objectFit="cover"
              src='https://plus.unsplash.com/premium_photo-1682284079705-dd1631f76f3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D' 

            />
            <Stack spacing={3} mt={3}>
              <Heading fontSize="xl">University Registration</Heading>
              <Text>Providing a list of universities and programs.</Text>
            </Stack>
          </Box>

          <Box
            p={5}
            shadow="lg"
            borderWidth="1px"
            rounded="lg"
            bg={bg}
            color={color}
            overflow="hidden"
            _hover={{ shadow: '2xl', transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            <Image
             
              roundedTop="lg"
              w="100%"
              h="200px"
              objectFit="cover"
              src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 

            />
            <Stack spacing={3} mt={3}>
              <Heading fontSize="xl">Submitting your file</Heading>
              <Text>We will submit all your files to the university.</Text>
            </Stack>
          </Box>

          <Box
            p={5}
            shadow="lg"
            borderWidth="1px"
            rounded="lg"
            bg={bg}
            color={color}
            overflow="hidden"
            _hover={{ shadow: '2xl', transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            <Image
             
              roundedTop="lg"
              w="100%"
              h="200px"
              objectFit="cover"
              src='https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 

            />
            <Stack spacing={3} mt={3}>
              <Heading fontSize="xl">Process Following</Heading>
              <Text>We will follow your registration process</Text>
            </Stack>
          </Box>
       
      </SimpleGrid>
    </>
  )
}

export default OurServices
