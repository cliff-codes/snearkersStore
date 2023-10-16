import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { Box } from '@mui/material'

const NavLinks = () => {
    const [showNavLinks, setShowNavLinks] = useState(false)
    useEffect(() => {
        const displayNavLinks = () => {
            setShowNavLinks(window.innerWidth > 480)
        }
        displayNavLinks()

        window.addEventListener('resize', displayNavLinks)

        return () => {
            window.removeEventListener('resize', displayNavLinks)
        }
    },[])

    const linkStyle = {
        textDecoration : "none",
        fontSize: "16px",
        fontWeight: "400",
        color: "inherit",
        height: "100%",
        transition: "all .1s ease",
        "&:hover" : {
            border: "1px solid red"
        }
    }

  return (
    <Box>
        {
            showNavLinks && <Box display={'flex'} gap={'8px'}>
                <Link to={'/'} style={linkStyle}>
                    Men
                </Link>
                <Link to={'/'} style={linkStyle}>
                    Women
                </Link>
                <Link to={'/'} style={linkStyle}>
                    Collections
                </Link>
                <Link to={'/'} style={linkStyle}>
                    About
                </Link>
            </Box>
        }
    </Box>
  )
}

export default NavLinks