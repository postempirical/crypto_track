import React from 'react'
import { Box } from '@mui/system'

export default function SelectButton({ children, selected, onClick }) {
    const style_button = {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        margin: 5,
    }
  
    return (
        <Box onClick={onClick} sx={{...style_button,}}>
        {children}
        </Box>
    )
}
