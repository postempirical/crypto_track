import { Container } from '@mui/system'
import React from 'react'
import { Box, Typography } from '@mui/material'
import Carousel from './Carousel'

const style_Container = {
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
}

const style_tagline = {
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
}

const style_Carousel = {
  height: "50%",
  display: "flex",
  alignItems: "center",
}

export default function Banner() {
  return (
    <Box sx={{backgroundImage: "url(./banner2.jpg)"}}>
      <Container sx={{...style_Container}}>
        <Box sx={{style_tagline}}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Track
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>   
        </Box> 
        <Carousel sx={{...style_Carousel}}/>
      </Container>
    </Box>
  )
}
