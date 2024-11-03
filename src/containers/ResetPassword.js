import React, {useState} from 'react'
import { Box,
    Button,
    FormControl,
    FormLabel,
    Text,
    Center ,
    Input,
    Image,
    Stack,
    useToast
} from '@chakra-ui/react'
import { reset_password } from '../actions/auth';
import { connect } from 'react-redux';

function ResetPassword({reset_password}) {
  const toast = useToast();
  const [requestSent, setRequstSeent] = useState(false);
  const [formData, setFormData] = useState({
    email:'',
  });
  const {email} = formData; 
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    reset_password(email);
    toast({
      title: 'Password Reset Link has been sent',
      description: 'Kindly check your email to change your password',
      status: 'success',
      duration: 5000,
      position: 'top-center',
      isClosable: true,
    });
    setRequstSeent(true);
  }
  return (
    <Stack bgColor="#E1F7F5" height="100vh">
      <Center>
        <Box className="signup-form" boxShadow="2xl" bgColor="white" w="40%" p={5} mt="10em">
        <Center>
          <Image boxSize='200px' src='ajit9ralogo.png' alt='Logo' />
     
        </Center>
            <Text fontSize="3xl" textAlign="center">Reset Password</Text>
        <form onSubmit={e => onSubmit(e)}>
                <FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="email" mt={5}>Email</FormLabel>
                    <Input type="email" name="email" id="email" placeholder="Enter your email" value={email}
                onChange={onChange} />
                </FormControl>
                
                    <Center>
                        <Button colorScheme='teal' mt={5} type="submit">Reset Password</Button>
                    </Center>
                </FormControl>
        </form>
        </Box>
      </Center>
    </Stack>
  )
}

export default connect(null, {reset_password})(ResetPassword)
