import React from 'react'
import SearchBar from './SearchBar'
import {Box, Container, Typography, useMediaQuery, useTheme} from "@mui/material"
import backgroundSneakerImg from '../assets/sneker.jpg'


const Showcase = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Container>
        {
            isSmallScreen && <SearchBar/>
        }
        <Box display={'flex'}  mt={'48px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Typography maxWidth={'300px'} variant={isSmallScreen ? 'h3' : isMediumScreen ? 'h2' : 'h1'} fontWeight={'bold'} color={'secondary.darkGrey'}pt={'16px'}>
                    Lead
                    With
                    Ease
                </Typography>
                {isMediumScreen || isLargeScreen ? <SearchBar/> : null}
            </Box>

            <Box position={'relative'} >
                <Box width={isSmallScreen ? '200px' : isMediumScreen ? '300px' : '500px' } height={isSmallScreen ? '200px' : isMediumScreen ? '300px' : '500px'} bgcolor={'secondary.darkGrey'} borderRadius={'4px'}>
                    
                </Box>
                <Box position={'absolute'} top={isSmallScreen ? '12px' : '24px'} left={isSmallScreen ? '12px' : '24px'} width={isSmallScreen ? '200px' : isMediumScreen ? '300px' : '500px' } height={isSmallScreen ? '200px' : isMediumScreen ? '300px' : '500px'} bgcolor={'primary.main'} borderRadius={'4px'} sx={{
                    backgroundImage: `url(${backgroundSneakerImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    
                </Box>
            </Box>
        </Box>
    </Container>
  )
}

export default Showcase