import React from 'react'
import { Box } from '@chakra-ui/react'

function MenuBox({isActive, onMouseLeave}) {
  return (
    <Box 
			// display={isActive ? 'block' : 'none'}
			position="absolute"
			top={'2.6em'}
			left={0}
			mt={2}
			width="100%"
			height={'300px'}
			bg="white"
			p={4}
			zIndex="dropdown"
			onMouseLeave={onMouseLeave}
			// Animation properties
      opacity={isActive ? 1 : 0}
      transform={isActive ? 'translateY(0)' : 'translateY(-10px)'}
      transition="all 0.25s ease-out"
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      Solutions dropdown content
    </Box>
  )
}

export default MenuBox
