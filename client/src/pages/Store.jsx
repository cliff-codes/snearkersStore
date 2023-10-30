import { Box, Container } from '@mui/material'
import React from 'react'

const Store = () => {
  return (
    <Container sx={{border: "1px solid red", mt:"16px"}}>
        <Box bgcolor={'primary.main'} height={'250px'}  borderRadius={'2px'} width={'100%'}>
            Banner
        </Box>
    </Container>
  )
}

export default Store