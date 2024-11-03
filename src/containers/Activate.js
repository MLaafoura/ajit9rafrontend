import React, { useState } from 'react'
import { verify } from '../actions/auth'
import { Navigate } from 'react-router-dom';
import {connect} from 'react-redux'
import { Center,
         Box,
         Text,
         Button,
         Stack
        } from '@chakra-ui/react'; 
import { useParams } from 'react-router-dom';

function Activate({verify, match}) {
      const[verified, setVerified] = useState(false);
      const { uid, token } = useParams();
      const verify_account = e => {
        verify(uid, token);
        setVerified(true);
      };
      if(verified){
        return <Navigate to='/'/>
      }
      return (
        <Stack bgColor="#E1F7F5" height="100vh">
        <Center>
        <Box className="login-form" boxShadow="2xl" bgColor="white" p={5}>
            <Text fontSize="3xl" textAlign="center">Verify Your Account</Text>
            <Button type='submit'
                onClick={verify_account}
            >Verify</Button>
        </Box>
        </Center>
        </Stack>
      )
    }
    const mapStateProps = state =>({
      isAuthenticated: state.auth.isAuthenticated
    });
    
    export default connect(mapStateProps, {verify})(Activate);
