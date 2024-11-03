import React, { useState } from 'react';
import {
  Box, Button, Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Textarea, useDisclosure, ChakraProvider
} from '@chakra-ui/react';

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Announcement 1', content: 'Content 1', date: '2024-06-01' },
    { id: 2, title: 'Announcement 2', content: 'Content 2', date: '2024-06-02' },
    { id: 3, title: 'Announcement 3', content: 'Content 3', date: '2024-06-03' },
    { id: 4, title: 'Announcement 4', content: 'Content 4', date: '2024-06-04' },
    { id: 5, title: 'Announcement 5', content: 'Content 5', date: '2024-06-05' },
    { id: 6, title: 'Announcement 6', content: 'Content 6', date: '2024-06-06' },
    { id: 7, title: 'Announcement 7', content: 'Content 7', date: '2024-06-07' },
    { id: 8, title: 'Announcement 8', content: 'Content 8', date: '2024-06-08' },
    { id: 9, title: 'Announcement 9', content: 'Content 9', date: '2024-06-09' },
    { id: 10, title: 'Announcement 10', content: 'Content 10', date: '2024-06-10' }
  ]);
  const [page, setPage] = useState(1);
  const announcementsPerPage = 8;
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', date: '' });

  const indexOfLastAnnouncement = page * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const handleAddAnnouncement = () => {
    setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1 }]);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  return (
   
      <Box p={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <Box fontSize="2xl" fontWeight="bold">Announcements</Box>
          <Button onClick={onOpen} colorScheme="teal">Add Announcement</Button>
        </Flex>
        <TableContainer>
          <Table>
            <TableCaption>All Announcements</TableCaption>
            <Thead bgColor="#CDE8E5">
              <Tr>
                <Th fontWeight="bold" color="black">Title</Th>
                <Th fontWeight="bold" color="black">Content</Th>
                <Th fontWeight="bold" color="black">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentAnnouncements.map(announcement => (
                <Tr key={announcement.id}>
                  <Td>{announcement.title}</Td>
                  <Td>{announcement.content}</Td>
                  <Td>{announcement.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</Button>
          <Box>Page {page} of {totalPages}</Box>
          <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Announcement</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={newAnnouncement.title} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Content</FormLabel>
                <Textarea name="content" value={newAnnouncement.content} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" value={newAnnouncement.date} onChange={handleChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddAnnouncement}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    
  );
}

export default AnnouncementList;
