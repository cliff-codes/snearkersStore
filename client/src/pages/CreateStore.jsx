import { Box, Button, Container, Input, InputBase, InputLabel, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import redSneakers from "../assets/readSneakers.png"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import axios from 'axios';

const CreateStore = () => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [storeCoverImg, setStoreCoverImg] = useState()
    const fileRef = useRef(null)
    const [formData, setFormData] = useState({})
    const [uploadPercentage, setuploadPercentage] = useState(0)
    const [uploadError, setuploadError] = useState()

    const handleFormData = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }
    console.log(formData)

    //handling data submit
    const handleSubmit = async() => {
        //store cover img in firestore
        handleImgUpload(formData.coverImg)
        
    }
    console.log(uploadPercentage)
    //handling image upload for coverImages.
    // const handleImgUpload = (image) => {
    //     const storage = getStorage(app)
    //     const fileName = new Date().getTime() + image.name
    //     const storageRef = ref(storage, fileName)
    //     const uploadTask = uploadBytesResumable(storageRef, image)
        

    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
    //             setuploadPercentage(Math.round(progress))
                
    //         },
    //         (error) => {
    //             setuploadError(error)   
    //             console.log("Error uploading file: ", error)
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
    //                 setFormData({...formData, coverImg: downloadUrl})
    //                 console.log(formData)
    //             })
    //         }
    //     )
    // }



    const handleImgUpload = (image) => {
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
        getDownloadURL(storageRef).then((downloadUrl) => { // Pass the storage reference here
            setFormData({...formData, coverImg: downloadUrl});
            console.log(formData);
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
                    disabled = {formData.storeName && formData.coverImg ? false : true}
                    onClick={handleSubmit}
                >create store</Button>
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