import { Box } from '@chakra-ui/react'
import { VStack, Text, Spinner, Image, Button } from '@chakra-ui/react'
import React from 'react'
import TextParser from './TextParser'

function Predictions({ image, implantClass, implantData, isLoading, setIsLoading, setImplantData, setImage, handleFileUpload }) {
  return (
    <Box px={'44'} py={'7'} maxW="1080px" color={'black'}>
      <Box display={'flex'} justifyContent={'center'} >
        <Button
          // bgColor={'rgb(255, 201,113)'}
          variant={'outline'}
          color={'rgb(0, 48, 73)'}
          borderColor={'rgb(255, 149, 5)'}
          _hover={{
            bgColor: 'rgb(255, 201,113)',
            color: 'white',
          }
        }
        >
          Show Detailed Result
        </Button>
      </Box>

      {/* Prediction Results */}
      {implantData && (
        <Box mt={8}>
          <TextParser content={implantData} />
        </Box>
      )}
    </Box>
  )
}


{/* Image Preview */}
      {/* {image && (
        <Box mt={8} maxW="500px">
          <Image 
            src={image} 
            alt="Uploaded implant" 
            borderRadius="md"
            boxShadow="lg"
            maxH="300px"
          />
        </Box>
      )} */}

      {/* Loading State */}
      {/* {isLoading && (
        <Box>
          <Spinner size="xl" color="yellow.400" />
          <Text mt={4} color="black">Analyzing implant...</Text>
        </Box>
      )} */}

export default Predictions
