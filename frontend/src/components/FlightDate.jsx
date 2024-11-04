import React from "react";
import styled from "styled-components";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const FlightDate = ({ date }) => {
  return (
    <DateContainer>
      <CalendarMonthIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <DateText>{date}</DateText>
    </DateContainer>
  );
};

const DateContainer = styled.div`
  border-radius: 5px;
  background-color: white;
  display: flex;
  gap: 6px;
  flex: 1;
  padding: 5px 4px;
  maxwidth: 50px;
  margin-left:20px;
  margin-top:10px;
`;


const DateText = styled.span`
  color: #126782;
  font: 500 9px Roboto, sans-serif;
  margin-top:5px;
  font-size:16px;
  //font-weight:bold;
`;

export default FlightDate;