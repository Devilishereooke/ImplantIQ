import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../myComps/Navbar";
import TextParser from "../myComps/TextParser";

const Chatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help with your data today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(), // Better unique ID
        text: inputValue,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        });

        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = {
          id: Date.now() + 1,
          text: "Sorry, I couldn't process your request.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" bgColor="white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Chat messages area that grows downward and scrolls */}
      <Box
        flex="1"
        overflowY="auto"
        p={4}
        mt={"12"}
        display="flex"
        flexDirection="column"
      >
        <VStack
          spacing={4}
          align="stretch"
          width="100%"
          alignItems="flex-start"
        >
          {messages.map((message) => (
            <HStack
              key={message.id}
              alignSelf={message.sender === "bot" ? "flex-start" : "flex-end"}
              maxW="80%"
            >
              <Box
                bg={message.sender === "bot" ? "gray.100" : "blue.500"}
                color={message.sender === "bot" ? "black" : "white"}
                px={4}
                py={2}
                borderRadius="lg"
              >
                {message.sender === "bot" ? (
                  <TextParser content={message.text} />
                ) : (
                  <Text>{message.text}</Text>
                )}
              </Box>
            </HStack>
          ))}

          {isLoading && (
            <HStack alignSelf="flex-start">
              <SkeletonCircle size="10" />
              <VStack align="flex-start" spacing={2}>
                <Skeleton height="4" width="200px" />
                <Skeleton height="4" width="180px" />
              </VStack>
            </HStack>
          )}

          {/* Empty div for auto-scrolling */}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Fixed input area at the bottom */}
      <Box p={4} borderTop="1px solid" borderColor="gray.200" bg="white">
        <HStack>
          <Input
            placeholder="Ask about your data..."
            value={inputValue}
            color={"black"}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            colorPalette="blue"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            Send
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default Chatbot;
