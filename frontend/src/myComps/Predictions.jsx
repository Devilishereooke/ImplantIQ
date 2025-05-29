import { Box, Image, VStack, Text, Span } from "@chakra-ui/react";
import React from "react";
import TextParser from "./TextParser";

function Predictions({ isOpen, implantData }) {
  console.log("In predictions");
  return (
    <Box
      display={!isOpen ? "none" : "flex"}
      flexDir="row"
      gap={6} // Changed from gapX to gap for consistent spacing
      className="detailed-content"
      mt={8}
      overflowX="auto" // Better browser compatibility than "scroll"
      width="full" // Parent container takes full width
      px={4} // Padding to avoid edge-cutting
    >
      {implantData.map((item, idx) => (
        <VStack
          key={idx} // Moved key here (best practice for list items)
          p={6}
          borderRadius="md"
          borderColor="gray.200"
          borderWidth="2px"
          width="2xl" // Fixed width for each box
          minWidth="2xl" // Prevents shrinking
          bg="white"
          _hover={{
            boxShadow: "xl",
            transform: "translateY(-2px)",
          }}
          transition="all 0.2s ease-in-out"
          align="start" // Left-align content
        >
          <Box
            fontSize={"lg"}
            fontWeight={"bolder"}
            mb={"6"}
            color="grey.900"
            p={"2"}
            alignSelf={"center"}
            borderRadius={"md"}
            backgroundColor={"purple.200"}
          >
            Detected Implant {idx + 1}
          </Box>
          {/* Decorative Class Name Box */}
          <Box
            bg="yellow.100"
            px={3}
            py={1}
            borderRadius="md"
            fontWeight="bold"
            mb={2}
          >
            <Text fontSize="lg" color="gray.800">
              🏷️ {item.class_name}
            </Text>
          </Box>

          {/* Measurements */}
          <VStack align="start" spacing={2} width="full">
            <Text>
              <Span fontWeight={"bold"}>Length:</Span> {item.length_px} px
            </Text>
            <Text>
              <Span fontWeight={"bold"}>Diameter:</Span> {item.diameter_px} px
            </Text>
            <Text>
              <Span fontWeight={"bold"}>Confidence:</Span>{" "}
              {item.confidence * 100} %
            </Text>
          </VStack>

          {/* RAG Response (with top border separator) */}
          <Box
            pt={4}
            mt={4}
            borderTop="1px dashed"
            borderColor="gray.200"
            width="full"
          >
            <TextParser content={item.search_response} />
          </Box>
        </VStack>
      ))}
    </Box>
  );
}

{
  /* Image Preview */
}
{
}

{
  /* Loading State */
}
{
  /* {isLoading && (
        <Box>
          <Spinner size="xl" color="yellow.400" />
          <Text mt={4} color="black">Analyzing implant...</Text>
        </Box>
      )} */
}

export default Predictions;
