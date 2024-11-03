import React, {useState} from 'react'
import { reset_password_confirm } from '../actions/auth';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
    Box,
    Text,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    useToast,
    Stack
  } from '@chakra-ui/react';



function ResetPasswordConfirm({reset_password_confirm}) {
    const toast = useToast();
    const [changePassword, setChangePassword] = useState(false);
    const { uid, token } = useParams();
    const [formData, setFormData] = useState({
        new_password: '',
        re_password: ''
      });
     
      const{new_password, re_password} = formData;
      const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
      const onSubmit = e => {
        e.preventDefault();
        if(new_password == re_password){
        try{
        reset_password_confirm(uid, token, new_password, re_password)
        toast({
            title: 'Password changed Successfully',
            description: 'You can login to you account',
            status: 'success',
            duration: 5000,
            position: 'top-center',
            isClosable: true,
          });
        setChangePassword(true);
        
    }catch(err){
        toast({
            title: 'Reset Password Failed',
            description: 'Please check your information and try again.',
            status: 'error',
            duration: 5000,
            position: 'top-right',
            isClosable: true,
          });
        }
    }else{
        toast({
            title: 'Passwords do not match',
            description: 'Please re enter your password.',
            status: 'error',
            duration: 5000,
            position: 'top-center',
            isClosable: true,
          });
    }
      };
     if(changePassword){
        return <Navigate to="/signin"/>
     }
    
  return (
   <Stack bgColor="#E1F7F5" height="100vh">
     
      <Box
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          minWidth="500px"
          textAlign="center"
          width="50%"
          ml="auto"
          mr="auto"
          mt="5em"
          mb="5em"
          boxShadow="2xl"
        >
          <Text fontSize="3xl" fontWeight="bold" mb={8} color="primary">
            Reset Password
          </Text>
          <form onSubmit={e => onSubmit(e)}>
            <FormControl
  
              isRequired>
  
              <FormLabel
                ml="10%"
                fontWeight="bold"
              >New Password</FormLabel>
              <Input
                type="password"
                name="new_password"
                value={new_password}
                onChange={e => onChange(e) }
                mb={2}
                width="80%"
              />
              <FormLabel
                ml="10%"
                fontWeight="bold"
              >Re-enter Password</FormLabel>
              <Input
                type="password"
                name="re_password"
                value={re_password}
                onChange={e => onChange(e) }
                mb={2}
                width="80%"
              />
            </FormControl>
            
            <Button type="submit" mt={4} colorScheme="teal">
              Reset Password
            </Button>
          </form>
        </Box>
  
      
        </Stack>
  )
}

export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
