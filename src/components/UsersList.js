import React, {useState, useEffect} from 'react'
import { Box, 
         HStack,
         Text, 
         Table,
         Tbody,
         TableContainer,
         Thead,
         Tr,
         Th,
         TableCaption,
         Td,
         Button,
         Menu,
         InputGroup,
         Input,
         InputRightElement,
         MenuList,
         MenuItem,
         MenuButton,
         Center
        } from '@chakra-ui/react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import {SearchIcon, ChevronDownIcon} from '@chakra-ui/icons'


function UsersList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('none');
    const [user, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const config = {
      headers: {
          Authorization:`JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
      } }
    const getUsers = () => {
      try{
          axios.get(`${process.env.REACT_APP_API_URL}get_all_users/`, config)
          .then((response) =>{
            const allUsers = response.data
            setUsers(allUsers)
          });
      }catch(err){
          console.log("There is an error", err)
      }
    }
    useEffect(()=> getUsers(), []);

    const filteredUsers = () => {
      switch (selectedFilter) {
        case 'name':
          return user.filter((userItem) => userItem.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'email':
          return user.filter((userItem) => userItem.email.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'created_at':
          return user.slice(); 
        default:
          return user;
      }
    };


    const formattedDate = (dateString) => {
      if (!dateString) {
        return 'No date available'; 
      }
  
      const dateParts = dateString.split('T'); 
      return dateParts[0]; 
    };
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const displayedUsers = filteredUsers();
    const paginatedUsers = displayedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
    <HStack
               
               ml="15%"
               mt="4em"
               mb="4em"
           >
               <InputGroup  width="70%"
               height="2em">
                   <Input placeholder='Search a scam' 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <InputRightElement>
                       <Button><SearchIcon/></Button>
                   </InputRightElement>
               </InputGroup>
               <Menu>
                   <MenuButton as={Button} rightIcon={<ChevronDownIcon />}
                    width="15%"
                    
                    >
                       Order
                   </MenuButton>
                   <MenuList>
                       <MenuItem onClick={() => setSelectedFilter('name')}>Name</MenuItem>
                       <MenuItem onClick={() => setSelectedFilter('email')}>Email</MenuItem>
                       <MenuItem onClick={() => setSelectedFilter('created_at')}>Created date</MenuItem>
                   </MenuList>
               </Menu>
           </HStack>
      <TableContainer width="90%" ml="10%">
            <Table variant='simple'>
            <TableCaption></TableCaption>
            <Thead>
                <Tr>
                <Th color="#070F2B">Full Name</Th>
                <Th color="#070F2B">Email</Th>
                <Th color="#070F2B">Phone Number</Th>
                <Th color="#070F2B">Created at</Th>
                <Th color="#070F2B">Status</Th>
                <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {paginatedUsers.map((users) =>(
                    
                    <Tr>
                    <Td>{users.fullName}</Td>
                    <Td>{users.email}</Td>
                    <Td>{users.phone_number}</Td>
                    <Td>{formattedDate(users.created_at)}</Td>
                    <Td style={{ color: users.is_active ? 'green' : 'red' }}>
                        {users.is_active ? 'Active' : 'Not Active'}
                      </Td>
                      <Td>
                      {users.is_admin ? (
                        <span style={{ color: 'green' }}>Admin</span>
                      ) : users.is_agent ? (
                        <span style={{ color: 'blue' }}>Client</span>
                      )  : null}
                      </Td>        
                    <Td>
                    <Button>More info</Button>
                    </Td>
                </Tr>
                ))
                }
                    {user.length === 0 && ( // Handle empty user array
              <Tr>
                <Td colSpan={6}>No users found.</Td>
              </Tr>
            )}
          
            </Tbody>
            </Table>
        </TableContainer>
        <Center mb="3em" mt="1em">
            <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={user.length}
            pageRangeDisplayed={5}
            onChange={(page) => setCurrentPage(page)}
            className="custom-pagination"
            itemClass="custom-page-item"
            linkClass="custom-page-link"
            />
        
        </Center>
    </>
  )
}

export default UsersList
