import React, { useEffect, useState } from "react";
import HotelCard from "../../components/HotelCard";

export default function BookHotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch("http://localhost:4000/cariGo/flights/hotels?keyword=cairo&checkIn=2024-11-09&checkOut=2024-11-30&adults=1");
                const data = await response.json();
                console.log(data); // Inspect the data structure
                setHotels(data.data || []); // Ensure it's always an array
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();
    }, [])

    return (
        <div>
            {hotels.map((hotel) => 
                hotel.offers.map((offer) => (
                    <HotelCard  hotel={hotel} offer={offer} />
                ))
            )}
        </div>
    );
}
