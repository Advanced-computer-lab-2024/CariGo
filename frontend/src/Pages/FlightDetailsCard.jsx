import React from 'react';
import styled from 'styled-components';
import FlightInformation from '../components/FlightInformation';
import AircraftDetails from '../components/AircraftDetails';
import Timeline from '../components/Timeline';
import { useLocation } from 'react-router-dom';

const FlightDetailsCard = () => {
  const { state } = useLocation();
  const flightData = state.flight;
  const exampleAircraftInfo = {
    name: 'Airbus A350-900',
    imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/da31a09c7570e6796d05b8ab889ba2fdd2ff1169b21a7e1078764a72147fbd3e?placeholderIfAbsent=true&apiKey=023722a8f8024e4d98a0d7e5b718070f',
    details: [
      { label: 'Tail No.', value: '9V-SHT' },
      { label: 'ICAO Type', value: 'A359' },
      { label: 'Age', value: '5 years' }, // Replace with actual age
      { label: 'Cruising Speed', value: '560 mph' },
      { label: 'Range', value: '9,321 mi' },
      { label: 'First Flight', value: '2015' },
    ],
  };

  return (
    <CardWrapper>
      <CardContent>
        <FlightInformation flightData={flightData} />
        <Divider />
        <AircraftDetails aircraftInfo={exampleAircraftInfo} />
        <Timeline flightData={flightData} />
      </CardContent>
    </CardWrapper>
  );
};

// Styles remain the same as before


const CardWrapper = styled.section`
  border-radius: 30px;
  border: 2.395px solid var(--Border-normal, #e9e9e9);
  box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  display: flex;
  max-width: 1145px;
  flex-direction: column;
  overflow: hidden;
  font-family: Roboto, sans-serif;
  padding: 44px 0 135px;

  @media (max-width: 991px) {
    padding-bottom: 100px;
  }
`;

const CardContent = styled.div`
  border-radius: 36px 36px 0 0;
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  margin-right: 67px;
  padding: 18px 0 8px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Divider = styled.hr`
  background-color: #e9e9e9;
  align-self: stretch;
  height: 2px;
  margin: 21px 0 0;
  border: none;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default FlightDetailsCard;