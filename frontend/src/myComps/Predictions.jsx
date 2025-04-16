import { Box } from '@chakra-ui/react'
import { VStack, Text, Spinner, Image } from '@chakra-ui/react'
import React from 'react'
import TextParser from './TextParser'

function Predictions({ image, implantData, isLoading, setIsLoading, setImplantData, setImage, handleFileUpload }) {
  return (
    <Box px={'44'} maxW="1080px" color={'black'}>
			{/* I want a heading here. Saying Here are your results. Only render this if prediction is not null */}
			{implantData && (
			<Text
				fontSize={'6xl'}
				fontWeight={'extrabold'}
				textAlign={'center'}
				mt={2}
				mb={4}
				color={'black'}
			>
				Here are your results
			</Text>
			)}

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
