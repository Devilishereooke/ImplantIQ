import { Flex, HStack, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import Navlink from './Navlink.jsx'
import MenuBox from './MenuBox.jsx'

const Navbar = () => {
	const [activeMenu, setActiveMenu] = React.useState("none");
  const navbg = 'rgb(3, 83, 164)'

  return (
    <Box position={'fixed'} top={0} width={'100%'} zIndex={2} as="nav" bg={navbg} py={2} px={40}>
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
							label={'Backend'} 
							isActive = {activeMenu === 'backend'}
							onMouseEnter={() => setActiveMenu('backend')}
						/>
						<MenuBox isActive = {activeMenu === 'backend'} onMouseLeave={() => setActiveMenu('none')} />
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
            color={navbg} 
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
