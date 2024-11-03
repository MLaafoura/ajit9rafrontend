import React, { useState } from 'react';
import axios from 'axios';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Center, Text, useToast } from '@chakra-ui/react';

function ApplyForm() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/add/lead/', formData, config)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        toast({   
          title: 'Thank you.',
          description: "We've received your information, We will contact you as soon as possible.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:'top-center'
        });
  
        // Reset form
        setFormData({
          name: '',
          phone_number: '',
          email: '',
        });
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error, e.g., show an error message
      });
  };


  return (
    <Box>
      <Center>
        <VStack
          width="50%"
          ml="auto"
          mr="auto"
          boxShadow="2xl"
          pb="4em"
          borderRadius="1em"
          bgColor="white"
          pt="2em"
          mt="60em"
          position="absolute"
        >
          <form width="100%" onSubmit={handleSubmit}>
            <Center>
              <VStack mt="1em" mb="3em">
                <Box>
                  <Heading>Apply Now</Heading>
                </Box>
                <Box>
                  <Text fontSize="20px">
                    Submit your Information, We will contact you soon.
                  </Text>
                </Box>
              </VStack>
            </Center>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                width="40em"
                mt="0.5em"
                mb="1em"
                border="1px solid grey"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormLabel>Phone Number</FormLabel>
              <Input
                mt="0.5em"
                mb="1em"
                border="1px solid grey"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <FormLabel>Email</FormLabel>
              <Input
                mt="0.5em"
                mb="1em"
                border="1px solid grey"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Center>
                <Button type="submit" mt="3em" width="30%">
                  Submit
                </Button>
              </Center>
            </FormControl>
          </form>
        </VStack>
      </Center>
    </Box>
  );
}

export default ApplyForm;
