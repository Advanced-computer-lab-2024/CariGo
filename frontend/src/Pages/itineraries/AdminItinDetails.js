import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { ToastContainer } from "react-toastify";
import UserAcList from "../../components/UserAcList";
import "../../components/styles/CompanyInfo.css";
import logoImage from "../../assets/itinerary.png"; // Correct relative path
import "ldrs/jellyTriangle";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import axios from "axios";

const { Sider, Content, Header } = Layout;
const AdminItineraryDetails = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          `/cariGo/Event/readSingleItinerary/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItinerary(data);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [id, counter]);

  if (!itinerary) {
    return (
      <l-jelly-triangle size="30" speed="1.75" color="black"></l-jelly-triangle>
    );
  }

  const {
    start_date,
    end_date,
    locations,
    price,
    tags,
    activities,
    transportation,
    accommodation,
    ratingsAverage,
    language,
    pick_up,
    drop_off,
    accessibility,
    title,
    isFlagged,
  } = itinerary;

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formattedActivities = activities.map((activity) => ({
    name: activity.name,
    description: activity.description,
    startDate: formatDateTime(activity.start_date),
    endDate: formatDateTime(activity.end_date),
  }));

  const updateItinerary = async (isFlagged) => {
    const token = localStorage.getItem("jwt");
    await axios.patch(
      `http://localhost:4000/cariGo/Event/updateItinerary/${id}`,
      {
        isFlagged: isFlagged,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCounter(counter + 1);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar />
        </Header>
        <ToastContainer />
        <Content
          className="ant-layout-content"
          style={{ padding: "20px", overflowY: "auto" }}
        >
          <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Avatar sx={{ bgcolor: "#283593", width: 56, height: 56 }}>
                {title?.charAt(0) || "A"}
              </Avatar>
              <Typography
                variant="h4"
                sx={{ margin: "10px 0", fontWeight: "bold", color: "#283593" }}
              >
                {title || "Anonymous"}
              </Typography>
              {tags?.map((tag) => (
                <Chip
                  key={tag._id}
                  label={tag.title}
                  sx={{
                    backgroundColor: "#283593",
                    color: "white",
                    margin: "5px",
                  }}
                />
              ))}
              {isFlagged && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <NotInterestedIcon
                    aria-label="inappropriate"
                    sx={{ color: "red" }} // Optional styling for the delete icon
                  ></NotInterestedIcon>
                  <h2>This itinerary is flagged as inappropriate content</h2>
                </Box>
              )}
            </Box>

            <Box
              component="img"
              src={logoImage || ""}
              alt="Itinerary Image"
              sx={{
                width: "100%",
                maxHeight: "400px",
                borderRadius: "10px",
                objectFit: "cover",
                marginBottom: "20px",
              }}
            />

            <div className="company-info">
              <Box sx={{ marginBottom: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <StarIcon sx={{ color: "#FFD700", marginRight: "5px" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "18px", color: "#283593" }}
                  >
                    {ratingsAverage || "No rating"}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#283593",
                    marginBottom: "5px",
                  }}
                >
                  <strong>Start Date:</strong> {formatDateTime(start_date)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    color: "#283593",
                    marginBottom: "5px",
                  }}
                >
                  <strong>End Date:</strong> {formatDateTime(end_date)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <PinDropIcon sx={{ color: "#283593", marginRight: "5px" }} />
                  <Typography variant="body1">
                    <strong>Locations:</strong>{" "}
                    {locations?.join(", ") || "Not specified"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <AttachMoneyIcon
                    sx={{ color: "#283593", marginRight: "5px" }}
                  />
                  <Typography variant="body1">
                    <strong>Price:</strong>{" "}
                    {price ? `$${price}` : "Price not specified"}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Language of Tour Guide:</strong>{" "}
                  {language || "No language info"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Transportation:</strong>{" "}
                  {transportation || "No transportation info"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Pick-up:</strong> {pick_up || "No pick-up info"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Drop-off:</strong> {drop_off || "No drop-off info"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Accommodation:</strong>{" "}
                  {accommodation || "No accommodation info"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Accessibility:</strong>{" "}
                  {accessibility || "No accessibility info"}
                </Typography>

                {/* Displaying activities */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#283593" }}
                >
                  <strong>Activities:</strong>
                </Typography>
                <UserAcList activities={formattedActivities} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {isFlagged ? (
                  <Button
                    variant="contained"
                    color="primary"
                    label="Flagged"
                    onClick={() => {
                      updateItinerary(!isFlagged);
                      
                    }}
                  >
                    Approve itinerary
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      updateItinerary(!isFlagged);
                      
                    }}
                  >
                    Flag as inappropriate
                  </Button>
                )}
              </Box>
            </div>
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminItineraryDetails;
