import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, Box, Flex, Text, Button, Radio, RadioGroup, Stack, Input, Textarea, Tag, TagLabel,
  Heading,
  Spacer,
  Divider,
  CheckboxGroup,
  Checkbox,
  HStack,
  VStack,
  Select,
  useToast
} from '@chakra-ui/react';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TakeOverLead from './TakeOverLead';

function CommunicationInformation() {
  const toast = useToast()
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [communications, setCommunications] = useState([]);

  const [formData, setFormData] = useState({
    status: 'In Progress',
    lead_quality: 'Medium',
    education_level: 'Graduated / Graduating',
    communication_type: '',
    note: ''
  });

  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/lead/${id}`, config)
      .then(response => setLead(response.data))
      .catch(error => console.error('Error fetching student details:', error));

    axios.get(`http://localhost:8000/communication/${id}`, config)
      .then(response => setCommunications(response.data))
      .catch(error => console.error('Error fetching communications:', error));

  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        communication_type: checked ? value : '' // Set the value if checked, otherwise set to an empty string
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (name) => (value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      lead: id
    };
    axios.post('http://localhost:8000/communication/create', data, config)
      .then(response => {
        console.log(response.data);
        window.location.reload()
      })
      .catch(error => {
        console.error('Error creating communication:', error);
      });
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <Stack>
      <Stack p={5} direction="row">
        <VStack w="90%">
          {lead && (
            <Box mb={5} width="90%" boxShadow='lg'>
              <Box bgColor="#CDE8E5" width="100%" p={2} borderRadius="1em 1em 0 0">
                <Text fontSize="2xl">Student</Text>
              </Box>
              <Flex alignItems="center" bgColor="#EEF7FF" width="100%" p={2} borderRadius="0 0 1em 1em">
                <Box as="span" fontSize="2xl" mr={2}>👤</Box>
                <Flex gap={5}>
                  <Text fontWeight="bold">{lead.fullname}</Text>
                  <Text>{lead.phone_number}</Text>
                  <Text>{lead.email}</Text>
                </Flex>
              </Flex>
            </Box>
          )}

          <Box mb={5} width="90%" boxShadow='lg'>
            <Text fontSize="2xl" bgColor="#CDE8E5" width="100%" p={2} borderRadius="1em 1em 0 0">Communications</Text>
            <Box bgColor="#EEF7FF" width="100%" borderRadius="0 0 1em 1em" p="2em 0 2em 1em">
              <form onSubmit={handleSubmit}>
                <Box mb={4}>
                  <Text mb={2}>Lead Status:</Text>
                  <RadioGroup defaultValue="In Progress" name="status" onChange={handleRadioChange('status')}>
                    <Stack direction="row" gap={4}>
                      <Radio value="New" border="1px solid grey">New</Radio>
                      <Radio value="No Answer 1">No Answer 1</Radio>
                      <Radio value="No Answer 2">No Answer 2</Radio>
                      <Radio value="No Answer 3">No Answer 3</Radio>
                      <Radio value="In Progress">In Progress</Radio>
                      <Radio value="Not Interested">Not Interested</Radio>
                      <Radio value="Invalid">Invalid</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
                <Divider />
                <Flex m="1em 0">
                  <Box mb={4}>
                    <Text mb={2}>Lead Quality:</Text>
                    <RadioGroup defaultValue="Medium" name="lead_quality" onChange={handleRadioChange('lead_quality')}>
                      <Stack direction="row">
                        <Radio value="Low">Low</Radio>
                        <Radio value="Medium">Medium</Radio>
                        <Radio value="High">High</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  <Spacer />
                  <Box mb={4} mr="4em">
                    <Text mb={2}>Education Level:</Text>
                    <RadioGroup defaultValue="Graduated / Graduating" name="education_level" onChange={handleRadioChange('education_level')}>
                      <Stack direction="row">
                        <Radio value="Graduated / Graduating">Graduated / Graduating</Radio>
                        <Radio value="Future Candidate">Future Candidate</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Flex>
                <Divider />
                <Box mb={4}>
                  <Text mb={2}>Communication Type:</Text>
                  <CheckboxGroup>
                    <Stack direction="row" spacing={4} width="95%" ml="auto">
                      <Checkbox
                        value='whatsapp'
                        name="communication_type"
                        border="1px solid grey"
                        width="30%"
                        height="3em"
                        p={2}
                        borderRadius="0.5em"
                        isChecked={formData.communication_type === 'whatsapp'}
                        onChange={handleChange}
                      >
                        <Flex fontSize="1.2em" gap={3}>
                          <HStack color="#0D9276">
                            <FaWhatsapp mt="1em" />
                            <Text> Whatsapp</Text>
                          </HStack>
                        </Flex>
                      </Checkbox>
                      <Checkbox
                        value='email'
                        name="communication_type"
                        border="1px solid grey"
                        width="30%"
                        height="3em"
                        p={2}
                        borderRadius="0.5em"
                        isChecked={formData.communication_type === 'email'}
                        onChange={handleChange}
                      >
                        <Flex fontSize="1.2em" gap={3}>
                          <HStack color="#D71313">
                            <FaEnvelope />
                            <Text>Email</Text>
                          </HStack>
                        </Flex>
                      </Checkbox>
                      <Checkbox
                        value='call'
                        name="communication_type"
                        border="1px solid grey"
                        width="30%"
                        height="3em"
                        p={2}
                        borderRadius="0.5em"
                        isChecked={formData.communication_type === 'call'}
                        onChange={handleChange}
                      >
                        <Flex fontSize="1.2em" gap={3}>
                          <HStack color="#0D1282">
                            <FaPhone />
                            <Text>Call</Text>
                          </HStack>
                        </Flex>
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </Box>

                <Box mb={4}>
                  <Textarea name="note" placeholder="Add a note about this lead..." onChange={handleChange} />
                </Box>
                <Stack direction="row" spacing={4} justify="flex-end" mr="1em">
                  <Button bgColor="#CDE8E5" type="submit">Leave Note</Button>
                  <Button bgColor="#CDE8E5">Retargeting Email</Button>
                </Stack>
              </form>
            </Box>
          </Box>
        </VStack>
        <Box width="40%">
          <Box width="100%" boxShadow='lg'>
            <Text mb={2} fontSize="2xl" bgColor="#CDE8E5" width="100%" p={2} borderRadius="1em 1em 0 0">Communications History</Text>
          </Box>
          <Box>
            {communications.map((comm, index) => (
              <Box key={index} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                <Flex alignItems="center" mb={2}>
                  <Tag size="sm" variant="subtle" colorScheme="cyan" mr={2}>
                    <TagLabel>{comm.communication_type}</TagLabel>
                  </Tag>
                  <Tag size="sm" variant="subtle" colorScheme={comm.status === 'In Progress' ? 'blue' : 'yellow'} mr={2}>
                    <TagLabel>{comm.status}</TagLabel>
                  </Tag>
                  <Text fontSize="sm">{formatDate(comm.date)}</Text>
                </Flex>
                <Text>{comm.note}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
      <Box width="70%" ml="5%" mb="2em">
        <Box bgColor="#CDE8E5" width="100%" p={2} borderRadius="1em 1em 0 0">
          <Text fontSize="2xl">Take Over This Lead:</Text>
        </Box>
        <TakeOverLead />
      </Box>
    </Stack>
  );
}

export default CommunicationInformation;
