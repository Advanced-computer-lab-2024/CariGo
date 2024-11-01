import React, { useEffect } from "react";
import NavBar from '../components/NavBarTourist';
import FlightSearch from '../components/SearchFlight';
import FlightInfoCard from '../components/FlightCard'
export default function FlightBooking() {
    useEffect(() => {
        localStorage.removeItem('role');
        console.log(localStorage.getItem('jwt') + "         d");
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <>
            <NavBar />
   <FlightSearch/>
  
        </>
    );
}
