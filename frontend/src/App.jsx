import { Box } from '@chakra-ui/react'
import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import DetectorPage from './pages/DetectorPage'

function App() {
  
  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/detector' element={<DetectorPage />} />
      </Routes>
    </Box>
  )
}

export default App
