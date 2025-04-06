import { Text } from '@chakra-ui/react'
import React from 'react'

function Navlink({ label, isActive, onMouseEnter, onMouseLeave }) {
    // const handleMouseEnter = (e) => {
	// 	const dropdown = document.querySelector('.solutions-dropdown')
    //     const navbar = document.querySelector()
	// 	if (dropdown) {
	// 		dropdown.style.display = 'block'
	// 	}
	// }
    // const handleMouseLeave = (e) => {
    //     const dropdown = document.querySelector('.solutions-dropdown')
    //     if (dropdown) {
    //         dropdown.style.display = 'none'
    //     }
    // }

  return (
    <Text 
        fontSize={'xs'} 
        _hover={{
            color: "gray.200",
            cursor: 'default',
            transform: "translateY(-1px)",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        transition={'all 0.2s ease-in-out'}
    >
        {label}
    </Text>
  )
}

export default Navlink
