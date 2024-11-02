import React from "react";
import styled from "styled-components";
import FlightInfo from "./FlightInfo";
import FlightDate from "./FlightDate"; // You might need to adapt this if it doesn't match the data format.
import FlightDuration from "./FlightDuration";
import { useNavigate } from 'react-router-dom';

const FlightCard = ({ flight, onClick }) =>{
  const { airline, segments,price } = flight;
    // Function to format the duration string
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/flight-details/${flight.id}`, { state: { flight } });
    };
    const formatDuration = (duration) => {
      if (!duration) return ""; // Handle cases where duration might be undefined
  
      // Ignore the first two characters
      const durationString = duration.substring(2);
      
      // Replace 'h' with ' hours' and 'm' with ' minutes'
      return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
    };

  return (
    <Card  onClick={onClick}>
      <CardHeader>
        <FlightDate date={new Date(segments[0].departure.time).toLocaleDateString()} />
        <FlightDuration duration={formatDuration(segments[0].duration)}/>
      </CardHeader>
      <Divider />
      <FlightDetails>
        {segments.map((segment, index) => (
          <FlightInfo
            key={index}
            time={new Date(segment.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            code={segment.flightNumber}
            city={`${segment.departure.airport} to ${segment.arrival.airport}`} // Displaying the route
          />
        ))}
        <FlightIcon>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ab6ee62f061a9bd39efdb1b0483c9a02f9040bfd2a0f09dfc8aaf9e71997c4a?placeholderIfAbsent=true&apiKey=023722a8f8024e4d98a0d7e5b718070f" alt="Flight icon" />
        </FlightIcon>
      </FlightDetails>
      <Price>{`Price: ${price.total}   ${price.currency}`}</Price> {/* Display price */}
      <BookButton>Book</BookButton> {/* Add Book button */}
    </Card>
  );
};

const Card = styled.article`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  align-self: center;
  display: flex;
  margin-top: 27px;
  width: 100%;
  max-width: 338px;
  flex-direction: column;
  align-items: center;
  padding: 21px 9px 12px;
`;

const CardHeader = styled.header`
  display: flex;
  width: 100%;
  max-width: 298px;
  gap: 40px 100px;
  color: #2f2f2f;
  font: 500 9px Roboto, sans-serif;
`;

const Divider = styled.hr`
  align-self: stretch;
  margin: 21px 0 17px;
  border: none;
  border-top: 1px dashed #dcdcdc;
`;

const FlightDetails = styled.section`
  display: flex;
  width: 100%;
  max-width: 299px;
  gap: 40px 77px;
`;
const Price = styled.p`
  font-size: 16px;
  color: #2f2f2f;
  margin: 10px 0; /* Margin for spacing */
`;
const BookButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff; /* Button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const FlightIcon = styled.div`
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin: auto 0;
  padding: 0 8px;

  img {
    aspect-ratio: 1.15;
    object-fit: contain;
    object-position: center;
    width: 15px;
  }
`;

export default FlightCard;
