import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import AuthModal from "../components/Authentication/AuthModal"
import UserSidebar from './Authentication/UserSidebar';
export default function Header() {
  const navigate = useNavigate()
  const defaultValue = 'INR'
  const { currency, setCurrency, user } = CryptoState()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const style_Typography = {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography sx={{...style_Typography}} onClick={()=>navigate('/')} variant='h6'>Crypto Track</Typography>
            <Select 
            defaultValue={defaultValue}
            variant='outlined' 
            style={{width: 100, height: 40, marginRight:15,}}
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>  
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
