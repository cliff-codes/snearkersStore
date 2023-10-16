import { Box, Container, Grid, Skeleton, Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import ContentLoader from './ContentLoader'

const HotDeals = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    
  return (
    <Container sx={{mb: "16px"}}>
        <Box>
            <Typography variant='h6' color={'secondary.main'}>Hot Deals</Typography>
            <ContentLoader/> 
        </Box>
    </Container>
  )
}

export default HotDeals