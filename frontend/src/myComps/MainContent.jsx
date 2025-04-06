import { Box } from '@chakra-ui/react'
import { VStack, HStack, Text, Button } from '@chakra-ui/react'
import React from 'react'

function MainContent() {
  return (
    <Box px={40} >
        <VStack spacing={6} maxW="430px" mt={'44'} alignItems={'flex-start'} >
          {/* Main Heading */}
          <Text 
            fontSize={"45px"}
						fontFamily={'sans-serif'}
            fontWeight="bolder"
            lineHeight="1.2"
          >
            Providing care can be simpler
          </Text>
          
          {/* Subheading */}
          <Text 
            fontSize={'sm'}
            mt={3}
          >
            Make achieving your best possible outcomes easier with our AI-powered, all-in-one healthcare solution that enables clinical and operational efficiency.
          </Text>
          
          {/* Action Buttons */}
          <HStack spacing={6} mt={'28'}>
            <Button 
							borderColor={"white"}
              variant="outline"
              size="lg"
              px={8}
              rounded={'full'}
							transition={'all 0.3s ease-in-out'}
            >
              Talk to an expert
            </Button>
            <Button 
              colorScheme="blue" 
              variant="ghost"
              size="lg"
              px={8}
            	rounded={'full'}
							transition={'all 0.3s ease-in-out'}
            >
              Watch to learn more
            </Button>
          </HStack>
        </VStack>
    </Box>
  )
}

export default MainContent
