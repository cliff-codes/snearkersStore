import { Box, Button, ButtonBase, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'


const AdminLogin = () => {
    const [activeButton, setActiveButton] = useState(1)
    
  return (
    <Container>
        <Box display={'flex'} justifyContent={'center'} mt={'24px'} gap={'8px'}>
            <ButtonBase sx={{
                color: activeButton === 1 ? "white" : "secondary.main", 
                bgcolor:  activeButton === 1 ? "secondary.main" : "secondary.light",
                p: "0 8px 0 8px",
                borderRadius: "4px",
                textAlign: "center",
                height: "40px",
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                textTransform: "lowercase",
                transition: ".1s ease",
                ":focus": {
                outline: "none"
            }}} onClick={() => {
                setActiveButton(1)
            }}>products</ButtonBase>
           
           <ButtonBase sx={{
                color: activeButton === 2 ? "white" : "secondary.main", 
                bgcolor:  activeButton === 2 ? "secondary.main" : "secondary.light",
                p: "0 8px 0 8px",
                borderRadius: "4px",
                textAlign: "center",
                height: "40px",
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                textTransform: "lowercase",
                transition: ".1s ease",
                ":focus": {
                outline: "none"
            }}} onClick={() => {
                setActiveButton(2)
            }}>collections</ButtonBase>

            <ButtonBase sx={{
                color: activeButton === 3 ? "white" : "secondary.main", 
                bgcolor:  activeButton === 3 ? "secondary.main" : "secondary.light",
                p: "0 8px 0 8px",
                borderRadius: "4px",
                textAlign: "center",
                height: "40px",
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                textTransform: "lowercase",
                transition: ".1s ease",
                ":focus": {
                outline: "none"
            }}} onClick={() => {
                setActiveButton(3)
            }}>orders</ButtonBase>
        </Box>

        <Box mt={'16px'}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={'8px'}>
                <Typography fontWeight={600}>{
                    activeButton === 1 ? "products" : activeButton === 2 ? "collections" : "orders"
                }</Typography>
                
                {
                    activeButton === 3 ? null : <Button sx={{bgcolor: "secondary.light"}}>
                    <AddIcon/>  
                    </Button>
                }
            </Box>
            <Box minHeight={'130px'} width={'100%'} bgcolor={'secondary.light'} borderRadius={'4px'}>

            </Box>
        </Box>
    </Container>
  )
}

export default AdminLogin