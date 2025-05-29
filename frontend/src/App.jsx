import { Box } from "@chakra-ui/react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DetectorPage from "./pages/DetectorPage";
import LoginPage from "./pages/LoginPage";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detector" element={<DetectorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Box>
  );
}

export default App;
