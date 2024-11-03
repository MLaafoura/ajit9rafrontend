import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, Box, Button, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, IconButton
} from '@chakra-ui/react';
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Leads() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
    },
  };

  useEffect(() => {
    axios.get('http://localhost:8000/leads/', config)
      .then(response => setLeads(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleEyeClick = (lead_id) => {
    navigate(`/lead/${lead_id}`);
  };

  return (
   
      <Box p={5}>
        <TableContainer>
          <Table>
            <TableCaption>List of Students</TableCaption>
            <Thead bgColor="#CDE8E5">
              <Tr>
                <Th fontWeight="bold" color="black">Full Name</Th>
                <Th fontWeight="bold" color="black">Email</Th>
                <Th fontWeight="bold" color="black">Phone Number</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {leads.map(lead => (
                <Tr key={lead.id}>
                  <Td>{lead.name}</Td>
                  <Td>{lead.email}</Td>
                  <Td>{lead.phone_number}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEye />}
                      onClick={() => handleEyeClick(lead.id)}
                      aria-label="View Student"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    
  );
}

export default Leads;
