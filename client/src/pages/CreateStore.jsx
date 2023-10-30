import axios from 'axios'
import { Box, Button, CircularProgress, Container, Input, InputBase, InputLabel, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import redSneakers from "../assets/readSneakers.png"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import {app} from '../firebase'
import {useDispatch, useSelector} from 'react-redux'
import {createStoreStart, createStoreSuccess, createStoreFailure} from "../redux/store/storeSlice"



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
}) 

const CreateStore = () => {
    
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [storeCoverImg, setStoreCoverImg] = useState(undefined)
    const fileRef = useRef(null)
    const [formData, setFormData] = useState({})
    const [coverImgUrl, setCoverImgUrl] = useState('')
    const [uploadPercentage, setuploadPercentage] = useState(0)
    const [uploadError, setuploadError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {currentUser} = useSelector(state => state.user)
    const {loading} = useSelector(state => state.store)

    //verifying if the user is permitted
    useEffect(() => {
        if(!currentUser){
            navigate('/login')
        }
    },[])


    //uploading cover image.
    useEffect(() => {
        if(storeCoverImg){
            handleImgUpload(formData.coverImg)
        }
    }, [storeCoverImg])

    const handleFormData = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    //handling data submit
    const handleSubmit = async() => {
        createStore(formData)
    }
    console.log(uploadPercentage)
    
    const createStore = async(data) => {
        dispatch(createStoreStart())
        try {
            const res = await axiosInstance.post('/api/v1/createStore', data)
            console.log(res)
            if(res.status === 201){
                dispatch(createStoreSuccess(res.data))
                navigate('/store')
            }else{
                dispatch(createStoreFailure(res.data))
            }
            console.log(res)
        } catch (error) {
            dispatch(createStoreFailure(error))
            console.log("Error" , error)
        }
    }
  

    const handleImgUpload = (image) => {
    setuploadPercentage(0)
    const storage = getStorage(); // Remove 'app' from here, as it's not defined in your code
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setuploadPercentage(Math.round(progress));
        },
        (error) => {
        setuploadError(error);
        console.log("Error uploading file: ", error);
        },
        () => {
        getDownloadURL(storageRef).then((downloadUrl) => {      
            //Pass the storage reference here
            setFormData({...formData, coverImg: downloadUrl});
            setCoverImgUrl(downloadUrl)
            console.log(formData)
        });
        }
    );
    };


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
                    }} id='storeName' onChange={handleFormData}/>
                </Box>
                <Box onClick = {(e) => {
                    console.log('clicked')
                    fileRef.current.click()
                }}>
                    {/* cover image for store */}
                    <input id='coverImg' type='file' ref={fileRef} accept='image/*' hidden = {'true'} onChange={(e) => {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        
                        reader.onload = () => {
                            const imageDataUrl = reader.result
                            setStoreCoverImg(imageDataUrl)
                        }

                        if(file){
                            reader.readAsDataURL(file)
                            setFormData({...formData, [e.target.id]: file })
                            console.log(formData.coverImg)
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
                    {uploadPercentage > 0 && uploadPercentage < 100 ? <Typography textAlign={'center'}>{`image upload${uploadPercentage}%`}</Typography> : uploadPercentage === 100 ? <Typography textAlign={'center'}>
                        uploaded successfully
                    </Typography> : null}
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
                }}
                    disabled = {formData.storeName && coverImgUrl ? false : true }
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    {loading ? <CircularProgress color='secondary.light' size={'18px'}/> : 'create store'}
                </Button>
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