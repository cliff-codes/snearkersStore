import { Box, ButtonBase, Input, InputBase } from '@mui/material'
import React from 'react'

const SearchBar = () => {
  return (
    <Box width={"100%"} display={'flex'} justifyContent={"center"}>
        <Box display={'flex'} alignItems={'center'} mt={"16px"}>
            <InputBase placeholder='find a pair of sneakers' sx={{
                border: '1px solid',
                borderColor: 'secondary.darkGrey',
                borderRight: "none",
                height: "40px",
                borderRadius: "4px",
                padding: "0 8px",
                width: "250px"
            }}/>
            <ButtonBase  sx={{
                width: "60px",
                height: "41px",
                bgcolor: 'primary.main',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                position: "relative",
                left: "-3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.003" viewBox="0 0 20 20.003">
                    <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M19.728,17.294,15.833,13.4a.937.937,0,0,0-.664-.273h-.637a8.122,8.122,0,1,0-1.406,1.406v.637a.937.937,0,0,0,.273.664l3.895,3.895a.934.934,0,0,0,1.324,0l1.106-1.106a.942.942,0,0,0,0-1.328Zm-11.6-4.168a5,5,0,1,1,5-5A5,5,0,0,1,8.126,13.126Z" fill="#eaeaea"/>
                    </svg>
                </Box>
            </ButtonBase>
        </Box>
    </Box>
  )
}

export default SearchBar