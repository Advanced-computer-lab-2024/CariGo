import React from "react";
import styled from "styled-components";

const FlightDate = ({ date }) => {
  return (
    <DateContainer>
      <DateIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/843e33b1654d1b99a55c87064678086fdb72b13e6b6d32bccfca7792ce7a7ba5?placeholderIfAbsent=true&apiKey=023722a8f8024e4d98a0d7e5b718070f" alt="Calendar icon" />
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
  width: 30px;
  margin-left:20px;
  margin-top:10px;
`;

const DateIcon = styled.img`
  aspect-ratio: 0.92;
  object-fit: contain;
  object-position: center;
  width: 20px;
  color:#126782;
`;

const DateText = styled.span`
  color: #2f2f2f;
  font: 500 9px Roboto, sans-serif;
  margin-top:5px;
  font-size:20px;
`;

export default FlightDate;