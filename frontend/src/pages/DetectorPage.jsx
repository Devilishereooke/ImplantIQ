import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../myComps/Navbar'
import DetectorMainContent from '../myComps/DetectorMainContent'
import Predictions from '../myComps/Predictions'
import { useState } from 'react';

function DetectorPage() {

  const [image, setImage] = useState(null);
  const [implantData, setImplantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (files) => {
    console.log('hi');
    
    if (!files || files.length === 0) return;
    
    const file = files.acceptedFiles[0];
    // console.log(file);
    
    setImage(URL.createObjectURL(file));
    setIsLoading(true);
    setImplantData(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // deconstruct the response into filename, content, type
      const data = await response.json();
      // console.log(data);
      setImplantData(data);
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <Box minH={'100vh'} bg={'white'}>
      <Navbar />
      <DetectorMainContent handleFileUpload={handleFileUpload}  />
      <Predictions 
        image={image} 
        implantData={implantData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setImplantData={setImplantData}
        setImage={setImage}
        handleFileUpload={handleFileUpload}
        />
    </Box>
  )
}

export default DetectorPage
