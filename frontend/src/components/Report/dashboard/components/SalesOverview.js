import React from 'react';
//import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from './DashboardCard';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Fab, IconButton, Button, MenuItem, Select, TextField, FormControl, InputLabel, Checkbox, FormControlLabel, Slider, OutlinedInput } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'; // For Date Picker
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import { IconFilterMinus } from '@tabler/icons-react'
import { IconFilterSearch } from '@tabler/icons-react'
import { IconFilterCancel } from '@tabler/icons-react'
import CloseIcon from '@mui/icons-material/Close';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
const SalesOverview = ({ onHandleRev, onHandleEvents, onHandleTour, onH }) => {
  const role = localStorage.getItem("role");
    // select
    const [month, setMonth] = React.useState('1');
    const [filter, setFilter] = useState(false)
    const [filterx, setFilterx] = useState(false)
    const [filterOption, setFilterOption] = useState('');
    const [date, setDate] = useState(null);
    const [isMonthFilter, setIsMonthFilter] = useState(false);
    const [Month, setmonth] = useState(null); // State for the selected month
   const [titles,setTitles] = useState(null)
   const [finalFilter,setFinalFilter] = useState("")
   let filterSoFar="";
    const handleDateChange = (newDate) =>{ 
        setmonth(null)
        setDate(newDate.target.value)};
    const handleMonthChange = (event, newMonth) => {
        
        
        setmonth(newMonth); // Update the independent month state
        //setDate(new Date(date.getFullYear(), newMonth, 1)); // Optionally update the date
      };
      console.log(Month)
    const handleFilterOptionChange = (event) => setFilterOption(event.target.value);
    const handleToggleDateMonth = (event) => setIsMonthFilter(event.target.checked);
    const handleChange = (event) => {
        setMonth(event.target.value);
        setDate(null)
    };
    useEffect(() => {
        const fetchTitles = async () => {
            const token = localStorage.getItem('jwt'); // Get the token from local storage
            const userId = localStorage.getItem("id"); // Get user ID if needed
            
            console.log(userId);
            console.log(token);
            //const revenue =null;
            try {
              if(role!=="Seller"){
                const response = await fetch(`http://localhost:4000/cariGo/activity/getTitles/${userId}`, {
                    method: "GET", // Change this to "POST" if your backend expects it
                    headers: {
                        "Authorization": `Bearer ${token}`, // Send the token in the Authorization header

                    }
                });

                // console.log(Request.json())

                if (!response.ok) {
                    console.log(response)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json().catch((err) => {
                    console.error('Error parsing JSON:', err);
                    throw new Error('Invalid JSON response');
                });
                // setRevenue(json.Revenue);
                console.log("Fetched Titles:", json.activityTitles);
                setTitles(json.activityTitles)
                //setEvents(json.report); // Set activities if response is okay
                //  if(revenue)
                //onHandleRev(json.Revenue)
              }
              else{
                ////////YOUR PART /////////////////////////////////////////////////////////////////////////////
              }
            } catch (error) {
                console.log('Error fetching :', error);
            }
        }
        fetchTitles();
    }, [])
    
   
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Eanings this month',
            data: [355, 390, 300, 350, 390, 180, 355, 390],
        },
        {
            name: 'Expense this month',
            data: [280, 250, 325, 215, 250, 310, 280, 250],
        },
    ];
    const [events, setEvents] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [tourists, setTourists] = useState(null);
    const [open, setOpen] = useState(false);
    const getMonthName = (monthIndex) => {
        switch (monthIndex) {
          case 0:
            return "January";
          case 1:
            return "February";
          case 2:
            return "March";
          case 3:
            return "April";
          case 4:
            return "May";
          case 5:
            return "June";
          case 6:
            return "July";
          case 7:
            return "August";
          case 8:
            return "September";
          case 9:
            return "October";
          case 10:
            return "November";
          case 11:
            return "December";
          default:
            return "Invalid Month"; // Handles unexpected values
        }
      };
      
      // Example usage
    //  const monthIndex = 3; // Replace with your numeric month index
      //console.log(getMonthName(monthIndex)); // Output: "April"
      
    // Handlers for opening and closing the modal
    const handleOpen = () => {
        
        if(!filterx)
        setOpen(true)
         else{
            filterSoFar="";
            setFinalFilter("")
            setOpen(false);setFilterOption(null);  setDate(null);setmonth(null);
            setFilterx(false)
         }

    };
    
    const handleClose = () => setOpen(false);
    const handleReset = () =>{ setOpen(false);setFilterOption(null);  setDate(null);setmonth(null)}
    const fetchEvents = async () => {

        const token = localStorage.getItem('jwt'); // Get the token from local storage
        const userId = localStorage.getItem("id"); // Get user ID if needed
        console.log(userId);
        console.log(token);
        //const revenue =null;
        try {
          if(role!=="Seller"){
            const response = await fetch(`http://localhost:4000/cariGo/report/${finalFilter}`, {
                method: "GET", // Change this to "POST" if your backend expects it
                headers: {
                    "Authorization": `Bearer ${token}`, // Send the token in the Authorization header

                }
            });

            // console.log(Request.json())

            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json().catch((err) => {
                console.error('Error parsing JSON:', err);
                throw new Error('Invalid JSON response');
            });

            // setRevenue(json.Revenue);
            console.log("Fetched activities:", json.report);
            const events = json.report;

            const list = json.report.map(activity => activity.distinctUserCount)
            const sum = list.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            console.log(sum);
            onHandleTour(sum)
            onHandleRev(json.Revenue)
            onH(events)}
            else{
              ////////////////////YOUR PARTTTTTTTTTTTTT/////////////////////////////////////////////////
            }


            //setEvents(json.report); // Set activities if response is okay
            //  if(revenue)



        } catch (error) {
            console.log('Error fetching activities:', error);
        }
    };
    useEffect(() => {
        // Fetch activities from the backend API
       
        console.log("Entered")
        fetchEvents(); // Call the function to fetch activities

    }, [finalFilter]);
    const handleFilter = async () => {
        filterSoFar+="?"
         setFilterx(true)
        setOpen(false)
        if(filterOption)
            filterSoFar+=`title=${filterOption}`
        if(Month | Month===0)
            filterSoFar+=`&month=${Month+1}`
        else
          if(date)
            filterSoFar+=`&date=${date}`
        //    console.log(Month | Month===0?Month:"No month is given")
        //    console.log(date?date:"No Date is given")
        //    console.log(filterOption?filterOption:"No option is given")
        //setFilter(!filter)
        setFinalFilter(filterSoFar)
        console.log(finalFilter);
      //  fetchEvents();
    }
    return (
        <>
            <DashboardCard title="Sales Overview" action={
                <Fab color="primary" size="medium" sx={{ color: '#ffffff' }} onClick={handleOpen}>
                    {!filterx && <IconFilterSearch width={24} />}
                     {filterx && <IconFilterCancel width={24}/>}
                </Fab>

                // <Select
                //     labelId="month-dd"
                //     id="month-dd"
                //     value={month}
                //     size="small"
                //     onChange={handleChange}
                // >
                //     <MenuItem value={1}>March 2023</MenuItem>
                //     <MenuItem value={2}>April 2023</MenuItem>
                //     <MenuItem value={3}>May 2023</MenuItem>
                // </Select>
            }>
                {<Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="bar"
                    height="370px"
                />}
            </DashboardCard>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="filter-modal-title"
                aria-describedby="filter-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '70%', md: '35%' },
                        bgcolor: 'background.paper',
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(240, 248, 255, 0.9), rgba(224, 255, 255, 0.8))', // Softer gradient with transparency
                        border: '1px solid rgba(173, 216, 230, 0.8)', // Semi-transparent border to match
                        borderRadius: 10,
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)', // Subtle layered shadows
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        transition: 'all 0.6s ease-in-out', // Smooth all property transitions
                        '&:hover': {
                            transform: 'translate(-50%, -50%) scale(1.05)', // Slight hover scale
                            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)', // More pronounced hover shadow
                        },
                        animation: 'fadeIn 0.8s ease-in-out', // Entry animation with ease-in-out
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0, transform: 'translate(-50%, -60%) scale(0.9)' },
                            '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                        },
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'rgba(173, 216, 230, 0.8)', // Color to match the modal
                            '&:hover': {
                                color: 'rgba(2, 136, 209, 0.8)', // Hover color change
                            }
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="filter-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Filter Options
                    </Typography>

                    <Typography id="filter-modal-description" sx={{ mb: 3 }}>
                        Choose your filters below:
                    </Typography>

                    {/* Filter Dropdown */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically (optional if needed)
    width: '100%', // Full-width container
    mt: 2, // Add spacing from other elements
  }}
>
  <InputLabel 
  style={{marginLeft:"120px",marginTop:"18px"}}
    id="filter-dropdown-label" 
    sx={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '1.0rem' }} // Subtle label styling
  >
    Filter Option
  </InputLabel>
  

  <Select 
    labelId="filter-dropdown-label"
    id="filter-dropdown"
    value={filterOption}
    label="Filter Option"
    onChange={handleFilterOptionChange}
    sx={{
      bgcolor: 'rgba(255, 255, 255, 0.9)', // Lighter background
      borderRadius: 3,
      border: '1px solid rgba(200, 200, 200, 0.7)', // Subtle border
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Minimal shadow
      '&:hover': {
        borderColor: 'rgba(135, 206, 235, 0.8)', // Highlight on hover
      },
      '& .MuiSelect-icon': {
        color: 'rgba(0, 0, 0, 0.6)', // Subtle arrow color
      },
      width:"50%",
      
      //marginLeft:"20px"
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          bgcolor: 'rgba(255, 255, 255, 0.95)', // Dropdown background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for dropdown
          borderRadius: 3, // Rounded corners for dropdown
          mt: 1, // Slight spacing between the select and dropdown
        },
      },
    }}
  >
    {titles && titles.map((option) => (
      <MenuItem
        key={option.value}
        value={option}
        sx={{
          px: 2,
          py: 1,
          '&:hover': {
            bgcolor: 'rgba(173, 216, 230, 0.5)', // Light blue hover effect
            color: 'rgba(0, 0, 0, 0.9)', // Darker text on hover
          },
        }}
      >
        {option}
      </MenuItem>
    ))}
  </Select>
  </Box>
</FormControl>



                    {/* Date or Month Filter Toggle */}
                    <FormControlLabel
                        control={<Checkbox checked={isMonthFilter} onChange={handleToggleDateMonth} />}
                        label="Select by Month"
                        sx={{ mb: 1 }}
                    />

                    {/* Date Picker / Month Picker */}
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                    {!isMonthFilter ? (
                        <OutlinedInput
                            label="Select Date"
                            inputFormat="MM/DD/YYYY"
                            type='date'
                            value={date?date:null}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} sx={{ width: '100%', mb: 5 }} style={{marginBottom:"10px"}} />}
                        />
                    ) : (
                        <Box sx={{ width: '100%', mb: 5, textAlign: 'center' }}>
  <Typography 
    variant="h6" 
    sx={{ mb: 2, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)' }}
  >
    Select Month
  </Typography>
  
  <Slider
        value={Month} // Bind to the independent month state
        min={0}
        max={11}
        step={1}
        onChange={handleMonthChange}
        valueLabelDisplay="on"
        valueLabelFormat={(value) =>
          new Date(0, value).toLocaleString("default", { month: "long" })
        }
        sx={{
          width: "70%",
          height: 8,
          "& .MuiSlider-rail": {
            bgcolor: "rgba(0, 0, 0, 0.1)", // Subtle rail background
          },
          "& .MuiSlider-track": {
            bgcolor: "rgba(30, 144, 255, 0.8)", // Vibrant track color
          },
          "& .MuiSlider-thumb": {
            bgcolor: "white", // Thumb color
            border: "2px solid rgba(30, 144, 255, 0.8)", // Matching thumb border
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for thumb
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Larger shadow on hover
            },
          },
          "& .MuiSlider-valueLabel": {
            bgcolor: "rgba(30, 144, 255, 0.9)", // Label background
            color: "white", // Label text color
            borderRadius: "8px", // Rounded label
            fontSize: "0.9rem", // Slightly larger text
            fontWeight: "bold",
            px: 1,
            py: 0.5,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Shadow for label
          },
        }}
      />

  <Typography 
    variant="body2" 
    sx={{ mt: 2, color: 'rgba(0, 0, 0, 0.6)' }}
  >
    Current Selection: {Month | Month===0?getMonthName(Month):"None"}
  </Typography>
</Box>

                    )}
                    {/* </LocalizationProvider> */}
                    {/* Buttons */}
                    <Box display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="contained" color="primary" onClick={handleFilter}>
                            Apply
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleReset}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>

    );
};

export default SalesOverview;
