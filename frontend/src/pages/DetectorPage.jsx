import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../myComps/Navbar";
import DetectorMainContent from "../myComps/DetectorMainContent";
import Predictions from "../myComps/Predictions";
import { useState, useRef } from "react";

function DetectorPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [implantData, setImplantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollDown = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      const comp = document.querySelector(".detailed-content");
      if (comp) {
        comp.scrollIntoView({ behavior: "smooth" });
      }
    }, 10);
  };

  const handleFileUpload = async (files) => {
    console.log("hi");

    if (!files || files.length === 0) return;

    const file = files.acceptedFiles[0];
    // console.log(file);

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // deconstruct the response into filename, content, type
      const data = await response.json();
      console.log(data.implant_data.detections);

      const predictedImageUrl = `data:image/jpeg;base64,${data.predicted_image}`;
      setImage(predictedImageUrl);
      setIsLoading(false);
      setImplantData(data.implant_data.detections);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box minH={"100vh"} bg={"white"}>
      <Navbar />
      <DetectorMainContent handleFileUpload={handleFileUpload} image={image} />

      <Box px={"44"} py={"7"} maxW="1080px" color={"black"}>
        <Box display={"flex"} justifyContent={"center"}>
          {isLoading && (
            <Text fontWeight={"bolder"} fontSize={"3xl"}>
              Please Wait...
            </Text>
          )}
          {implantData.length > 0 && (
            <Button
              // bgColor={'rgb(255, 201,113)'}
              variant={"outline"}
              color={"rgb(0, 48, 73)"}
              borderColor={"rgb(255, 149, 5)"}
              _hover={{
                bgColor: "rgb(255, 201,113)",
                color: "white",
              }}
              onClick={scrollDown}
              mb={"10"}
            >
              {isOpen ? "Hide" : "Show"} Detailed Result
            </Button>
          )}
        </Box>
        {implantData.length > 0 && (
          <Predictions
            isOpen={isOpen}
            image={image}
            implantData={implantData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setImplantData={setImplantData}
            setImage={setImage}
            handleFileUpload={handleFileUpload}
          />
        )}
      </Box>
    </Box>
  );
}

export default DetectorPage;
