import React from 'react'
import { Box, Button, Container } from '@chakra-ui/react'
import { Flex, HStack, Text, VStack, SimpleGrid} from '@chakra-ui/react'
import Navbar from '../myComps/Navbar'
import MainContent from '../myComps/MainContent'
import myVideo from '../assets/myVideo.mp4'
import ContentThumbnail from '../myComps/ContentThumbnail'

function HomePage() {
  return (
  	<Box minH={"100vh"}>
			<Box position={"relative"} pb={16}>
				<video autoPlay loop muted playsInline className='background-clip'>
					<source src={myVideo} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<Box>
					<Navbar />
					<MainContent />
				</Box>
			</Box>

			{/* Bottom Container */}
			<Box px={40} py={'20'} bgColor={'white'}>
				<SimpleGrid columns={2} gap={'40px'}>
						<Box>
						<Text fontSize="x-small" letterSpacing={'0.3em'} fontWeight="bolder" mt={2} color={'rgb(98, 47, 180)'} >
								IMPLANT AND MORE WITH
						</Text>
						<Text fontSize="4xl" fontWeight="bold" color="blue.900">
								ImplantIQ
						</Text>
						</Box>

						<Box>
						<Text color={'black'} mb={'5'}>
							Detect implants in seconds, access verified clinical knowledge instantly. Transform diagnostics with ImplantIQ’s RAG platform.
						</Text>
						<Button variant={'solid'} colorPalette={'purple'} rounded={'full'} >
							Learn More about ImplantIQ
						</Button>
						</Box>
						
						<ContentThumbnail />

						<ContentThumbnail />
				</SimpleGrid>
			</Box>
  	</Box>
  )
}

export default HomePage
