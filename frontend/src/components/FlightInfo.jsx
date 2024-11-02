import React from "react";
import styled from "styled-components";

const FlightInfo = ({ time, code, city }) => {
  return (
    <InfoContainer>
      <Time>{time}</Time>
      <Code>{code}</Code>
      <City>{city}</City>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #929292;
  flex: 1;
  font: 500 11px Roboto, sans-serif;
`;

const Time = styled.span`
  color: #929292;
`;

const Code = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  margin-top: 12px;
`;

const City = styled.span`
  margin-top: 10px;
`;

export default FlightInfo;