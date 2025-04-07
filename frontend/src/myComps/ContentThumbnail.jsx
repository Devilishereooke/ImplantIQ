import { Box } from '@chakra-ui/react'
import React from 'react'
import { Button, Text } from '@chakra-ui/react'
import thumbnail1 from '../assets/thumbnail1.mp4'

function ContentThumbnail() {
  return (
    <Box 
			flex={1} 
			p={6} 
			borderWidth="1px" 
			borderRadius="lg"
			borderColor="gray.200"
			color={'black'}
			_hover={{
				boxShadow: 'rgba(22, 15, 65, 0.14) 0px 2.9601px 14.2085px 0px',
				transform: 'scale(1.02)',
				transition: 'transform 0.3s ease-in-out',
			}}
		>
			<Box borderRadius={'lg'} overflow={'hidden'} >
				<video autoPlay loop muted playsInline width={'100%'} style={{objectFit: 'cover'}} >
					<source src={thumbnail1} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</Box>
			<Text fontSize={'xs'} fontWeight={'semibold'} mt={'4'} mb={2} color={'rgb(3, 83, 164)'}>
				Implant Detector
			</Text>
			<Text fontSize="2xl" fontWeight="bolder" mb={2}>
				Precision implant detection for complete, structured records
			</Text>
			<Button 
				_hover={{bgColor: 'rgba(0, 0, 0, 0.1)'}}
				variant="outline" 
				size={'xs'}
				mt={4}
				px={6}
				py={'5'}
				rounded={'full'}
				borderWidth={2}
				color={'rgb(3, 83, 164)'}
			>
				Detect your Implant
			</Button>
		</Box>
  )
}

export default ContentThumbnail
