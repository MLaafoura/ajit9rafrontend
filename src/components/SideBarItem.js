import React from 'react'
import { Fade, 
         ScaleFade, 
         Slide, 
         SlideFade, 
         Collapse, 
         Box, 
         Text, 
         Button,
         Link,
         Flex,
         Icon,
         Menu,
         MenuButton
        } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import Submenu from './Submenu'
import { FaFilter } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";


function SideBarItem({icon, title, link, active, navSize, children}) {
    const { isOpen, onToggle } = useDisclosure()
  return (
    <>  
    <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}

        >
    <Menu placement="right">
      <Button onClick={onToggle}
        backgroundColor={active && "#AEC8CA"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
        w={navSize == "large" && "100%"}
        bgColor="transparent"
        height="3em"
        justifyContent="flex-start"
      >
             <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
             <Link href={link}
              color="black"
              width="100%"
              ml="1em"
              style={{ textDecoration: 'none' }}
              ><Text display={navSize == "small" ? "none" : "flex"}>{title}</Text></Link>
             {/*<Text ml={5} display={navSize == "small" ? "none" : "flex"} mr="1em">{title}</Text>
             */}
             {children && ( 
                navSize !== 'small' && (
                    <Flex ml="auto">
                    {isOpen ? (
                        <MdOutlineKeyboardArrowUp fontSize="1.5em" style={{ fontWeight: "bold" }} />
                    ) : (
                        <MdOutlineKeyboardArrowDown fontSize="1.5em" style={{ fontWeight: "bold" }} />
                    )}
                    </Flex>
                )
                )}

      </Button>
      
      <Collapse in={isOpen} animateOpacity >
        <Box
          pl='20px'
          pt='20px'
          color='white'
          height="auto"
          rounded='md'
          shadow='md'
        >
          {children}
        </Box>
      </Collapse>
        </Menu>
      </Flex>
    </>
  )
}

export default SideBarItem
