import React, { useState, useEffect } from 'react';
import {
    Flex, Box, Button, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, Image,
    Center
  } from '@chakra-ui/react';
import { FaEye } from "react-icons/fa";
import axios from 'axios';


function StudentList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();


  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  const getStudents = () => {
    try{
        axios.get(`${process.env.REACT_APP_API_URL}all/students/`, config)
        .then((response) =>{
          const allStudents = response.data
          setStudents(allStudents)
        });
    }catch(err){
        console.log("There is an error", err)
    }
  }
  useEffect(()=> getStudents(), []);

  const handleEyeClick = (student_id) => {
    axios.get(`http://localhost:8000/get/student/${student_id}`, config)
    .then(response => {
        setSelectedStudent(response.data);
        onOpen();
      })
      .catch(error => {
        console.error('Error fetching student details:', error);
      });
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableCaption>List of Students</TableCaption>
          <Thead bgColor="#CDE8E5">
            <Tr>
              <Th fontWeight="bold" color="black">Full Name</Th>
              <Th fontWeight="bold" color="black">Email</Th>
              <Th fontWeight="bold" color="black">Phone Number</Th>
              <Th fontWeight="bold" color="black">Application Date</Th>
              <Th fontWeight="bold" color="black">Progress</Th>
              <Th fontWeight="bold" color="black">Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => (
              <Tr key={student.id}>
                <Td>{student.fullname}</Td>
                <Td>{student.email}</Td>
                <Td>{student.phone_number}</Td>
                <Td>25/04/2024</Td>
                <Td>in review</Td>
                <Td>none</Td>
                <Td>
                  <Button onClick={() => handleEyeClick(student.id)}><FaEye /></Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="space-between" mt="4">
        <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>Previous</Button>
        <Box>{page} of {totalPages}</Box>
        <Button onClick={() => setPage(page + 1)} isDisabled={page === totalPages}>Next</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {selectedStudent && (
            <Box>
            <Center>
            {selectedStudent.student_picture ? (
                <Image src={`http://localhost:8000/${selectedStudent.student_picture}`}  alt="Student" boxSize="200px" mb="1em" objectFit="cover" borderRadius="50%"/>
            ) : (
                <Box boxSize="100px" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
                <p>No Image</p>
                </Box>
            )}
            </Center>
            <p><strong>Full Name:</strong> {selectedStudent.fullname}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Phone Number:</strong> {selectedStudent.phone_number}</p>
            <p><strong>Application Date:</strong> 25/05/2024</p>
            </Box>
        )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </>
  );
}

export default StudentList;
