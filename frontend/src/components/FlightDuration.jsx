import React from "react";
import styled from "styled-components";

const FlightDuration = ({ duration }) => {
  return (
    <DurationContainer>
      <DurationIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ff62850f398acb9e199c2ad2e44843068a12f7fec44de0d84208218a7124d0e?placeholderIfAbsent=true&apiKey=023722a8f8024e4d98a0d7e5b718070f" alt="Clock icon" />
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

const DurationIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 22px;
  margin-right:2px;
  margin-top:2px;
  color:#126782;
`;

const DurationText = styled.span`
   color: #2f2f2f;
  font: 500 9px Roboto, sans-serif;
  margin-top:5px;
  font-size:20px;
`;

export default FlightDuration;