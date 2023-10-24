import { Box, Button, InputBase, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [password, setPassword] = useState('')
    const [isFormDataValid, setIsFormDataValid] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.user.loading)
    console.log(isLoading)

    const handleFormData = () => {
        if(isEmailValid && password.length > 1){
            setIsFormDataValid(true)
        }else{
            setIsFormDataValid(false)
        }
    }

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    })

    const handleSubmit = async() => {
        dispatch(signInStart())
        try {
            const res = await axiosInstance.post('/api/v1/login', {email,password})
            if(res.status === 200){
                dispatch(signInSuccess(res.data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            dispatch(signInFailure(error))
        }
    }

    const handleEmail = (e) => {
        const newEmail = e.target.value
        setEmail(newEmail)

        //regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(newEmail))

        handleFormData()
    }
    console.log(email)

    const handlePassword = (e) => {
        setPassword(e.target.value)

        handleFormData()
    }

  return (
    <Box mt={'24px'} display={'flex'} flexDirection={'column'} alignItems={'center'} minWidth={'320px'}>
        <Typography variant='h6' textAlign={'center'}>
            Login to your account
        </Typography>

        <form onSubmit={(e) => {
            e.preventDefault()
        }}>
            <Box display={'flex'} flexDirection={'column'} maxWidth={'300px'} >
                <label id='email'>
                    Email
                </label>
                <InputBase sx={{bgcolor: 'secondary.light', borderRadius: '4px', pl: '4px'}} onChange={handleEmail}/>
            </Box>

            <Box display={'flex'} flexDirection={'column'} maxWidth={'320px'}>
                <label id='password'>
                    password
                </label>
                <InputBase type='password' sx={{bgcolor: 'secondary.light', borderRadius: '4px', pl: '4px', minWidth: '300px'}} onChange={handlePassword}/>
            </Box>

            <Box display={'flex'} width={'100%'} justifyContent={'center'} mt={'16px'}>
                <Button sx={{width: "100%", bgcolor: "primary.main", color: "white", ":hover" : {color: "primary.main"}}}
                    onClick={handleSubmit}
                    disabled = {!isFormDataValid}
                >
                    {
                        isLoading ? <CircularProgress size={'18px'}/> : <Box>login</Box>
                    }
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default Login