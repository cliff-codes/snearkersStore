import { Box, ButtonBase } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileAndSignIn = () => {
  return (
    <Box display={'flex'} alignItems={'center'}>
        <Link to={'/sign-up'} style={{
          color: "inherit",
          textDecoration: "none"
        }}>
          <ButtonBase>sign-In</ButtonBase>
        </Link>
    </Box>
  )
}

export default ProfileAndSignIn