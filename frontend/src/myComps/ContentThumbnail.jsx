import { Box } from "@chakra-ui/react";
import React from "react";
import { Button, Text, Image } from "@chakra-ui/react";
import thumbnail1 from "../assets/thumbnail1.mp4";
import thumbnail2 from "../assets/chatbot_image.png";
import { Link } from "@chakra-ui/react";

function ContentThumbnail({ title, description, buttInst }) {
  const handleClick = () => {
    console.log("heyy");
  };

  const isChatBot = buttInst == "Talk to your Assistant";

  return (
    <Box
      flex={1}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      color={"black"}
      _hover={{
        boxShadow: "rgba(22, 15, 65, 0.14) 0px 2.9601px 14.2085px 0px",
        transform: "scale(1.02)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Box borderRadius={"lg"} overflow={"hidden"}>
        {isChatBot ? (
          <Image width={"100%"} height={"200px"} src={thumbnail2} />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            width={"100%"}
            style={{ objectFit: "cover" }}
          >
            <source src={thumbnail1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </Box>
      <Text
        fontSize={"xs"}
        fontWeight={"semibold"}
        mt={"4"}
        mb={2}
        color={"rgb(3, 83, 164)"}
      >
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="bolder" mb={2}>
        {description}
      </Text>
      <Link href={isChatBot ? "/chatbot" : "/detector"}>
        <Button
          _hover={{ bgColor: "rgba(0, 0, 0, 0.1)" }}
          variant="outline"
          size={"xs"}
          mt={4}
          px={6}
          py={"5"}
          rounded={"full"}
          borderWidth={2}
          color={"rgb(3, 83, 164)"}
          onClick={handleClick}
        >
          {buttInst}
        </Button>
      </Link>
    </Box>
  );
}

export default ContentThumbnail;
