import { Flex, HStack, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink.jsx'
import MenuBox from './MenuBox.jsx'

const Navbar = () => {
	const [activeMenu, setActiveMenu] = React.useState("none");

  return (
    <Box as="nav" bg={'rgb(98, 47, 180)'} py={2} px={40} boxShadow="sm">
      <Flex justify="space-between" align="center">
        {/* Left side - Company name and navigation links */}
        <HStack gap={35}>
          <Text fontSize="xl" fontWeight="bold" _hover={{cursor:'pointer'}}>
            ImplantIQ
          </Text>
          <HStack gap={30}>
            <Navlink 
							label={'Solutions'} 
							isActive = {activeMenu === 'solutions'}
							onMouseEnter={() => setActiveMenu('solutions')}
						/>
						<MenuBox isActive = {activeMenu === 'solutions'} onMouseLeave={() => setActiveMenu('none')} />
            <Navlink 
							label={'Who We Serve'} 
							isActive = {activeMenu === 'whoWeServe'}
							onMouseEnter={() => setActiveMenu('whoWeServe')}
						/>
						<MenuBox isActive = {activeMenu === 'whoWeServe'} onMouseLeave={() => setActiveMenu('none')} />
            <Navlink 
							label={'Resources'} 
							isActive = {activeMenu === 'resources'}
							onMouseEnter={() => setActiveMenu('resources')}
						/>
						<MenuBox isActive = {activeMenu === 'resources'} onMouseLeave={() => setActiveMenu('none')} />
            <Navlink 
							label={'Company'} 
							isActive = {activeMenu === 'company'}
							onMouseEnter={() => setActiveMenu('company')}
						/>
						<MenuBox isActive = {activeMenu === 'company'} onMouseLeave={() => setActiveMenu('none')} />
          </HStack>
        </HStack>

        {/* Right side - Login button */}
        <Button 
            px={7}
            size={'xs'}
            color={'rgb(98, 47, 180)'} 
            variant="solid" 
            rounded={'full'} 
        >
          Login
        </Button>
      </Flex>
    </Box>
  )
}

export default Navbar
