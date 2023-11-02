import { Box, Button, ButtonBase, Container, Typography, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Modal } from '@mui/base/Modal'
import AddProductModal from '../components/AddProductModal'
import { fetchProductStart, fetchProductSucess, fetchProductFailure } from '../redux/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AdminProductCard from './AdminProductCard'


const AdminLogin = () => {
    const [activeButton, setActiveButton] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const handleOpen = () => setOpenModal(true)
    const handleClose = () => setOpenModal(false)

    const productsLoading = useSelector(state => state.product.dataLoading)

    const modalStyle = {
        display: "absolute",
        width: "100%",
        height: "100%",
        top: "-300px",
        background: "black",
        opacity: ".2"
    }

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })

    useEffect(() => {
        const getProducts = async() => {
            try {
                dispatch(fetchProductStart())
                const response = await axiosInstance.get('/api/v1/products')
                // const {data} = await response
                // console.log(data)
                 const {data} = response
                console.log(data)
                if(response.status === 200){
                    dispatch(fetchProductSucess(data))
                }
            } catch (error) {
                console.log(error)
                dispatch(fetchProductFailure(error))
            }
        }
        getProducts()
    },[])
    
  return (
    <Container sx={{position: "relative"}}>
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
                    activeButton === 3 ? null : <Button sx={{bgcolor: "secondary.light"}} onClick={handleOpen}>
                    <AddIcon/>  
                    </Button>
                }
            </Box>
            <Box minHeight={'130px'} width={'100%'} 
            bgcolor={'secondary.light'} borderRadius={'4px'} p={'4px'} >
                {
                    productsLoading ? <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100%'}  height={'130px'}>
                        <CircularProgress size={'22px'} />
                    </Box> : <Box>
                        <AdminProductCard/>
                    </Box>
                }
                <AddProductModal 
                    openModal={openModal}
                    closePortal={handleClose}
                />
            </Box>
        </Box>
    </Container>
  )
}

export default AdminLogin