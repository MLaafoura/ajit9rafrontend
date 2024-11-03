import React,{useState, useEffect} from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Image,
  Badge,
  useColorModeValue,
  Input,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react';
import axios from 'axios';
import { FaSearch, FaChevronDown } from "react-icons/fa";


const ProgramList = () => {

  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  
  /*
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/city?country=Turkey', {
          headers: { 'X-Api-Key': 'YOUR_API_KEY' },
        });
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    fetchCities();
  }, []); */

  const fetchUniversities = async (city) => {
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=turkey&name=${city}`);
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };
  
  const handleCityChange = (city) => {
    setSelectedCity(city);
    fetchUniversities(city);
  };

  

  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const getPrograms = () => {
    try{
        axios.get(`${process.env.REACT_APP_API_URL}programs/`, config)
        .then((response) =>{
          const allPrograms = response.data
          setPrograms(allPrograms)
        });
    }catch(err){
        console.log("There is an error", err)
    }
  }
  useEffect(()=> getPrograms(), []);


  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box p={5}>
      <Heading mb={6} textAlign="center">
        Available Programs in Turkish Universities
      </Heading>
      <Box mb="2em">
        <HStack>
            <Input placeholder="Search, Type Anything" width="70%"/>
            <IconButton aria-label='Search database' icon={<FaSearch />} />
            <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                    {selectedCity || 'Filter'}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleCityChange('Istanbul')}>Istanbul</MenuItem>
                    <MenuItem onClick={() => handleCityChange('Ankara')}>Ankara</MenuItem>
                    <MenuItem onClick={() => handleCityChange('Sapanca')}>Sapanca</MenuItem>
                    <MenuItem onClick={() => handleCityChange('Izmir')}>Izmir</MenuItem>
                    <MenuItem onClick={() => handleCityChange('Karabuk')}>Karabuk</MenuItem>
                </MenuList>
            </Menu>
            {selectedCity && (
            <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                {selectedUniversity || 'Select University'}
                </MenuButton>
                <MenuList>
                {universities.map((university) => (
                    <MenuItem key={university.name} onClick={() => setSelectedUniversity(university.name)}>
                    {university.name}
                    </MenuItem>
                ))}
                </MenuList>
            </Menu>
            )}
        </HStack>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {programs.map(program => (
          <Box
            key={program.id}
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
             
              alt={program.university_location}
              roundedTop="lg"
              w="100%"
              h="200px"
              objectFit="cover"
              src={`http://localhost:8000/${program.program_image}`} 

            />
            <Stack spacing={3} mt={3}>
              <Badge colorScheme="teal" variant="solid" rounded="full" px={2} py={1}>
                {program.university_name}
              </Badge>
              <Heading fontSize="xl">{program.program_name}</Heading>
              <Text>{program.program_description}</Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProgramList;
