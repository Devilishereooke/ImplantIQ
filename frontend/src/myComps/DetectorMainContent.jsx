import React from 'react'
import { Box, VStack, Text, HStack, Button } from '@chakra-ui/react'

function DetectorMainContent() {
  return (
    <Box px={40} py={'44'} bgColor={'rgb(3, 83, 164)'} >
        <VStack spacing={6} maxW="350px" alignItems={'flex-start'}>
          <Text
            fontSize={'xs'}
            wordSpacing={'0.5em'}
            fontWeight={'bolder'}
            letterSpacing={'0.3em'}
          >
            ImplantIQ Software
          </Text>
          <Text
            fontSize={'3xl'}
            fontWeight={'extrabold'}
          >
            <Text color={'yellow.400'}>KNOW THE IMPLANT</Text>
            FOCUS ON DELIVERING CARE
          </Text>
          <HStack spacing={6} mt={'3'}>
            <Button 
              variant="solid"
              size="sm"
              fontSize={'xs'}
              fontWeight={'bold'}
              px={4}
              rounded={'full'}
							color={'rgb(3, 83, 164)'}
            >
              Upload Implant
            </Button>
          </HStack>
        </VStack>
    </Box>
  )
}

export default DetectorMainContent
