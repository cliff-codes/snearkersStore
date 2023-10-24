import { Box, ButtonBase } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const ProfileAndSignIn = () => {
  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <Box display={'flex'} alignItems={'center'}>
          { currentUser ? <Box border={'2px solid'} 
          borderColor = {'primary.main'} height={'40px'} width={'40px'} borderRadius={'50%'} sx={{
            backgroundImage: `url(${currentUser.profilePic})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}>

          </Box> : <Link to={'/login'} style={{
          color: "inherit",
          textDecoration: "none"
        }}> <ButtonBase>sign-In</ButtonBase>
          </Link>
        }
    </Box>
  )
}

export default ProfileAndSignIn