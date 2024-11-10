// ComplaintHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintCard from "./components/ComplaintCard";
import ResponsiveAppBar from "./components/TouristNavBar";
const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const userId = localStorage.getItem("id"); // Get user ID if needed
        const response = await axios.get(
          `http://localhost:4000/cariGo/tourist/myComplaints`, // API endpoint
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ensure the token is passed
            },
          }
        );
        setComplaints(response.data.data.complaints);
      } catch (err) {
        setError("Failed to fetch complaints");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!complaints.length) return <div>No complaints found</div>;

  return (
    <>
      <ResponsiveAppBar />
      <div>
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            title={complaint.title}
            body={complaint.body}
            date={complaint.date}
            status={complaint.status}
            reply={complaint.reply}
          />
        ))}
      </div>
    </>
  );
};

export default ComplaintHistory;
