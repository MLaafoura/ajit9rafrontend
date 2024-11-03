import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Icon,
    Link
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiSearch,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { PiStudentFill } from "react-icons/pi";
import { IoNewspaperOutline, IoPersonAdd } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { FaUsers, FaSignOutAlt, FaUniversity } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import NavItem from './NavItem'
import Submenu from './Submenu';
import SideBarItem from './SideBarItem';
import { CiBoxList } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";


function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    const announcementsSubmenu = [
        { title: "All Announcements", link: "/announcements/all" },
        { title: "New Announcements", link: "/announcements/new" },
      ];
    
  return (
    <Flex
            pos="fixed"
            h="100vh"
            w={navSize == "small" ? "75px" : "260px"}
            flexDir="column"
            justifyContent="space-between"
            bgColor="#EEF7FF"
            boxShadow='xl'
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <SideBarItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." link="/dashboard" active>
                    
                    </SideBarItem>
                <SideBarItem navSize={navSize} icon={FiSearch} title="Program Search">
                    <Submenu title="Program List" link="/program-list" icon={FaUniversity} navSize={navSize}/>
                    <Submenu title="Program Add" link="/program-add" icon={IoIosAddCircle} navSize={navSize}/>
                </SideBarItem>
                <SideBarItem navSize={navSize} icon={FaFilter} title="Leads" link="/leads"/>
                <SideBarItem navSize={navSize} icon={PiStudentFill} title="Students" >
                    <Submenu title="Students List" link="/student-list" icon={CiBoxList} navSize={navSize}/>
                    <Submenu title="Students Add" link="/student-add" icon={IoPersonAdd} navSize={navSize}/>
                </SideBarItem>
                <SideBarItem navSize={navSize} icon={FaUsers} title="Users" link="/users"/>
                <SideBarItem navSize={navSize} icon={GrAnnounce} title="Announcements" link="/announcements"/>
                        
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
               
                
            </Flex>
        </Flex>
  )
}

export default Sidebar
