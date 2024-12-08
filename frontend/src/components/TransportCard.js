import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Card,Button,Divider,Link} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CallIcon from '@mui/icons-material/Call';
import NumbersIcon from '@mui/icons-material/Numbers';
import axios from "axios";
import BookingPaymentPopUp from "../Pages/Tourist/components/BookingPaymentPopUp";
import { jwtDecode } from "jwt-decode";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key


const TransportCard = ({Transportation}) =>{

  const departure= Transportation.departureTime;
  const departureLocStr=Transportation.departureLocation.description;
  const arrival= Transportation.arrivalTime;
  const arrivalLocStr=Transportation.arrivalLocation.description;
  const [user, setUser] = useState();
  const [token,setToken] = useState(localStorage.getItem('jwt'));
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
          
        console.log("API Response Data:", response.data); // Logs the fetched data
        setUser(Object.assign({}, response.data));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
   
    fetchUser();
    }, []);
  
    const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  
    const formatDuration = (duration) => {
      if (!duration) return ""; // Handle cases where duration might be undefined
  
      // Ignore the first two characters
      const durationString = duration.substring(2);
      
      // Replace 'h' with ' hours' and 'm' with ' minutes'
      return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
    };

    const waitingTime = (time) => {
      let currentTime = new Date();
      
      if(time)
        return {hrs: time.hours - currentTime.getHours() , mins: time.minutes - currentTime.getMinutes()}
    }
    const handleLocationLinkClick = (locationMapLink) => {
      // Open the map link in a new tab or window
      //window.open(locationMapLink, '_blank');
      sessionStorage.setItem('previousPageState', JSON.stringify({
        departureTime: Transportation.departureTime,
        arrivalTime: Transportation.arrivalTime,
        price: Transportation.price,
        // Add any other state data you want to preserve
      }));
      // After the user is done viewing the map, use navigate(-1) to go back to the previous page
        // This acts like history.goBack()
    };
    const handleBook=() =>{
      //navigate(`/checkout/transportation/${Transportation._id}`);
      if (token){
        setIsPaymentPopupOpen(true);
      }
        
      else navigate(`/login`);
    }
    const handlePlaceOrder = async (paymentMethod,TotalPrice,NumberOfTickets) => {
      // setLoading(true);
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
  
        const endpoint = `http://localhost:4000/cariGo/Transportation/BookTransportation/${Transportation._id}`;
  
        // const payload = 
        console.log(paymentMethod,TotalPrice,NumberOfTickets)
        const response = await axios.post(endpoint, {
          PaymentMethod:paymentMethod,
          TotalPrice:TotalPrice,
          NumberOfTickets:NumberOfTickets
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data) {
          navigate("tourist/MyBookedTransportation");
        }
      } catch (error) {
        console.error("Error during booking:", error);
        // setError(error.response?.data?.error || 'Booking failed');
      }
    };
const rate = localStorage.getItem("conversionRate")|| 1;
  return (
    <Card variant="outlined"  sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      minHeight:'320px',
      maxHeight:'800px',
      flexShrink: '0',
      display: 'flex', 
      flexDirection:'column', 
      width: '450px',
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      }}>
        <Box sx={{margin:'5%', padding:'5px', marginTop:'2%',marginBottom:'5px',}}>{/*EVERYTHING BOX*/}

        <Box sx={{width:'90%',margin:'10px', display:'flex', position:'relative'}}>
        {Transportation.carType === "car" ?
        <DirectionsCarIcon fontSize="large" sx={{fill:'#ff4d4d'}}/> :
          <DirectionsBusIcon fontSize="large" sx={{fill:'#ff4d4d'}}/>
        }
         {/* AC availability (conditional) */}
         {Transportation.ac && (
            <Box sx={{ display: 'flex', gap: '5px', paddingTop: '10px', paddingLeft:'5px' }}>
              <AcUnitIcon sx={{ fill: '#126782', fontSize: 'large' }} />
              <Typography sx={{ color: '#126782', fontSize:'14px', }}>AC</Typography>
            </Box>
          )}
    
        <StarIcon fontSize="large" sx={{fill:'#126782',marginLeft:'50%', marginRight:'5px'}}/>
        <Typography sx={{fontSize: '20px',marginTop:'3px', color:'#126782'}}>
          {Transportation.ratingsAverage}</Typography>
      </Box>

      <Divider sx={{borderBottomWidth: 3}} />

      {/*INFO BOX*/}
      <Box sx={{margin: "15px",marginLeft:'10px',display:'flex', flexDirection:'column', gap:'10px', position:'relative'}}>

      <Box sx={{display:'flex',gap:'10px'}}> {/*departure and arrival BOX*/}
      {/*departure*/}
      <Box sx={{ width:'45%', overflowY:'auto', overflowX:'none'}}>
      <Typography sx={{color:'#126782',padding:'1px', fontWeight:'bold'}}>
        {departureLocStr ? departureLocStr : 'departure location'}
        {/* departure location */}
      </Typography>
      <Typography sx={{color:'#ff4d4d',padding:'1px',}}>
        { `${departure.hours}:${departure.minutes} ${departure.dayTime}` }
      </Typography>
      {/*location link*/}
      <Box sx={{ display: 'flex', padding: '5px', marginLeft: '-10px' }}>
      <PinDropIcon fontSize="small" sx={{ fill: "#126782" }} />
      <Link
        href={Transportation.departureLocationMapLink}  // Corrected this line
        sx={{
          color: '#126782',
          fontSize:'11px',
          padding: '1px',
          marginTop:'3px',
          cursor: 'pointer',
          textDecoration: 'underlined',
          textDecorationColor: '#126782',
        }}
        target="_blank"
      >
        click to view exact location
      </Link>
      </Box>
     </Box>

     {/*arrival*/}
     {arrival && (
      <Box sx={{position:'absolute', left:'55%',width:'45%', overflowY:'auto', overflowX:'none'}}>
        <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold',}}>
          {arrivalLocStr ? arrivalLocStr : 'Arrival location'}
        </Typography>
        <Typography sx={{ color: '#ff4d4d', padding: '1px' }}>
          {`${arrival.hours}:${arrival.minutes || '00'} ${arrival.dayTime}`}
        </Typography>
        {/*location link*/}
        <Box sx={{ display: 'flex', padding: '5px', marginLeft: '-10px' }}> 
        <PinDropIcon fontSize="small" sx={{fill:"#126782"}}/>
        <Link  href={Transportation.arrivalLocationMapLink}  
         sx={{
          color: '#126782',
          fontSize:'11px',
          padding: '1px',
          marginTop:'3px',
          cursor: 'pointer',
          textDecoration: 'underlined',
          textDecorationColor: '#126782',
          }}
          target="_blank"
        >
          click to view exact location
          </Link> 
      </Box>
      </Box>
    )}
     </Box>
     {/*END OF departure and arrival BOX*/}

    <Box sx={{ display: 'flex', padding: '5px',position:'relative', marginTop:'30px' }}>
     {/*plate number*/}
     <Box sx={{ display:'flex',padding: '1px',}}>
        <NumbersIcon sx={{fill: '#126782', fontSize: '22px'}}/>
        <Typography sx={{ color: '#126782',fontSize:'18px', fontWeight:'bold', padding: '1px' ,marginTop:'-3px'}}>
          {Transportation.plateNumber || 'N/A'}
        </Typography>
      </Box>

      {/*driver number*/}
      <Box sx={{ display:'flex',padding: '1px',position:"absolute", left:'40%',}}>
        {/* <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
          Driver Number
        </Typography> */}
        <CallIcon sx={{fill: '#126782', fontSize: '22px'}} />
        <Typography sx={{ color: '#ff4d4d',  marginLeft:'5px',}}>
          {Transportation.driverNumber || 'N/A'}
        </Typography>
      </Box>
    </Box>

     {/*for price and booking button*/}
     <Box sx={{ position:'relative', padding: '10px', paddingBottom:'0px',marginTop:'10px' }}>
      <Box sx={{ display: 'flex', marginLeft: '-10px', marginBottom: '0px', bottom: '0px' }}>
        <AttachMoneyIcon sx={{ marginTop: '0px', color: '#126782' }} />
        <Typography sx={{ color: '#ff4d4d', fontSize: '20px', marginLeft: '0px',marginTop:'-3px' }}>
          {(Transportation.price * rate ).toFixed(2)} 
        </Typography>

        {/* Discount Section (commented out, but ready for use) */}
      </Box>
    
      <Button onClick={handleBook}
      sx={{color:'white',  backgroundColor:'#ff4d4d', borderRadius:'5px',fontSize:'17px',
        position:'absolute' ,right:'-10px', bottom:'-5px',width:'70px',height:'40px'}} 
      >Book
        </Button>
        <Elements stripe={stripePromise}>
           {isPaymentPopupOpen && (
            <BookingPaymentPopUp
              open={isPaymentPopupOpen}
              onClose={() => setIsPaymentPopupOpen(false)}
              checkoutCart={handlePlaceOrder}
              amount={(Transportation.price * rate).toFixed(2)}
              user={user}
              itineraryName={`${Transportation.carType} number ${Transportation.plateNumber}`} 
              startDate={Transportation.date}
              endDate={Transportation.date}
              departureTime={`${Transportation.departureTime.hours}:${Transportation.departureTime.minutes}:${Transportation.departureTime.dayTime}`}
              arrivalTime={`${Transportation.arrivalTime.hours}:${Transportation.arrivalTime.minutes}:${Transportation.arrivalTime.dayTime}`}
              type={true}
            />
          )}
        </Elements>
      </Box>

      </Box>
      </Box>{/* END OF EVERYTHING BOX */}
    </Card>
  );
};

export default TransportCard;
