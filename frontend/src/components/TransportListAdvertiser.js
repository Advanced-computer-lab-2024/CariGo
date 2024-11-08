import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography ,circularProgress} from "@mui/material";
import TransportCard from "./TransportCard";

const TransportListAdvertiser = ({transports}) => {
  const navigate = useNavigate();

  // Function to handle the selecting transports
  const fetchTransports = async () => {
    const [transports, setTransports] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('jwt'); // Get the token from local storage
    const userId = localStorage.getItem("id"); // Get user ID if needed
    console.log(userId);
    console.log(token);

    
    console.log(`http://localhost:4000/cariGo/transportation/getadvTrans`);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/cariGo/transportation/getadvTrans`, {
        method: 'GET',  // Use GET request as per the new request format
        headers: {
            "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTransports(data);
      console.log(queryParams.toString());
      //console.log(transports);
      console.log('Search result:', data);
      // Handle the data, such as displaying it to the user
    } catch (error) {
        console.error('Error fetching transportation data:', error);
    }
    finally {
      console.log('fetched transports',transports);    
      setIsLoading(false);
    }
  };


  if (!Array.isArray(transports)  ) {
    console.log(transports);
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No transportations available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        gap: '10px',
        margin: '30px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden', 
        maxHeight:'950px',
        '&::-webkit-scrollbar': {
          width: '8px', // Width of the scrollbar
        
          },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#126782', // Color of the scrollbar thumb
          borderRadius: '10px', // Rounded corners for the scrollbar thumb
          },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1', // Color of the scrollbar track
          borderRadius: '10px', // Rounded corners for the scrollbar track
        },
      }}
    > 
        <Box sx={{padding:"20px", marginLeft:"10%" , overflow:'auto',marginTop:'4%',}}>
            {/* loading before ist shows up */}
            {isLoading ? <CircularProgress sx={{color:'#126782', margin:'70px'}} /> :
            transports.map((transport) =>         
                <TransportCard  Transportation={transport} />        
            )
            }
        </Box>
    </Box>
  );
};

export default TransportCardList;
