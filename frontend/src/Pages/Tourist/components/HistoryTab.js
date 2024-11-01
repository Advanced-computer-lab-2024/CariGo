import React from 'react';
import { Box,Typography,} from '@mui/material';

import EastIcon from '@mui/icons-material/East';

export default function HistoryTab({text,mainColor,scndColor}){
    return( 
        
        <Box sx={{
            backgroundColor : mainColor,
            width: "150px",
            height: "60px",
            borderRadius: "10px",
            padding: "10px",
            position: "relative",
            cursor: "pointer",
            "&:hover .innerBox": {
              opacity: 1,
              transform: "translateY(-45%)",
            },
            "&:hover .innerText": {
                transform: "translateY(-10px)",
              },
            display: 'flex',
            alignItems: "center",
            overflow: "hidden",
        }}>
            <Typography className='innerText' 
            sx={{color :'white', fontSize:'30px', textAlign:'center',
                transform: "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
            > {text}</Typography>

            <Box className="innerBox"
             sx={{
            backgroundColor : scndColor,
            width: "100%",
            height: "60px",
            borderRadius: "0px",
            position: "absolute",
            marginLeft:'-10px',
            marginBottom:'-130px',
            opacity: 0,
            transform: "translateY(0)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
            <EastIcon sx={{fill: 'white' , scale :'1.5', marginLeft:'120px',marginTop:'0px'}}/>
            </Box>
        </Box>
        
    );
}