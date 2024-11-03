// src/components/AddUniversity.js
import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ProgramAddForm = () => {
  const [formData, setFormData] = useState({
    university_name: '',
    program_name: '',
    university_location: '',
    program_description: '',
    program_image: null,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'program_image') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('university_name', formData.university_name);
    data.append('program_name', formData.program_name);
    data.append('university_location', formData.university_location);
    data.append('program_description', formData.program_description);
    if (formData.program_image) {
      data.append('program_image', formData.program_image);
    }

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      };
      
      try {
        await axios.post('http://localhost:8000/add/program/', data, config);

      toast({   
        title: 'University added.',
        description: "We've added your university to the list.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        university_name: '',
        program_name: '',
        university_location: '',
        program_description: '',
        program_image: null,
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to add university.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      
      <Box
        as="form"
        onSubmit={handleSubmit}
        maxW="md"
        mx="auto"
        p={6}
        shadow="lg"
        borderWidth="1px"
        rounded="lg"
        bg="white"
      >
        <Heading mb="1.5em" textAlign="center" color="black" 
        textShadow='1px 2px 4px lightgrey'
        fontSize="1.5em"
      > 
        Add a New Program
      </Heading>
        <Stack spacing={4}>
          <FormControl id="university_name" isRequired>
            <FormLabel>University Name</FormLabel>
            <Input
              type="text"
              name="university_name"
              value={formData.university_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="program_name" isRequired>
            <FormLabel>Program Name</FormLabel>
            <Input
              type="text"
              name="program_name"
              value={formData.program_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="university_location" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              name="university_location"
              value={formData.university_location}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="program_description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="program_description"
              value={formData.program_description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="program_image">
            <FormLabel>Program Image</FormLabel>
            <Input
              type="file"
              name="program_image"
              onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Add University
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProgramAddForm;
