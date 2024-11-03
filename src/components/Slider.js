import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Image, Button, Center } from '@chakra-ui/react';

const images = [
  'https://plus.unsplash.com/premium_photo-1682787494765-44d02d12f5be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Box maxW="1000px" mx="auto" mt="3em" borderRadius="md" overflow="hidden" boxShadow="2xl">
      <Image src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`}  width="100%" height="auto" />
      <Center>
      <Button mt="-10em" 
              ml="auto" 
              mr="auto" 
              width="20%" 
              height="3em"
              boxShadow="2xl"
              bgColor="#219C90"
              color="white"
              > Apply Now</Button>
      </Center>
    </Box>
  );
};



export default ImageSlider;
