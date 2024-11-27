const mongoose = require("mongoose");
const Booking = require("../models/Bookings");
const Activity = require("../models/Activity");
const User = require("../models/User");
const APIFeatures = require("../utils/apiFeatures");

const generateSalesReport = async (req, res) => {
  try {
    // Step 1: Extract filters from the request query
    const { date, month, title } = req.query;
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
            _id: month // If month is provided, group by the month; otherwise, group by the date
              ? { activityId: "$ActivityId", month: { $month: "$createdAt" } } // Group by month
              : { activityId: "$ActivityId", createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } }, // Group by date
            totalRevenue: {
              $sum: { $multiply: ["$TotalPrice", "$NumberOfTickets"] } // Sum of TotalPrice * NumberOfTickets
            }
          }
        }
      ]);

      // Step 5: Add the results to the report
      sales.forEach(sale => {
        report.push({
          activityId: sale._id.activityId, // Activity ID
          period: month ? sale._id.month : sale._id.createdAt, // If month filter is used, show month; otherwise, show date
          totalRevenue: sale.totalRevenue, // Total sales for this activity on this date/month
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

module.exports = { generateSalesReport };


