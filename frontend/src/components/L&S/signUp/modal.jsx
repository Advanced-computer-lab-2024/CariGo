import React from 'react';
//import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//import DashboardCard from './DashboardCard';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Fab, IconButton, Button, MenuItem, Select, TextField, FormControl, InputLabel, Checkbox, FormControlLabel, Slider, OutlinedInput } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'; // For Date Picker
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import { IconFilterMinus } from '@tabler/icons-react'
import { IconFilterSearch } from '@tabler/icons-react'
import { Container } from '@mui/material';
import { IconFilterCancel } from '@tabler/icons-react'
import CloseIcon from '@mui/icons-material/Close';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
const TAmodal = ({ handle }) => {
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
      //console.log(Month)
    const handleFilterOptionChange = (event) => setFilterOption(event.target.value);
    const handleToggleDateMonth = (event) => setIsMonthFilter(event.target.checked);
    const handleChange = (event) => {
        setMonth(event.target.value);
        setDate(null)
    };
    const [checked , setChecked] = useState(false);
    const [open, setOpen] = useState(false);
   
   // Example usage
    //  const monthIndex = 3; // Replace with your numeric month index
      //console.log(getMonthName(monthIndex)); // Output: "April"
      
    // Handlers for opening and closing the modal
    const handleOpen = () => {
        setOpen(true)
           };
    
    const handleClose = () => {};
    const handleReset = () =>{ }
    
    
    const handleFilter = async () => {
        
        console.log("s");
      //  fetchEvents();
    }
    return (
        <>
           
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
                    <div style={{
      height: '300px',      // Set a fixed height
      overflowY: 'scroll',  // Enable vertical scrolling
      border: '1px solid #ccc',
      padding: '10px'
    }}>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        1. Acceptance of Terms: By using our trip planner system, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using the service.
      </Typography>
      <Typography variant="body1" paragraph>
        2. Eligibility: Only individuals who are at least 18 years of age can register and use this system. Minors must use the system under the supervision of an adult.
      </Typography>
      <Typography variant="body1" paragraph>
        3. User Responsibilities:
        <ul>
          <li>Users must provide accurate and up-to-date information during registration and while planning trips.</li>
          <li>Users agree not to share their login credentials and are responsible for activities under their account.</li>
          <li>Misuse of the system, such as submitting false information, harassment of other users, or misuse of resources, is prohibited.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        4. Booking and Payment:
        <ul>
          <li>Our system provides information on trips, and where applicable, allows for the booking of accommodations, tours, or guides.</li>
          <li>Prices displayed are subject to change based on availability and seasonal variations.</li>
          <li>Full payment may be required to confirm bookings. Cancellation and refund policies may vary by booking and should be reviewed before payment.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        5. Cancellation and Refund Policy:
        <ul>
          <li>Users can cancel bookings in accordance with the provider's policy. Refunds are subject to provider terms and may include fees.</li>
          <li>The platform reserves the right to modify or cancel trips in case of unforeseen circumstances, including weather conditions, health risks, or other emergencies.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        6. User-Generated Content:
        <ul>
          <li>Users may post reviews, ratings, and feedback regarding their trips. This content must be respectful, truthful, and free from inappropriate or offensive language.</li>
          <li>The platform reserves the right to remove or modify user-generated content that violates guidelines or is deemed inappropriate.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        7. Personal Data and Privacy:
        <ul>
          <li>User information is collected and managed according to our Privacy Policy. By using the system, users consent to the collection and use of their data as described in the policy.</li>
          <li>Data will not be shared with third parties without user consent, except where legally required.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        8. System Reliability and Support:
        <ul>
          <li>While we strive to maintain continuous availability of the system, we do not guarantee uninterrupted access. Scheduled maintenance, system upgrades, or unforeseen technical issues may temporarily disrupt service.</li>
          <li>Users experiencing issues may contact customer support for assistance.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        9. Limitation of Liability:
        <ul>
          <li>The platform is not liable for any loss, injury, or inconvenience resulting from the use of the trip planner system or from any trip organized through it.</li>
          <li>We are not responsible for acts of third-party service providers or any direct or indirect damages arising from trip arrangements.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        10. Intellectual Property:
        <ul>
          <li>All content, including text, images, and system features, is the property of the trip planner system and protected by intellectual property laws.</li>
          <li>Users are not permitted to duplicate, distribute, or modify content without prior permission.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        11. Modification of Terms:
        <ul>
          <li>The platform reserves the right to update these terms at any time. Users will be notified of significant changes, and continued use of the system constitutes acceptance of revised terms.</li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        12. Governing Law:
        <ul>
          <li>These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from the use of the system will be settled in the courts of [Your Jurisdiction].</li>
        </ul>
      </Typography>
      <FormControlLabel
            control={<Checkbox name="saveCard" required  checked={checked} onChange={()=>setChecked(!checked)} />}
            label="Accept Terms & Conditions"
          />
    </Container>
    </div>
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

)    
};

export default TAmodal;
