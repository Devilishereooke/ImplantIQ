import React from 'react'
import { Box, VStack, Text, HStack, Button, Span, Spinner, Image } from '@chakra-ui/react'
import { useState } from 'react';
import { FileUpload } from "@chakra-ui/react"

function DetectorMainContent({handleFileUpload}) {

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
            <Span color={'yellow.400'}>KNOW THE IMPLANT </Span>
            FOCUS ON DELIVERING CARE
          </Text>
          <FileUpload.Root
            accept={['image/png', 'image/jpeg']}
            onFileChange={handleFileUpload}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Trigger asChild>
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
            </FileUpload.Trigger>
          </FileUpload.Root>
        </VStack>
    </Box>
  )
}

export default DetectorMainContent
