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
  gap: 6px;
  flex: 1;
  padding: 5px 4px;
  width: 40px;
  margin-left:20px;
  margin-top:10px;
`;


const DurationText = styled.span`
  border-radius: 5px;
  background-color: white;
  display: flex;
  gap: 6px;
  flex: 1;
  padding: 5px 4px;
  width: 30px;
  margin-left:20px;
  margin-top:10px;
  color: #126782;
`;

export default FlightDuration;