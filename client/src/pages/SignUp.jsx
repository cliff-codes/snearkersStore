import React, { useState } from 'react'
import { Box, Container, InputLabel, InputBase, Typography, Button } from '@mui/material'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        password: null,
        reTypePassword: null,
    })
    const [formReadyToSubmit, setFormReadyToSubmit] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    
    //check if all input feilds are filled
    function arePropertiesValid(obj) {
        return Object.values(obj).every(val => val !== null && val !== '' && val !== undefined);
    }
     
    
    const handleFormData = (e) => {
        setFormData(prev => {
            const newFormData = {...prev, [e.target.id]: e.target.value}
            const bool = arePropertiesValid(newFormData)
            
            //checking for password input
            if(newFormData.password && newFormData.reTypePassword && newFormData.password === newFormData.reTypePassword){
                setValidPassword(true)
            }else{
                setValidPassword(false)
            }

            setFormReadyToSubmit(bool)
            return newFormData
        })
    }
    console.log(formData)
    console.log(formReadyToSubmit)

    const handleSubmit = () => {
        console.log('form submitted')
        //checking if all input the feilds are filled
        
    }

  return (
    <Container sx={{
        display : "flex",
        flexDirection: "column",
        gap: "16px"
    }}>
         <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={'32px'}>
            <Typography variant='h5'>
                Create your Account
            </Typography>
            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }} onSubmit={(e) => e.preventDefault()}>
                <Box>
                    <InputLabel>name</InputLabel>
                    <InputBase 
                        onChange={handleFormData}
                        id='name' sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '4px',
                        minWidth: '300px',
                        pl: '4px'
                    }}/>
                </Box>
                <Box>
                    <InputLabel>email</InputLabel>
                    <InputBase 
                        onChange={handleFormData}
                        type='email'
                        id='email' sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '4px',
                        minWidth: '300px',
                        pl: '4px'
                    }}/>
                </Box>
                <Box>
                    <InputLabel>password</InputLabel>
                    <InputBase 
                        onChange={(e) => {
                            handleFormData(e)
                          
                        }}
                        id='password' sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '4px',
                        minWidth: '300px',
                        pl: '4px'
                    }}/>
                </Box>
                <Box>
                    <InputLabel>re-type password</InputLabel>
                    <InputBase 
                        onChange={(e) => {
                            handleFormData(e)
                        }}
                        id='reTypePassword' sx={{
                        bgcolor: 'secondary.light',
                        borderRadius: '4px',
                        minWidth: '300px',
                        pl: '4px'
                    }}/>
                </Box>
                <Button  sx={{textTransform: "lowercase", color: 'secondary.light', bgcolor: 'primary.main', minWidth: '300px',
                "&:hover" : {
                    color : "secondary.main",
                    bgcolor: "secondary.light"
                },
                "&:focus": {
                    outline: "none"
                }
                }}
                    disabled = {!formReadyToSubmit && !validPassword}
                    type='submit'
                    onClick={handleSubmit}
                >sign-up</Button>
                <Button sx={{
                    textTransform: "lowercase",
                    border: "1px solid",
                    borderColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    "&:hover" : {
                        borderColor: "primary.main",
                    },
                    "&:focus" : {
                        outline: "none"
                    }
                }}>
                    <Box height={'100%'} display={'flex'}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    </Box>
                    sign up with google
                </Button>
            </form>
         </Box>
    </Container>
  )
}

export default SignUp