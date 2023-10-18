import { Box, Typography, Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Container>
        <Box minHeight={'300px'} width={'100%'} height={"100%"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h5'>
                Page cannot be found :(
            </Typography>
            <Link to={'/'}>visit homepage</Link>
        </Box>
    </Container>
  )
}

export default Error