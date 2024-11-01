const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'momcIYlJsGggAZfsLmPF4vnrr8P3dVRa',
  clientSecret: 'M6DDYSiCXacAm7i9'
});
// Route to get IATA code by city name
const getIataCode = async (cityName) => {
  try {
      const response = await amadeus.referenceData.locations.get({
          keyword: cityName,
          subType: 'CITY'
      });
      return response.data[0]?.iataCode; // Return the IATA code of the first result
  } catch (error) {
      console.error('Error fetching IATA code:', error);
      throw error;
  }
};
const getFlights = async (req, res) => {
  try {
      const { origin, destination, departureDate, adults } = req.query;

      const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: adults
      });

      // Map the response to include only the relevant information
      const flights = response.data.map(offer => {
          return {
              id: offer.id, // Offer ID
              airline: offer.validatingAirlineCodes[0] || 'Unknown Airline', // First validating airline
              segments: offer.itineraries.map(itinerary => {
                  return itinerary.segments.map(segment => ({
                      flightNumber: segment.number,
                      departure: {
                          airport: segment.departure.iataCode,
                          time: segment.departure.at
                      },
                      arrival: {
                          airport: segment.arrival.iataCode,
                          time: segment.arrival.at
                      },
                      duration: segment.duration,
                      numberOfStops: segment.numberOfStops,
                      fareDetails: offer.travelerPricings[0].fareDetailsBySegment.find(fd => fd.segmentId === segment.id) || {}
                  }));
              }).flat(), // Flatten to get a single array of segments
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
      });

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
          keyword: keyword,
          subType: 'CITY'
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
const getHotels = async (req, res) => {
  try {
      const { latitude, longitude } = req.query; // Extract latitude and longitude from query parameters

     // Validate required parameters
      if (!latitude || !longitude) {
          return res.status(400).json({ error: 'Latitude and longitude are required.' });
      }
     
      //Retrieve points of interest
      const response = await amadeus.referenceData.locations.hotels.byGeocode.get({
        latitude :latitude ,
        longitude :longitude
      });
      
      // Map the response to a more usable format
      const pois = response.data.map(poi => ({
          name: poi.name,
          category: poi.category,
          address: poi.address,
          distance: poi.distance,
          location: poi.location // Includes latitude and longitude
      }));

      res.json(pois);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};



module.exports={getFlights,cities,getHotels};