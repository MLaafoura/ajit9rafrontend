import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import { Box,
        Button,
        FormControl,
        FormLabel,
        FormHelperText,
        Text,
        Center ,
        Input,
        InputGroup,
        InputLeftElement,
        Image,
        Stack
    } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { signup } from '../actions/auth';

function Signup({signup, isAuthenticated}) {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        fullName:'',
        password: '',
        re_password:'',
        phone_number:'',
        website:''
      });
      const{email,fullName, password, re_password, phone_number, website} = formData;
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
      const onSubmit = e => {
        e.preventDefault();
        if(password === re_password){
            signup(email,fullName, password, re_password, phone_number, website);
            setAccountCreated(true);
        }
    
      };
      if(isAuthenticated){
        return <Navigate to='/'/>
      }
      if(accountCreated){
        return <Navigate to='/signin'/>
      }
  return (
    <Stack bgColor="#E1F7F5" height="100vh">
      <Center>
        <Box className="signup-form" boxShadow="2xl" w="40%" p={5} mt="3rem" bgColor="white">
        <Center>
          <Image boxSize='200px' src='ajit9ralogo.png' alt='Logo' />
     
        </Center>
            <Text fontSize="3xl" textAlign="center">Sign up</Text>
        <form onSubmit={e => onSubmit(e)}>
                <FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="agentName" mt={5}>Agent Name/Company Name</FormLabel>
                    <Input type="text" id="fullName" 
                        placeholder="Enter name"
                        name="fullName"
                        value={fullName}
                        onChange={e => onChange(e) }
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="username">email</FormLabel>
                    <Input type="email" id="email" 
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e) }
                      />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password" mt={5}>Password</FormLabel>
                    <Input type="password" id="password" 
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e) }
                        />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="confirmPassword" mt={5}>Re-enter Password</FormLabel>
                    <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    name="re_password"
                    value={re_password}
                    onChange={e => onChange(e) }
                    />
                </FormControl>
                <FormControl isRequired>
                <FormLabel mt={5}>Phone Number</FormLabel>
                    <Input
                        type="tel"
                        placeholder="Enter phone number"
                        helperText="Invalid phone number format."
                        name="phone_number"
                        value={phone_number}
                        onChange={e => onChange(e) }
                    />
                </FormControl>
                
                <FormControl>
                    <FormLabel htmlFor="website" mt={5}>Website (if available)</FormLabel>
                    <InputGroup>
                    <InputLeftElement children={<Text>@</Text>} />
                    <Input type="url" id="website" 
                        placeholder="Enter website"
                        name="website"
                        value={website}
                        onChange={e => onChange(e) }
                        />
                    </InputGroup>
                </FormControl>
                   
                    <Center>
                        <Button colorScheme='teal' type='submit' mt={5} >Sign up</Button>
                    </Center>
                    <Text textAlign="center" mt={5}>Already have an account?<Link to='/signin'> Sign in</Link></Text>
                </FormControl>
        </form>
        </Box>
      </Center>
    </Stack>
  )
}

const mapStateProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateProps, {signup})(Signup);

