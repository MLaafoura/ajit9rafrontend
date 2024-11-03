import React, { useState } from 'react';
import {
  Box, Flex, Text, Button, Input, Select, Radio, RadioGroup, Stack, FormControl, useToast
} from '@chakra-ui/react';
import axios from 'axios';

function TakeOverLead() {
  const toast = useToast()
  const [formData, setFormData] = useState({
    birth_date: '',
    passport_id_number: '',
    passport_id_picture: null,
    nationality: '',
    father_name: '',
    mother_name: '',
    gender: 'male'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/add/student/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      console.log('Student data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting student data:', error);
    }
  };

  const handlesstudentSubmit = (e) => {
    toast({   
      title: 'Student added.',
      description: "Student Added to the list.",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position:'top-center'
    });

    };

  return (
  
      <Flex direction="column" gap={4} bgColor="#EEF7FF" width="100%" p={2} pt="1em" borderRadius="0 0 1em 1em" onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
        <Flex>
          <Box flex="1" mr={2}>
            
            <Text mb={2}>Birth Date</Text>
            <Input
              type="date"
              name="birth_date"
              placeholder="Select Date.."
              onChange={handleChange}
            />
          </Box>
          <Box flex="1" ml={2}>
            <Text mb={2}>Passport Num / ID Card</Text>
            <Input
              name="passport_id_number"
              placeholder="M123456"
              onChange={handleChange}
            />
          </Box>
        </Flex>
        <Flex>
          <Box flex="1" mr={2}>
            <Text mb={2}>Passport / ID Card</Text>
            <Input
              type="file"
              name="passport_id_picture"
              onChange={handleChange}
            />
          </Box>
          <Box flex="1" ml={2}>
            <Text mb={2}>Nationality</Text>
            <Select name="nationality" placeholder="Select Nationality" onChange={handleChange}>
              <option value="morocco">Morocco</option>
              <option value="other">Other</option>
            </Select>
          </Box>
        </Flex>
        <Flex>
          <Box flex="1" mr={2}>
            <Text mb={2}>Father Name</Text>
            <Input
              name="father_name"
              placeholder="Enter Father's Name"
              onChange={handleChange}
            />
          </Box>
          <Box flex="1" ml={2}>
            <Text mb={2}>Mother Name</Text>
            <Input
              name="mother_name"
              placeholder="Enter Mother's Name"
              onChange={handleChange}
            />
          </Box>
        </Flex>
        <Flex align="center" my={4}>
          <Text mr={4}>Gender</Text>
          <RadioGroup defaultValue="male" name="gender" onChange={(value) => setFormData({ ...formData, gender: value })}>
            <Stack direction="row">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        <Button bgColor="#CDE8E5" size="lg" type="submit" onClick={handlesstudentSubmit}>Move To Students List</Button>
        </form>
      </Flex>
   
  );
}

export default TakeOverLead;
