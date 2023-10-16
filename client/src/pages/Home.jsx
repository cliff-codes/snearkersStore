import { Box } from '@mui/material'
import React from 'react'
import Showcase from '../components/Showcase'
import HotDeals from '../components/HotDeals'

const Home = () => {
  return (
    <Box>
        <Showcase/>
        <HotDeals/>
    </Box>
  )
}

export default Home