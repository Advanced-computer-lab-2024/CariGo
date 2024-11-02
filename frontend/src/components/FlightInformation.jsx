import React from 'react';
import styled from 'styled-components';

const FlightInformation = ({ flightData }) => {
  const { airline, segments } = flightData;
  const { flightNumber, departure, arrival } = segments[0];

  return (
    <FlightInfoWrapper>
      <FlightInfoContent>
        <FlightDate>{new Date(departure.time).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {airline} {flightNumber}</FlightDate>
        <FlightRoute>{departure.airport} to {arrival.airport}</FlightRoute>
      </FlightInfoContent>
    </FlightInfoWrapper>
  );
};

// Styles remain the same as before


const FlightInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 443px;
  align-items: flex-start;
  gap: 40px 100px;
  font-weight: 500;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FlightInfoContent = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
`;

const FlightDate = styled.p`
  color: #9d9eab;
  font-size: 20px;
  margin: 0;
`;

const FlightRoute = styled.h2`
  color: #000;
  font-size: 24px;
  margin: 12px 0 0;
`;

export default FlightInformation;