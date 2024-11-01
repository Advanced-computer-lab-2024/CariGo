import React from 'react';
import styled from 'styled-components';

const AircraftDetails = () => {
  const aircraftInfo = [
    { label: 'Tail No.', value: '9V-SHT' },
    { label: 'ICAO Type', value: 'A359' },
    { label: 'Age', value: '--' },
  ];

  const additionalInfo = [
    { label: 'Cruising Speed', value: '9V-SHT' },
    { label: 'Range', value: '9,321 mi' },
    { label: 'First Flight', value: '--' },
  ];

  return (
    <AircraftWrapper>
      <AircraftName>Airbus A350-900</AircraftName>
      <AircraftImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/da31a09c7570e6796d05b8ab889ba2fdd2ff1169b21a7e1078764a72147fbd3e?placeholderIfAbsent=true&apiKey=023722a8f8024e4d98a0d7e5b718070f" alt="Airbus A350-900" />
      <DetailsContainer>
        <InfoGroup>
          {aircraftInfo.map((item, index) => (
            <InfoItem key={index}>
              <InfoLabel>{item.label}</InfoLabel>
              <InfoValue>{item.value}</InfoValue>
            </InfoItem>
          ))}
        </InfoGroup>
        <InfoGroup>
          {additionalInfo.map((item, index) => (
            <InfoItem key={index}>
              <InfoLabel>{item.label}</InfoLabel>
              <InfoValue>{item.value}</InfoValue>
            </InfoItem>
          ))}
        </InfoGroup>
      </DetailsContainer>
    </AircraftWrapper>
  );
};

const AircraftWrapper = styled.article`
  border-radius: 18px;
  display: flex;
  margin-top: 15px;
  width: 100%;
  max-width: 853px;
  flex-direction: column;
  font-weight: 500;
  padding: 25px 2px;
  border: 2px solid #e7e7e7;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AircraftName = styled.h3`
  color: #000;
  font-size: 30px;
  align-self: flex-start;
  margin: 0 0 0 24px;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const AircraftImage = styled.img`
  aspect-ratio: 3.25;
  object-fit: contain;
  object-position: center;
  width: 100%;
  margin-top: 12px;

  @media (max-width: 991px) {
    max-width: 861px;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  min-height: 147px;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  justify-content: space-between;
  margin: 26px 20px 0 19px;

  @media (max-width: 991px) {
    margin: 26px 10px 0;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 35px;
  justify-content: space-between;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const InfoLabel = styled.span`
  color: #9d9eab;
  font-size: 20px;
`;

const InfoValue = styled.span`
  color: #000;
  font-size: 24px;
  margin-top: 13px;
`;

export default AircraftDetails;