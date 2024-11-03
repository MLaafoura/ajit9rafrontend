import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import './style.css'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Text,
    Center,
    Input,
    Image,
    Stack
  } from '@chakra-ui/react';
import { login } from '../actions/auth';

function Login({login, isAuthenticated}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const{email, password} = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    login(email, password);

  };
  if(isAuthenticated){
    return <Navigate to='/dashboard'/>
  }
  return (
    <Stack bgColor="#E1F7F5" height="100vh">
    <Box className="login-form" boxShadow="2xl" p={5}>
      <Center>
          <Image boxSize='200px' src='ajit9ralogo.png' alt='Logo' />
     
        </Center>
        <Text fontSize="3xl" textAlign="center" mb={5}>Sign in</Text>
        
       <form onSubmit={e => onSubmit(e)}>
            <FormControl>
            <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="text" id="email" placeholder="Enter Email" name="email"
                      onChange={e => onChange(e)}
                      value={email}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password" 
                        mt={5}
                    >Password</FormLabel>
                    <Input type="password" id="password" placeholder="Enter password" name="password"
                      value={password}
                      onChange={e => onChange(e)}
                     />
                </FormControl>
                <FormHelperText textAlign="right" mr={10}><Link to="/reset-password">Forgot password ?</Link></FormHelperText>
                <Center>
                    <Button colorScheme='teal' type="submit">Sign In</Button>
                </Center>
            </FormControl>
       </form>
    </Box>
    </Stack>
  )
}
const mapStateProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateProps, {login})(Login);
