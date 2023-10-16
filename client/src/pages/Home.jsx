import { Box } from '@mui/material'
import React from 'react'
import Showcase from '../components/Showcase'
import HotDeals from '../components/HotDeals'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <Box>
        <Showcase/>
        <HotDeals/>
        <Footer/>
    </Box>
  )
}

export default Home