import React from 'react';
import { Flex, Text, Link, Menu, MenuButton, Button, Icon } from '@chakra-ui/react';

const Submenu = ({title, link, icon, navSize}) => {
  return (
   <>
   <Flex
    _hover={{ background: '#CDE8E5' }}
    height="auto"
    p="1em 2em 1em 2em"
    borderRadius="1em"
   >
        {navSize != 'small'?
        (<><Icon as={icon} fontSize="xl" color="gray.500"/>     
        <Link href={link}
            color="black"
            width="100%"
            ml="1em"
            style={{ textDecoration: 'none' }}
            ><Text>{title}</Text></Link>
        </>)
          : 
          <Icon as={icon} fontSize="xl" color="gray"/> 
        }
   </Flex>
   </>
  );
};


export default Submenu;