import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'

function createData(name, price, description, img){
    return {name, price, description, img}
}


const AdminProductCard = () => {
    const apiData = useSelector((state) => state.product.data)
    console.log(apiData)
    
    const rows = []
    if(apiData){
        apiData.forEach(el => rows.push(createData(el.name, el.price, el.description, el.img)))
    }

    console.log(rows)

  return (
    <Box>
            <TableContainer>
                <Table sx={{minWidth: 350}} arial-aria-label='catalog products table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>image</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>price($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow 
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ":hover": {
                                    bgcolor: "white"
                                }}}
                            >
                                <TableCell>
                                    <img src={`${row.img}`} width={'60px'} height={'auto'} />
                                </TableCell>
                                <TableCell component={"th"} scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell> {row.description} </TableCell>
                                <TableCell> {row.price} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </Box>
  )
}

export default AdminProductCard