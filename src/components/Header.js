import React,{useState} from 'react'
import { Flex,
         Button,
         Menu,
         MenuButton,
         MenuList,
         MenuItem,
         Avatar,
         AvatarBadge, 
         Stack,
         Heading,
         Spacer,
         Image,
         Popover,
         PopoverTrigger,
         PopoverContent,
         PopoverHeader,
         PopoverBody,
         PopoverFooter,
         PopoverArrow,
         PopoverCloseButton,
         PopoverAnchor,     
         IconButton

 } from '@chakra-ui/react'  
import { IoIosNotifications } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import Notifications from './Notifications';

function Header({logout}) {
    const [redirect, setRedirect] = useState(false);
    const logout_user = () => {
        logout();
        setRedirect(true);
        if (setRedirect) {
            window.location.href = "/signin";
          }
    };
  return (
    <>
    <Flex w="100%"
          bgColor="#EEF7FF"
          h="4em"
          pt="0.8em"
          pos="fixed"
    >
        <Flex ml="4em">
            {/*<Image width="10em" height="6em" src='logo.svg' alt='Logo' mt="-1.5em"/>
       */}
      <Heading as="h1" size="lg" fontSize="2xl" fontWeight="bold">
        AjiT9ra
      </Heading>
        </Flex>
        <Spacer/>
        <Flex mr="2em">
            <Flex w="3em" h="auto"> 
                <Popover>
                    <PopoverTrigger>
                    <Avatar bg="transparent">
                    <IconButton icon={<IoIosNotifications size="2.5em" />} bgColor="transparent"/>
                    <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' position="absolute" top="-0.5em"/>
                    </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Notifications!</PopoverHeader>
                        <PopoverBody>
                            <Notifications/>
                            <Notifications/>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                </Flex>
            <Flex>
                <Menu>
                    <MenuButton as={Button} 
                                w="auto" 
                                bgColor="transparent" 
                                rightIcon={<FaChevronDown />}
                                _hover={{bgColor:'transparent'}}
                                >
                        <Stack direction='row' spacing={4}>
                            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link'>
                                <AvatarBadge boxSize='1.25em' bg='green.500' />
                            </Avatar>

                            {/* You can also change the borderColor and bg of the badge 
                            <Avatar>
                                <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
                            </Avatar>
                            */}
                        </Stack>
                    </MenuButton>
                    <MenuList>
                        <Button onClick={logout_user} width="100%" bgColor="transparent">
                            <MenuItem>Sign out</MenuItem>
                        </Button>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    </Flex>
    </>
  )
}

export default connect(null, {logout})(Header)
