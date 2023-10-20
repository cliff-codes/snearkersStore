import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box bgcolor={'secondary.main'} textAlign={'center'} minHeight={'120px'}>
        <Container sx={{pt: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px"}}>
            <Button>
              <Link to={'/create-store'}>
                Become a seller 
              </Link>
            </Button>
            <Typography  fontWeight={400} color={'secondary.light'}>
                Designed and Developed by Clifford @vision Studios 
            </Typography>
        </Container>
    </Box>
  )
}

export default Footer