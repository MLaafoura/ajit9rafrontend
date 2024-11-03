import React, { useState, useEffect } from 'react';
import {
  Flex, Button, Box, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper,
  useSteps, Input, FormLabel, Stack, RadioGroup, Radio, InputGroup, InputLeftAddon, Text, Image, Divider, FormControl, Select, useToast
} from '@chakra-ui/react';
import { FaPhoneAlt, FaFile } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import axios from 'axios';

const steps = [
  { title: 'First', description: 'Student Details' },
  { title: 'Second', description: 'Identity Details' },
  { title: 'Third', description: 'Education Details' },
  { title: 'Fourth', description: 'Review & Submit' }
];

function StudentAddForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    nationality: '',
    father_name: '',
    mother_name: '',
    birth_date: '',
    gender: '',
    student_picture: null,
    passport_id_number: '',
    issue_date: '',
    expiry_date: '',
    passport_id_picture: null,
    last_institution_name: '',
    original_diploma: null,
    translated_diploma: null,
    original_transcript: null,
    translated_transcript: null
  });

  const [countries, setCountries] = useState([]);
  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
    totalSteps: steps.length,
  });

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const onChange = e => {
    const { name, value, files, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const onRadioChange = value => {
    setFormData(prevState => ({
      ...prevState,
      gender: value
    }));
  };

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevClick = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      };


    axios.post('http://localhost:8000/add/student/', data, config)
      .then(response => {
        console.log('Student added successfully:', response.data);
        toast({
            position: 'top-center',
            title: "Student added successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          window.location.reload();
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <>
      <Stack p="2em" borderRadius="0.5em" boxShadow='2xl' rounded='md'>
        <Stepper size='lg' index={activeStep} width="100%" borderBottom="1px solid grey" pb="2em">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <form>
            <Stack mt="2em" p="3%">
              <Flex width="95%" ml="auto">
                <Box width="50%" fontWeight="bold">
                  <FormLabel fontWeight="bold">Full Name</FormLabel>
                  <Input width="90%" type="text" name="fullname" value={formData.fullname} onChange={onChange} />
                </Box>
                <Box width="50%">
                  <FormLabel fontWeight="bold">Email</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><MdAlternateEmail /></InputLeftAddon>
                    <Input width="90%" type="email" name="email" value={formData.email} onChange={onChange} />
                  </InputGroup>
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="50%">
                  <FormLabel fontWeight="bold">Phone</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaPhoneAlt /></InputLeftAddon>
                    <Input type='tel' name="phone_number" value={formData.phone_number} onChange={onChange} />
                  </InputGroup>
                </Box>
                <Box width="50%">
                  <FormLabel fontWeight="bold">Nationality</FormLabel>
                  <Select width="90%" name="nationality" value={formData.nationality} onChange={onChange}>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="50%">
                  <FormLabel fontWeight="bold">Father Name</FormLabel>
                  <Input width="90%" type="text" name="father_name" value={formData.father_name} onChange={onChange} />
                </Box>
                <Box width="50%">
                  <FormLabel fontWeight="bold">Mother Name</FormLabel>
                  <Input width="90%" type="text" name="mother_name" value={formData.mother_name} onChange={onChange} />
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="50%">
                  <FormLabel fontWeight="bold">Birth Date</FormLabel>
                  <Input width="90%" type="date" name="birth_date" value={formData.birth_date} onChange={onChange} />
                </Box>
                <Box width="50%">
                  <FormLabel fontWeight="bold">Gender</FormLabel>
                  <RadioGroup name="gender" value={formData.gender} onChange={onRadioChange}>
                    <Radio value="M" mr="1em">Male</Radio>
                    <Radio value="F">Female</Radio>
                  </RadioGroup>
                </Box>
              </Flex>
            </Stack>
          </form>
        )}

        {activeStep === 1 && (
          <form>
            <Stack mt="2em" p="3%">
              <Flex width="95%" ml="auto">
                <Box width="100%" fontWeight="bold">
                  <FormLabel fontWeight="bold">Student Picture</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><AiFillPicture /></InputLeftAddon>
                    <Input type='file' name="student_picture" onChange={onChange} />
                  </InputGroup>
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="100%">
                  <FormLabel fontWeight="bold">Passport Number / ID Card</FormLabel>
                  <Input width="90%" type="text" name="passport_id_number" value={formData.passport_id_number} onChange={onChange} />
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Issue Date</FormLabel>
                  <Input width="90%" type="date" name="issue_date" value={formData.issue_date} onChange={onChange} />
                </Box>
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Expiry Date</FormLabel>
                  <Input width="90%" type="date" name="expiry_date" value={formData.expiry_date} onChange={onChange} />
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="100%">
                  <FormLabel fontWeight="bold">Passport / ID Card</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaFile /></InputLeftAddon>
                    <Input type='file' name="passport_id_picture" onChange={onChange} />
                  </InputGroup>
                </Box>
              </Flex>
            </Stack>
          </form>
        )}

        {activeStep === 2 && (
          <form>
            <Stack mt="2em" p="3%">
              <Flex width="95%" ml="auto">
                <Box width="100%" fontWeight="bold">
                  <FormLabel fontWeight="bold">Last Institution</FormLabel>
                  <Input width="90%" type="text" name="last_institution_name" value={formData.last_institution_name} onChange={onChange} />
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Original Diploma</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaFile /></InputLeftAddon>
                    <Input type='file' name="original_diploma" onChange={onChange} />
                  </InputGroup>
                </Box>
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Translated Diploma</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaFile /></InputLeftAddon>
                    <Input type='file' name="translated_diploma" onChange={onChange} />
                  </InputGroup>
                </Box>
              </Flex>
              <Flex width="95%" ml="auto" mt="2em">
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Original Transcript</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaFile /></InputLeftAddon>
                    <Input type='file' name="original_transcript" onChange={onChange} />
                  </InputGroup>
                </Box>
                <Box width="47.5%">
                  <FormLabel fontWeight="bold">Translated Transcript</FormLabel>
                  <InputGroup width="90%">
                    <InputLeftAddon><FaFile /></InputLeftAddon>
                    <Input type='file' name="translated_transcript" onChange={onChange} />
                  </InputGroup>
                </Box>
              </Flex>
            </Stack>
          </form>
        )}

        {activeStep === 3 && (
          <Stack mt="2em" p="3%">
            <Heading as="h3" size="lg">Review Information</Heading>
            <Divider mt="1em" mb="1em" />
            <Text fontWeight="bold">Full Name: {formData.fullname}</Text>
            <Text fontWeight="bold">Email: {formData.email}</Text>
            <Text fontWeight="bold">Phone: {formData.phone_number}</Text>
            <Text fontWeight="bold">Nationality: {formData.nationality}</Text>
            <Text fontWeight="bold">Father's Name: {formData.father_name}</Text>
            <Text fontWeight="bold">Mother's Name: {formData.mother_name}</Text>
            <Text fontWeight="bold">Birth Date: {formData.birth_date}</Text>
            <Text fontWeight="bold">Gender: {formData.gender === 'M' ? 'Male' : 'Female'}</Text>
            <Text fontWeight="bold">Passport Number: {formData.passport_id_number}</Text>
            <Text fontWeight="bold">Issue Date: {formData.issue_date}</Text>
            <Text fontWeight="bold">Expiry Date: {formData.expiry_date}</Text>
            <Text fontWeight="bold">Last Institution: {formData.last_institution_name}</Text>
            
            <Flex mt="2em" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">Student Picture:</Text>
                {formData.student_picture && (
                  <Image src={URL.createObjectURL(formData.student_picture)} alt="Student Picture" boxSize="150px" objectFit="cover" />
                )}
              </Box>
              <Box>
                <Text fontWeight="bold">Passport/ID Card Picture:</Text>
                {formData.passport_id_picture && (
                  <Image src={URL.createObjectURL(formData.passport_id_picture)} alt="Passport/ID Card Picture" boxSize="150px" objectFit="cover" />
                )}
              </Box>
            </Flex>

            <Divider mt="2em" mb="2em" />

            <Flex justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">Original Diploma:</Text>
                {formData.original_diploma && (
                  <Text>{formData.original_diploma.name}</Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="bold">Translated Diploma:</Text>
                {formData.translated_diploma && (
                  <Text>{formData.translated_diploma.name}</Text>
                )}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" mt="2em">
              <Box>
                <Text fontWeight="bold">Original Transcript:</Text>
                {formData.original_transcript && (
                  <Text>{formData.original_transcript.name}</Text>
                )}
              </Box>
              <Box>
                <Text fontWeight="bold">Translated Transcript:</Text>
                {formData.translated_transcript && (
                  <Text>{formData.translated_transcript.name}</Text>
                )}
              </Box>
            </Flex>
          </Stack>
        )}

        <Flex mt="2em" justifyContent="space-between">
          {activeStep > 0 && (
            <Button onClick={handlePrevClick}>Previous</Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNextClick}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </Flex>
      </Stack>
    </>
  );
}

export default StudentAddForm;
