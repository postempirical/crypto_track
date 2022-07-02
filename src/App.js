import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoinPage from './Pages/CoinPage';
import HomePage from './Pages/HomePage';
import Header from './components/Header';
import { Box } from '@mui/material'
import Alerts from './components/Alert'

function App() {
  return (
    <BrowserRouter>
      <Box sx={{backgroundColor: "#14161a", color: "white", minHeight: "100vh",}}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </Box>
      <Alerts />
    </BrowserRouter>
  );
}

export default App;
