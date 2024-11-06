import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import LuggageIcon from '@mui/icons-material/Luggage';


const FlightInfo = ({ time, code, city }) => {
  return (
    <InfoContainer>
      <City >{city}</City>
      <Time>{time}</Time>
      {/* <Code>{code}</Code> */}
      
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
  font-weight: bold;
  color: #126782;
  width: 200px;
  flex: 1;
  font: 500 15px Roboto, sans-serif;
`;

const Time = styled.span`
 display: flex;
  flex-direction: row;
  color: #929292;
  margin-top:10px;
`;

// const Code = styled.span`

//   color: #000;
//   font-size: 18px;
//   font-weight: 600;
//   margin-top: 12px;
// `;

const City = styled.span`

  white-space: nowrap;
  margin-top: 10px;
`;

export default FlightInfo;