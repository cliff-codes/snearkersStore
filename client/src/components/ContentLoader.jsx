import {Grid, Skeleton} from '@mui/material'
import React from 'react'

const ContentLoader = () => {
  return (
    <>
         <Grid container spacing={3} >
                <Grid item xs = {6}>
                    <Skeleton width={'100%'} height={'180px'}/>
                    <Skeleton width={'100%'} height={'40px'}/>
                </Grid>
                <Grid item xs = {6}>
                    <Skeleton width={'100%'} height={'180px'}/>
                    <Skeleton width={'100%'} height={'40px'}/>
                </Grid>
                <Grid item xs = {6}>
                    <Skeleton width={'100%'} height={'180px'}/>
                    <Skeleton width={'100%'} height={'40px'}/>
                </Grid>
                <Grid item xs = {6}>
                    <Skeleton width={'100%'} height={'180px'}/>
                    <Skeleton width={'100%'} height={'40px'}/>
                </Grid>            
            </Grid>
    </>
  )
}

export default ContentLoader