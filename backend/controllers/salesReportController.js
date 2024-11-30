const mongoose = require("mongoose");
const Booking = require("../models/Bookings");
const Activity = require("../models/Activity");
const User = require("../models/User");
const APIFeatures = require("../utils/apiFeatures");
const Itinerary = require("../models/Itinerary");
const generateSalesReport = async (req, res) => {
  try {
    // Step 1: Extract filters from the request query
    const { date, month, title, groupBy } = req.query;
    console.log("idddddddddd"+ req.user.id);
    // Step 2: Find activities authored by the user with optional title filter
    const activityFilter = { author: req.user.id };   
    if (title) {
      activityFilter.title = { $regex: title, $options: "i" }; // Case-insensitive search by title
    }

    const activities = await Activity.find(activityFilter);
    console.log(activities);

    // Prepare an array to store the sales report
    const report = [];

    // Step 3: Loop through each activity
    for (let activity of activities) {
      // Step 4: Aggregate sales for each booking of the current activity, with filtering for createdAtDate, month, and activity title
      const sales = await Booking.aggregate([
        {
          $match: {
            ActivityId: activity._id, // Filter by activity
            Status: true, // Filter out cancelled bookings
            ...(date && { // If a specific date is provided in the query
              createdAt: {
                $gte: new Date(date), // Start of the given date
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // End of the given date (the next day)
              }
            }),
            ...(month && { // If a specific month is provided in the query
              createdAt: {
                $gte: new Date(`${new Date().getFullYear()}-${month}-01`), // Start of the given month
                $lt: new Date(`${new Date().getFullYear()}-${parseInt(month) + 1}-01`) // End of the given month (next month's first day)
              }
            })
          }
        },
        {
          $group: {
            _id: {
              activityId: "$ActivityId", // Group by activity ID
              ...(groupBy === 'month' && { month: { $month: "$createdAt" } }), // Group by month if groupBy is 'month'
              ...(groupBy === 'date' && { createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }), // Group by date if groupBy is 'date'
            },
            totalRevenue: {
              $sum: { $multiply: ["$TotalPrice"] } // Sum of TotalPrice * NumberOfTickets
            },
            distinctUserIds: {
              $addToSet: "$UserId" // Collect distinct userIds in an array
            }
          }
        },
        {
          $addFields: {
            distinctUserCount: { $size: "$distinctUserIds" } // Count the distinct userIds
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            activityId: "$_id.activityId", // Keep the activityId
            period: groupBy === 'month' ? "$_id.month" : groupBy === 'date' ? "$_id.createdAt" : "All", // Period based on groupBy
            totalRevenue: 1, // Total revenue for this activity
            distinctUserCount: 1 // The number of distinct userIds
          }
        }
      ]);
     //console.log(sales[0])
      // Step 5: Add the results to the report
      sales.forEach(sale => {
        report.push({
          activityId: sale.activityId, // Activity ID
          activityName : sale.title,
          period: sale.period, // Period based on grouping
          totalRevenue: sale.totalRevenue, // Total sales for this activity on this date/month
          distinctUserCount: sale.distinctUserCount // The number of distinct users for this period/activity
        });
      });
    }
    let i =0;
    
    let totalRevenue = 0;
    while(i<report.length)
      totalRevenue+= report[i++].totalRevenue;
  
  //console.log(totalRevenue); // Output: 600
  
    // Step 6: Return the final sales report as a response
    res.json({
      success: true,
      report: report, // Send the sales report back to the client
      Revenue:totalRevenue
    });

  } catch (error) {
    // Step 7: Handle errors and send an error response
    console.error("Error generating sales report:", error);
    res.status(500).json({
      success: false,
      message: "Error generating sales report",
      error: error.message,
    });
  }
};


const generateSalesReportForItinerary = async (req, res) => {
  try {
    // Step 1: Extract filters from the request query
    const { date, month, title, groupBy } = req.query;

    // Step 2: Find itineraries authored by the user with optional title filter
    const itineraryFilter = { author: req.user.id };
    if (title) {
      itineraryFilter.title = { $regex: title, $options: "i" }; // Case-insensitive search by title
    }

    const itineraries = await Itinerary.find(itineraryFilter);
    console.log(itineraries);

    // Prepare an array to store the sales report
    const report = [];

    // Step 3: Loop through each itinerary
    for (let itinerary of itineraries) {
      // Step 4: Aggregate sales for each booking of the current itinerary, with filtering for createdAtDate, month, and itinerary title
      const sales = await Booking.aggregate([
        {
          $match: {
            ItineraryId: itinerary._id, // Filter by itinerary (changed from ActivityId to ItineraryId)
            Status: true, // Filter out cancelled bookings
            ...(date && { // If a specific date is provided in the query
              createdAt: {
                $gte: new Date(date), // Start of the given date
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // End of the given date (the next day)
              }
            }),
            ...(month && { // If a specific month is provided in the query
              createdAt: {
                $gte: new Date(`${new Date().getFullYear()}-${month}-01`), // Start of the given month
                $lt: new Date(`${new Date().getFullYear()}-${parseInt(month) + 1}-01`) // End of the given month (next month's first day)
              }
            })
          }
        },
        {
          $group: {
            _id: {
              itineraryId: "$ItineraryId", // Group by itinerary ID (changed from ActivityId)
              ...(groupBy === 'month' && { month: { $month: "$createdAt" } }), // Group by month if groupBy is 'month'
              ...(groupBy === 'date' && { createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }), // Group by date if groupBy is 'date'
            },
            totalRevenue: {
              $sum: { $multiply: ["$TotalPrice"] } // Sum of TotalPrice (no need for NumberOfTickets since it was removed in the new example)
            },
            distinctUserIds: {
              $addToSet: "$UserId" // Collect distinct userIds in an array
            }
          }
        },
        {
          $addFields: {
            distinctUserCount: { $size: "$distinctUserIds" } // Count the distinct userIds
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            itineraryId: "$_id.itineraryId", // Keep the itineraryId
            period: groupBy === 'month' ? "$_id.month" : groupBy === 'date' ? "$_id.createdAt" : "All", // Period based on groupBy
            totalRevenue: 1, // Total revenue for this itinerary
            distinctUserCount: 1 // The number of distinct userIds
          }
        }
      ]);

      // Step 5: Add the results to the report
      sales.forEach(sale => {
        report.push({
          itineraryId: sale.itineraryId, // Itinerary ID
          period: sale.period, // Period based on grouping
          totalRevenue: sale.totalRevenue, // Total sales for this itinerary on this date/month
          distinctUserCount: sale.distinctUserCount // The number of distinct users for this period/itinerary
        });
      });
    }

    // Step 6: Return the final sales report as a response
    res.json({
      success: true,
      report: report, // Send the sales report back to the client
    });

  } catch (error) {
    // Step 7: Handle errors and send an error response
    console.error("Error generating sales report:", error);
    res.status(500).json({
      success: false,
      message: "Error generating sales report",
      error: error.message,
    });
  }
};



module.exports = { generateSalesReport ,generateSalesReportForItinerary };


