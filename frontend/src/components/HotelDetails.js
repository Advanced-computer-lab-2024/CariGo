import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Button, Divider, Link, IconButton} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useLocation } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import PinDropIcon from '@mui/icons-material/PinDrop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import axios from "axios";
import ExtraServicesPaymenPopUp from "../Pages/Tourist/components/ExtraServicesPaymenPopUp";
import { jwtDecode } from "jwt-decode";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key

const HotelDetails = () =>{
    const { state } = useLocation();
    const hotel = state.hotel;
    const offer = state.offer;

    const [isDescriptionVisible, setDescriptionVisible] = useState(false);
    const [user, setUser] = useState();
    const [token,setToken] = useState(localStorage.getItem('jwt'));
    const handleToggleDescription = () => {
      setDescriptionVisible(!isDescriptionVisible);
    };

    // Function to format the duration string
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("jwt");
          const id = jwtDecode(token).id;
    
          const response = await axios.get(
            `http://localhost:4000/cariGo/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
            
         
          setUser(Object.assign({}, response.data));
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      };
     
      fetchUser();
      }, []);

    function calculateStayDuration(checkInDate, checkOutDate) {
        // Convert the input dates to Date objects
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        // Calculate the difference in time (in milliseconds)
        const timeDifference = checkOut - checkIn;
        // Calculate the number of days
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return days;
      }

      const stayDuration = calculateStayDuration(offer.checkInDate,offer.checkOutDate);

      function formatRoomType(roomStr) {
        return roomStr
          .toLowerCase()                  // Convert to lowercase
          .replace(/_/g, ' ')             // Replace underscores with spaces
          .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize first letter of each word
      }

      function formatDescription(description) {
        return description
          .toLowerCase()                       // Convert the entire string to lowercase
          .replace(/\//g, ', ')                // Replace slashes with commas and spaces
          .replace(/-/g, ' ')                  // Replace hyphens with spaces
          .replace(/^./, char => char.toUpperCase());  // Capitalize only the first letter of the string
        }

        const handleBackCLick=() =>{
        navigate(`/book-services`);
        window.scrollTo(0, 0);
        }
        const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
        const handleBookClick=() =>{
         //navigate(`/ExtraServicesCheckOut/hotel`,{ state: { hotel,offer } }) ;
          if (token){
            setIsPaymentPopupOpen(true);
          }
            
          else navigate(`/login`);
        };
        const handlePlaceOrder = async (paymentMethod,TotalPrice) => {
          // setLoading(true);
          try {
            const token = localStorage.getItem("jwt");
            if (!token) {
              throw new Error("No token found. Please log in.");
            }
            
      
            const endpoint = `http://localhost:4000/cariGo/flights//BookHotel`;
      
            // const payload = 
            const response = await axios.post(endpoint, {
              PaymentMethod:paymentMethod,
              TotalPrice:TotalPrice,
              hotelData : {
                hotelName: hotel.hotel.name,  // Replace with actual property you need
                offer: offer  // Assuming offer is a variable in your scope
              }
            }, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
      
            if (response.data) {
              navigate("/tourist/MyBookedHotels");
            }
          } catch (error) {
            console.error("Error during booking:", error);
            // setError(error.response?.data?.error || 'Booking failed');
          }
        };
  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:'0px', margin:'20px', marginLeft:'10%',alignItems:'center'}}>
      <Button onClick={handleBackCLick}
          sx={{ backgroundColor: "#126782", color: 'white', borderRadius: '8px', width: '80px', fontSize:'18px', marginLeft:'20px' }}>
          Back
      </Button>
    <Box   sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      maxHeight:'1000px',
      width:'700px', 
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      color:'#126782',
      }}>

      <Box sx={{margin:'30px', position:'relative'}}>  {/*gives some spacing from borders */}
        <Box sx={{display:'flex', gap:'0px'}}>{/*hotel name box */}
        <LocationCityIcon fill="#126782" fontSize="large"/>
        <Typography sx={{padding:'5px',paddingTop:'3px', fontSize:'24px', fontWeight:'bold'}}>
          {hotel.hotel.name}
        </Typography>
        </Box>

      <Divider sx={{ borderBottomWidth: 3 }}/>
      {/* info box */}
      <Box sx={{ margin:'10px',marginLeft:'20px',position:'relative', display:'flex', flexDirection:'column', gap:'5px'}}>
        {/*duration */}
        <Typography sx={{ color: '#126782', marginLeft:'2px', fontWeight: 'bold' }}>
                {stayDuration} days
        </Typography>
        {/*check in + checkout*/}
        <Box sx={{ display: 'flex', flexDirection:'column', gap: '2px', }}>
            <Typography >check in</Typography>
            <Box sx={{ display: 'flex', gap: '5px',color:"#ff4d4d",marginLeft:'10px'}}>
                <CalendarMonthIcon fontSize="medium" />
                <Typography type="date"  sx={{marginTop:'1px'}}>
                {offer.checkInDate}
                </Typography>
            </Box>
            <Typography sx={{marginTop:'5px'}}>check out</Typography>
            <Box sx={{ display: 'flex', gap: '5px',color:"#ff4d4d",marginLeft:'10px'}}>
                <CalendarMonthIcon fontSize="medium" />
                <Typography type="date" sx={{marginTop:'1px'}}>
                {offer.checkOutDate}
                </Typography>
            </Box>
        </Box>
        {/*number of adults*/}
        <Box sx={{ display: 'flex', gap: '20px',marginLeft:'-10px', padding: '5px' }}>
            <Box sx={{ display: 'flex', gap: '5px',}}>
                <PersonIcon fontSize="medium" />
                <Typography type="date" sx={{marginTop:'1px'}}>
                {offer.guests.adults} adult{offer.guests.adults > 1 ? 's' : ''}
                </Typography>
            </Box>
        </Box>
        {/*number of beds*/}
        <Box sx={{ display: 'flex', gap: '5px', padding: '5px', marginLeft: '-10px' }}>
            <BedIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Typography >
              {offer.room.typeEstimated.beds} {offer.room.typeEstimated.bedType} bed{offer.room.beds > 1 ? 's' : ''}
            </Typography>
        </Box>
        {/*room type*/}
        <Typography sx={{ fontWeight:'bold' }}>
            {offer.room.typeEstimated.category && formatRoomType(offer.room.typeEstimated.category)}
            <IconButton onClick={handleToggleDescription} 
            sx={{  
                fontSize:'small', 
                padding: '0', 
                '&:hover': {                 // Remove hover background color
                backgroundColor:'white'
                }
            }}>
                {isDescriptionVisible ? <ExpandLess/> : <ExpandMore />}
            </IconButton>
        </Typography>
        {/* Room Description (conditionally rendered) */}
        {isDescriptionVisible && (
            <Typography sx={{ fontSize: '14px', marginLeft: '10px', width: '80%' }}>
            {formatDescription(offer.room.description.text)}
            </Typography>
        )}
        {/*location link*/}
        <Box sx={{ display: 'flex', gap: '0px', color:'#ff4d4d',fontSize:'14px',padding:'5px', marginLeft:'-10px' }}>
            <PinDropIcon fontSize="small"  />
            <Link
               href={hotel.googleMapsLink}
              sx={{
                cursor: 'pointer',
                color:'#ff4d4d',
                marginTop:'1px',
                textDecoration: 'underline',
                textDecorationColor:'#ff4d4d'
              }}>
              click to view location
            </Link>
        </Box>
        {/*cancelation deadline*/}
        <Box sx={{ display: 'flex', gap: '5px', padding: '5px', marginLeft: '-10px' }}>
            <Typography>can cancel before</Typography>
            {Array.isArray(offer.policies?.cancellations) && offer.policies.cancellations[0] ?(
              <Typography color="#ff4d4d">
              {new Date(offer.policies.cancellations[0].deadline).toLocaleDateString()}
            </Typography>):
            (<Typography sx={{color:'#ff4d4d'}}>no date specified</Typography>)}
        </Box>
        
        <Box sx={{display:'flex', width:'100%',justifyContent: 'space-between',margin:'10px',marginBottom:'0px',marginLeft:'-10px', marginTop:'25px'}}>{/*price and book box*/}
        <Box sx={{display:'flex', flexDirection:'column', gap:'0px'}}>
        <Box sx={{display:'flex', padding:'0px'}}>
          <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782', fontSize:'30px'}}/>
          <Price>{offer.price.total} {offer.price.currency}</Price>
        </Box>
        {/*price per day box*/}
        <Box sx={{display:'flex',color: '#ff4d4d' ,marginLeft:'30px', marginTop:'-5px'}}>
          {/* <AttachMoneyIcon sx={{marginTop:'2px',  fontSize:'20px'}}/> */}
            <Typography sx={{}}>{offer.price.total/stayDuration} </Typography>
            <Typography component="span" sx={{fontSize:'14px', marginTop:'3px', mx: '4px'}}>  {/*mx: '4px' adds effect of spaces */}
                {" "+ offer.price.currency + " "}
            </Typography>
            <Typography sx={{color:'#126782',}}> per day </Typography> 
         </Box>
         </Box>
        <Button onClick={handleBookClick}
            sx={{
              color: 'white',
              backgroundColor: '#ff4d4d',
              borderRadius: '5px',
              //alignSelf: 'flex-end', // Aligns it to the right within the container
              width:'90px',
              height:'40px',
              fontSize:'20px',
              marginTop:'5px',
            }}>
            Book
          </Button>
          <Elements stripe={stripePromise}>
            {isPaymentPopupOpen && (
              <ExtraServicesPaymenPopUp
                open={isPaymentPopupOpen}
                onClose={() => setIsPaymentPopupOpen(false)}
                checkoutCart={handlePlaceOrder}
                amount={(offer.price.total)}
                user={user}
                ServiceName={hotel.hotel.name} 
                startDate={offer.checkInDate}
                endDate={offer.checkOutDate}
                type={"hotel"}
                currency={offer.price.currency}
              />
            )}
          </Elements>
          </Box>
      </Box>
      
    </Box>
    </Box>
    <h4 className="bg-gradient-to-r from-[#01324c] via-[#01324c] to-[#01324c] bg-clip-text text-2xl font-semibold text-transparent md:text-5xl" overflowX="auto">
          ___________________________ 🦌 ___________________________
        </h4>
    </Box>
  );
};


const Price = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #126782;
  margin-top:0px;
  margin-bottom: 10px;
  
`;



export default HotelDetails;
