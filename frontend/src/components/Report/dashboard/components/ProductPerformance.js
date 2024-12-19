import React, { useState,useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from './DashboardCard';



const ProductPerformance = ({events}) => {
    const role = localStorage.getItem("role")
    
    return (

        <DashboardCard title="Detailed Report">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
              {events &&  <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                           
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Period
                                </Typography>
                            </TableCell>
                            
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Revenue
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((product) => (
                            <TableRow key={role==="Advertiser"?product.activityId:role==="Seller"?product.productId:product.itineraryId}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {role==="Advertiser"?product.activityId:role==="Seller"?product.productId:product.itineraryId}
                                    </Typography>
                                </TableCell>
                                
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.period}
                                    </Typography>
                                </TableCell>
                                
                                <TableCell align="right">
                                    <Typography variant="h6">${product.totalRevenue}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
