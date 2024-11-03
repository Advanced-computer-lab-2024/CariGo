const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'momcIYlJsGggAZfsLmPF4vnrr8P3dVRa',
  clientSecret: 'M6DDYSiCXacAm7i9'
});
// Route to get IATA code by city name
const getCityByCode = async (req, res) => {
    try {
      // Extract the airline code from the query parameters
      const airlineCode = req.query.airlineCodes; // Ensure this matches your actual query parameter name
  
      // Make the request to the Amadeus API
      const response = await amadeus.referenceData.airlines.get({
        airlineCodes: [airlineCode] // Pass the airline code as an array
      });
  
      // Return the IATA code of the first result, if available
      const city = response.data;
      
      if (iataCode) {
        return res.json({ city }); // Send the IATA code in the response
      } else {
        return res.status(404).json({ message: 'IATA code not found' });
      }
    } catch (error) {
      console.error('Error fetching IATA code:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  getFlights = async (req, res) => {
    try {
      const { origin, destination, departureDate, adults,children ,nonStop ,travelClass} = req.query;
  
      const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        adults: adults,
        children:children,
        nonStop:nonStop,
        travelClass:travelClass
      });
  
      // Collect all unique airline codes
      const airlineCodesSet = new Set();
      response.data.forEach(offer => {
        if (offer.validatingAirlineCodes[0]) {
          airlineCodesSet.add(offer.validatingAirlineCodes[0]);
        }
      });
  
      const airlineCodesArray = Array.from(airlineCodesSet);
      let airlineNamesMap = {};
      
      // Fetch airline names for all unique airline codes
      if (airlineCodesArray.length > 0) {
        try {
          const airlineResponse = await amadeus.referenceData.airlines.get({
            airlineCodes: airlineCodesArray.join(',')
          });
          
          airlineNamesMap = airlineResponse.data.reduce((map, airline) => {
            map[airline.iataCode] = airline.businessName;
            return map;
          }, {});
        } catch (error) {
          console.error(`Error fetching airline details: ${error.message}`);
        }
      }
  
      // Map the response to include only the relevant information
      const flights = await Promise.all(response.data.map(offer => {
        const airlineCode = offer.validatingAirlineCodes[0] || 'Unknown Airline';
        const airlineName = airlineNamesMap[airlineCode] || 'Unknown Airline';
  
        return {
          id: offer.id,
          airline: airlineCode,
          airlineName: airlineName,
          oneway :offer.oneWay,
          segments: offer.itineraries.flatMap(itinerary => {
            return itinerary.segments.map(segment => ({
              flightNumber: segment.number,
              departure: {
                airport: segment.departure.iataCode,
                terminal :segment.departure.terminal,
                time: segment.departure.at
              },
              arrival: {
                airport: segment.arrival.iataCode,
                terminal :segment.departure.terminal,
                time: segment.arrival.at
              },
              duration: segment.duration,
              numberOfStops: segment.numberOfStops,
              fareDetails: offer.travelerPricings[0].fareDetailsBySegment.find(fd => fd.segmentId === segment.id) || {}
            }));
          }),
          price: {
            total: offer.price.total,
            currency: offer.price.currency
          },
          fareType: offer.pricingOptions.fareType[0], // Type of fare
          includedCheckedBagsOnly: offer.pricingOptions.includedCheckedBagsOnly, // Checked bags included
          lastTicketingDate: offer.lastTicketingDate,
          numberOfBookableSeats: offer.numberOfBookableSeats,
          travelerType: offer.travelerPricings[0].travelerType // Type of traveler (e.g., ADULT)
        };
      }));
  
      res.json(flights);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };
  
  






const cities = async (req, res) => {
  const { keyword } = req.query; // e.g., city name or part of it

  try {
      const response = await amadeus.referenceData.locations.get({
        keyword : keyword,
        subType : Amadeus.location.any
      });

      // Map response to include only city name and IATA code
      const cities = response.data.map(location => ({
          city: location.name,
          iataCode: location.iataCode
      }));

      res.json(cities);
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
}
// const getHotels = async (req, res) => {
//   try {
//     const { keyword } = req.query; // Extract keyword from query parameters

//     // Validate required parameters
//     if (!keyword) {
//       return res.status(400).json({ error: 'Keyword is required.' });
//     }

//     // Retrieve hotel data using the Amadeus API
//     const response = await amadeus.referenceData.locations.hotel.get({
//       keyword: keyword,
//       subType: 'HOTEL_GDS',
//     });

//     console.log(response);

//     // Map the response to a more usable format
//     const hotels = response.data.map(hotel => ({
//       name: hotel.name,
//       category: hotel.category,
//       address: hotel.address,
//       hotelIds: hotel.hotelIds,
//       location: hotel.geoCode, // Includes latitude and longitude
//       googleMapsLink: `https://www.google.com/maps/search/?api=1&query=${hotel.geoCode.latitude},${hotel.geoCode.longitude}`,
//     }));

//     // Return the list of hotels
//     res.json(hotels);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const getHotels = async (req, res) => {
  try {
    const { keyword, adults, checkIn, checkOut ,noOfrooms} = req.query;

    // Validate required parameters
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required.' });
    }

    // Retrieve hotel data using the Amadeus API
    const response = await amadeus.referenceData.locations.hotel.get({
      keyword: keyword,
      subType: 'HOTEL_GDS',
    });
    console.log(response.data)
    // Extract hotel IDs from the response
    const hotelIds = response.data.flatMap(hotel => hotel.hotelIds);
    console.log(hotelIds.join(','));
    // If no hotel IDs are found
    if (hotelIds.length === 0) {
      return res.status(404).json({ error: 'No hotels found for the given keyword.' });
    }

    // Fetch hotel details for the extracted IDs
    const hotelDetailsResponse = await getHotelDetails(
      hotelIds.join(','), // Join IDs for the API call
      adults,
      checkIn,
      checkOut,noOfrooms
    );

    // Return the hotel details
    res.json(hotelDetailsResponse);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




// const getHotelDetails = async (req, res) => {
//   try {
//     const { hotelIds, adults, checkIn, checkOut } = req.query;

//     // Validate required query parameters
//     if (!hotelIds || !adults || !checkIn || !checkOut) {
//       return res.status(400).json({ error: 'hotelIds, adults, checkIn, and checkOut are required' });
//     }

//     // Fetch hotel offers from the Amadeus API
//     const response = await amadeus.shopping.hotelOffersSearch.get({
//       hotelIds: hotelIds,
//       adults: adults,
//     });

//     // Filter the offers based on the check-in and check-out dates
//     const filteredHotels = response.data.map(hotel => {
//       const filteredOffers = hotel.offers.filter(offer => {
//         const offerCheckIn = new Date(offer.checkInDate);
//         const offerCheckOut = new Date(offer.checkOutDate);
//         const requestedCheckIn = new Date(checkIn);
//         const requestedCheckOut = new Date(checkOut);

//         // Check if the requested dates overlap with the offer dates
//         return (
//           requestedCheckIn >= offerCheckIn && requestedCheckIn <= offerCheckIn &&
//           requestedCheckOut <= offerCheckOut &&requestedCheckOut >= offerCheckOut
//         );
//       });

//       // Return the hotel data along with the filtered offers
//       return {
//         ...hotel,
//         offers: filteredOffers,
//       };
//     }).filter(hotel => hotel.offers.length > 0); // Remove hotels with no offers

//     // Format the response
//     const formattedResponse = {
//       status: 'success',
//       data: filteredHotels,
//       totalOffers: filteredHotels.reduce((sum, hotel) => sum + hotel.offers.length, 0), // Total offers across all hotels
//     };

//     res.json(formattedResponse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const getHotelDetails = async (hotelIds, adults, checkIn, checkOut, noOfrooms) => {
  try {
    // Validate required parameters
    if (!hotelIds || !adults || !checkIn || !checkOut) {
      throw new Error('hotelIds, adults, checkIn, and checkOut are required');
    }

    // Fetch hotel offers from the Amadeus API
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds: hotelIds,
      adults: adults,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      roomQuantity: noOfrooms
    });

    console.log(response.data);

    // Construct hotel data with Google Maps link
    const hotelsWithMapsLink = response.data.map(hotelOffer => {
      const { hotel } = hotelOffer; // Destructure hotel data

      // Construct Google Maps link
      const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${hotel.longitude},${hotel.latitude}`;

      return {
        ...hotelOffer, // Return the original hotel offer data
        googleMapsLink: googleMapsLink // Add the Google Maps link
      };
    });

    return {
      status: 'success',
      data: hotelsWithMapsLink,
      totalOffers: hotelsWithMapsLink.length, // Count all offers regardless of dates
    };

  } catch (error) {
    console.error(error);
    throw new Error(error.message); // Rethrow to handle in the calling function
  }
};




const getSeatmap = async (req, res) => {
  try {
    const { origin, destination, departureDate, adults } = req.query;

    // Fetch flight offers
    const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin || 'SYD',
      destinationLocationCode: destination || 'BKK',
      departureDate: departureDate || '2024-11-06',
      adults: adults || '1'
    });

    // If there are no flight offers, handle this case
    if (!flightOffersResponse.data.length) {
      return res.status(404).json({ message: 'No flight offers found' });
    }

    // Fetch seat maps for the first flight offer
    const seatmapResponse = await amadeus.shopping.seatmaps.post({
      data: [flightOffersResponse.data[0]]
    });

    // Send the seat map data in the response
    res.json(seatmapResponse.data);
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};






module.exports={getFlights,cities,getHotels,getHotelDetails,getSeatmap};