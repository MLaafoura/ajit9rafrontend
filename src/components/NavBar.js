import { Box, Flex, Image, Button, Hide } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export default function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();




  return (
    <Box
      as={"nav"}
      bg={"#F7F9F2"}
      color={"white"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"20px 50px"}
      height="4em"
      boxShadow='2xl'
    >
       
      <Box 
            color="#219C90"
            fontSize={"20px"}
            >Ajit9ra</Box>
      
        <Box as={"ul"} display={{ base: "none", md: "flex" }} gap={"40px"}>
          
            <Box
              as={"li"}
              fontSize={"20px"}
              cursor={"pointer"}
              listStyleType={"none"}
              margin={"10px 0"}
              color="#219C90"
            >
              <Link to='/apply-now'>Apply Now</Link>
            </Box>
         
        
        </Box>
      
       
    </Box>
  );
}