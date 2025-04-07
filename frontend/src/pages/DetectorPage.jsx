import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../myComps/Navbar'
import DetectorMainContent from '../myComps/DetectorMainContent'

function DetectorPage() {
  return (
    <Box minH={'100vh'} bg={'white'}>
      <Navbar />
      <DetectorMainContent />
    </Box>
  )
}

export default DetectorPage
