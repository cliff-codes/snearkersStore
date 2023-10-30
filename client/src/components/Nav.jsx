import React, { useEffect, useState } from 'react'
import {Box, Container} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import Logo from './Logo'
import CartIcon from './cartIcon'
import ProfileAndSignIn from './ProfileAndSignIn'
import ToogleMenu from './ToogleMenu'
import NavLinks from './NavLinks'
import { useDispatch, useSelector } from 'react-redux'




const Nav = () => {
  const [showMenuIcon, setShowMenuIcon] = useState(false)

  //handling resizing contents
  useEffect(() => {
    const handleResize = () => {
      setShowMenuIcon(window.innerWidth < 480)
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  const dispatch = useDispatch();
  const expirationTime = useSelector(state => state.user.expirationTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (expirationTime && expirationTime < Date.now()) {
        // Dispatch the clearUserState action when session has expired
        dispatch(clearUserState());
        clearInterval(interval); // Stop checking once state is cleared
      }
    }, 1000); // Check every second (adjust as needed)

    return () => clearInterval(interval); // Clear the interval when component unmounts
  }, [dispatch, expirationTime]);

  return (
    <Container sx= {{
      height: "60px",
      boxShadow: " 0px 2px 0px 0px rgba(0,0,0,0.18)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} gap={'8px'} alignItems={'center'} >
            {showMenuIcon && <ToogleMenu/>}
            <Logo/>
          </Box>
          <NavLinks/>
          <Box display={'flex'} gap={'8px'} alignItems={'center'}>
            <CartIcon/>
            <ProfileAndSignIn/>
          </Box>
        </Box>
    </Container>
  )
}

export default Nav