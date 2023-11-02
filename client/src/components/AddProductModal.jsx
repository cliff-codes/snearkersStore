import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/base/Button';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonBase, Input, InputBase, Typography, CircularProgress } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState } from 'react';
import axios from "axios"

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {addProductOnStart, addProductOnSucess, addProductOnFailure} from "../redux/product/productSlice"
import { useDispatch, useSelector } from 'react-redux';



export default function AddProductModal({openModal, closePortal}) {

  const fileRef = React.useRef(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState("")
  const [qtyInStock, setQtyInStock] = useState("")
  const [images, setImages] = useState(null)
  const [validData, setValidData] = useState(false)
  const [uploadPercentage, setuploadPercentage] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)
  const [img, setImg] = useState('')
  
  const dispatch = useDispatch()
  const loading = useSelector(state => state.product.loading)

  const handleFormData = (e) => {
    if(e.target.id === "name"){
      setName(e.target.value)
    }else if(e.target.id === "description"){
      setDescription(e.target.value)
    }else if(e.target.id === "price"){
      setPrice(e.target.value)
    }else if(e.target.id === "qtyInStock"){
      setQtyInStock(e.target.value)
    }
    // validateData()
  }
  console.log(name)
  console.log(images)
  console.log(validData)
  console.log(imageUrl)

  //validate form input data
  const validateData = () =>{
    if (name && price && description && qtyInStock && images){
      setValidData(true)
    }else{
      setValidData(false)
    }
  }

  React.useEffect(() => {
      validateData()
  },[name, price, description, qtyInStock, images])

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  }) 

  const handleSubmit = async() => {
    console.log('creating product')
    try {
      const res = await axiosInstance.post('/api/v1/create-product', {name, description, price, qtyInStock, img})
      console.log(res)
      if(res.status === 201){
        console.log(res.data)
        dispatch(addProductOnSucess(res.data))
        //close portal
        closePortal()
        
      }else{
        console.log(res)
        dispatch(addProductOnFailure(res.data))
      }
    } catch (error) {
      dispatch(addProductOnFailure(error))
      console.log(error)
    }
  }

  const handleImageUpload = (image) => {
    //set loading staate
    dispatch(addProductOnStart())

    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        setuploadPercentage(Math.round(progress))
      },
      (error) => {
        console.log('Error uploading file', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl)
        })
      }
    )
  }
  console.log(uploadPercentage)
  //make a post request.
  React.useEffect(() => {
      setImg(imageUrl)
      if(img){
        handleSubmit()  
      }
  },[imageUrl])
  return (
    <div>
      {/* <TriggerButton onClick={handleOpen}>Open modal</TriggerButton> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={openModal}>
          <ModalContent sx={style}>
              <Box width={'100%'} p={'0 10px 0 10px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                    <typography>Product</typography>
                    <Button onClick={closePortal}>
                      <CloseIcon/>
                    </Button>
                  </Box>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                  }} style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "400px",
                    gap: "8px",
                    marginTop: "8px"
                  }}>
                    <Box display={'flex'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
                      <label id='name'>
                        Name*
                      </label>
                      <InputBase id='name' sx={{
                        bgcolor: "secondary.light",
                        borderRadius: "4px",
                        pl: "4px"
                      }}
                        onChange={handleFormData}
                      />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
                      <label id='description'>
                        Description*
                      </label>
                      <TextareaAutosize id='description' style={{
                        minHeight: "200px",
                        minWidth: "180px"
                      }}
                        onChange={handleFormData}
                      />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
                      <label id='price'>
                        Price* $
                      </label>
                      <InputBase type='number' id='price' sx={{
                        bgcolor: "secondary.light",
                        borderRadius: "4px",
                        pl: "4px"
                      }}
                        onChange={handleFormData}
                      />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
                      <label id='qtyInStock'>
                        Qty In Stock*
                      </label>
                      <InputBase type='number' id='qtyInStock' sx={{
                        bgcolor: "secondary.light",
                        borderRadius: "4px",
                        pl: "4px"
                      }}
                        onChange={handleFormData}
                      />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={'8px'} justifyContent={'space-between'}>
                      <label id='images'>
                        Image(s)
                      </label>
                      <Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }} onClick = {() => fileRef.current.click()} width={'185px'} height={'100px'} bgcolor={'secondary.light'} borderRadius={'4px'}>
                          <input type='file' id='images' ref={fileRef} hidden accept='image/*' onChange={(e) => {
                            setImages(e.target.files[0])
                          }}/>
                          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                          <Typography fontSize={'14px'} variant='h7'>click to add image</Typography>
                          <CameraAltIcon/>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <ButtonBase sx={{
                      p: "8px 0",
                      border: "1.5px solid",
                      // borderColor: "primary.main",
                      bgcolor: "secondary.light",
                      borderRadius: "4px",
                      outline: "none",
                      transition: "all .1s ease",
                      ":hover": {
                        borderColor: "primary.main",
                        color: "primary.main"
                      }
                    }}
                      disabled = {!validData}
                      onClick={() => {
                        handleImageUpload(images)
                      }}
                    >
                      {
                        loading ? <CircularProgress size={'16px'}/> : 'Add product'
                      }
                    </ButtonBase>
                  </form>
              </Box>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width : '90%',
  maxWidth: '600px'
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);

const TriggerButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);