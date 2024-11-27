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
    // const [events,setEvents] = useState(null);
    // const [revenue,setRevenue] = useState(null);
    // const [tourists,setTourists] = useState(null);
    // useEffect(() => {
    //     // Fetch activities from the backend API
    //     const fetchEvents = async () => {

    //         const token = localStorage.getItem('jwt'); // Get the token from local storage
    //         const userId = localStorage.getItem("id"); // Get user ID if needed
    //         console.log(userId);
    //         console.log(token);
    //         //const revenue =null;
    //         try {
    //             const response = await fetch("http://localhost:4000/cariGo/report", {
    //                 method: "GET", // Change this to "POST" if your backend expects it
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
                        
    //                 }
    //             });

    //             // console.log(Request.json())

    //             if (!response.ok) {
    //                 console.log(response)
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const json = await response.json().catch((err) => {
    //                 console.error('Error parsing JSON:', err);
    //                 throw new Error('Invalid JSON response');
    //             });
    //        // setRevenue(json.Revenue);
    //             console.log("Fetched activities:", json.report);
    //            const list = json.report.map(activity => activity.distinctUserCount)
    //            const sum = list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    //                console.log(sum); 
    //             setEvents(json.report); // Set activities if response is okay
    //           //  if(revenue)
    //              onHandleRev(json.Revenue)
    //             onHandleTour(sum)
    //         } catch (error) {
    //             console.log('Error fetching activities:', error);
    //         }
    //     };
    //     console.log(typeof onHandleRev ==="function")
    //     fetchEvents(); // Call the function to fetch activities
        
    // }, []);
   // if(revenue)
        //onHandleRev(revenue);
   //onHandleRev = revenue
    return (

        <DashboardCard title="Product Performance">
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
                                    Assigned
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((product) => (
                            <TableRow key={product.activityId}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.activityId}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.totalRevenue}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.period}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.period}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            //backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.period}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.totalRevenue}k</Typography>
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
