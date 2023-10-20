import { Box, Button, Container, Input, InputBase, InputLabel, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import redSneakers from "../assets/readSneakers.png"
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CreateStore = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [storeCoverImg, setStoreCoverImg] = useState()
    const fileRef = useRef(null)

  return (
    <Container sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "400px"
    }}>
        <Box  display={'flex'} flexDirection={'column'} gap = {'32px'}>
            <Typography textAlign={'center'} variant='h5'>Create your Store</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Box>
                    <InputLabel>store name</InputLabel>
                    <InputBase sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '5px',
                        minWidth: '300px',
                        pl: '4px'
                    }} id='store-name' />
                </Box>
                <Box>
                    {/* cover image for store */}
                    <input type='file' ref={fileRef} accept='image/*' onChange={(e) => {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        
                        reader.onload = () => {
                            const imageDataUrl = reader.result
                            setStoreCoverImg(imageDataUrl)
                        }

                        if(file){
                            reader.readAsDataURL(file)
                        }

                    }}/>
                    <Box width={'100%'} border={'1px solid '} display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100px'} borderColor={'primary.main'} borderRadius={'4px'} sx={{
                       backgroundImage: `url(${storeCoverImg})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat'
                    }}>
                        <CameraAltIcon/>
                    </Box>
                </Box>
                <Button sx={{
                    bgcolor: 'primary.main',
                    color: 'secondary.light',
                    minWidth: '300px',
                    '&:focus': {
                        color: 'primary.main',
                        borderColor: 'secondary.main'
                    },
                    outline: 'none',
                    textTransform: 'lowercase'
                }}>create store</Button>
            </Box>
        </Box>
        {!isSmallScreen ? <Box width={'50%'} minHeight={'500px'} height={'100%'} sx={{
            backgroundImage : `url(${redSneakers})`,
            bgcolor: 'primary.main',
            backgroundPosition: 'center',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
        }}>
            
        </Box>: null}
    </Container>
  )
}

export default CreateStore