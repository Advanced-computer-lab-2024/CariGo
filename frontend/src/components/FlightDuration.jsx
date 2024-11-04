import React from "react";
import styled from "styled-components";
import TimelapseIcon from '@mui/icons-material/Timelapse';

const FlightDuration = ({ duration }) => {
  return (
    <DurationContainer>
      <TimelapseIcon fontSize="medium" sx={{fill:"#126782"}} />
      <DurationText>{duration}</DurationText>
    </DurationContainer>
  );
};

const DurationContainer = styled.div`
  border-radius: 5px;
  background-color: white;
  display: flex;
  gap: 7px;
  flex: 1;
  padding: 5px 4px;
  width: 40px;
  margin-left:-50px;
  margin-top:10px;
`;


const DurationText = styled.span`
  color: #126782;
  font: 500 9px Roboto, sans-serif;
  margin-top:3px;
  font-size:16px;
`;

export default FlightDuration;