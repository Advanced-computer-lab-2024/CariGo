import React from "react";
import "../Home.css"; // Custom styles
import { useNavigate } from "react-router-dom";
import { Box, Card, IconButton, Typography, styled, Grid } from "@mui/material";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { ToastContainer } from "react-toastify";
import AdminItineraryPost from "./AdminItinerarypost";
import { useState, useEffect } from "react";

const { Sider, Content, Header } = Layout;

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const FeatureCard = styled(Card)(() => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

export default function EditCategory() {
  const navigate = useNavigate();

  const [itineraries, setItineraries] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState(itineraries);
  const [filters, setFilters] = useState({
    price: "",
    language: "",
    tags: "",
    startDate: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const queryParams = new URLSearchParams();
        if (filters.price) queryParams.append("price", filters.price);
        if (filters.language) queryParams.append("language", filters.language);
        if (filters.tags) queryParams.append("tags", filters.tags);
        if (filters.startDate)
          queryParams.append("start_date", filters.startDate);
        if (sortOption) queryParams.append("sort", sortOption);

        const response = await fetch(
          `http://localhost:4000/Event/readAllItineraries/?${queryParams.toString()}`,
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

        const json = await response.json();
        setItineraries(json);
        console.log(json);
        setFilteredActivities(json);
      } catch (error) {
        console.log("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, [filters, sortOption]);

  useEffect(() => {
    let updatedActivities = [...itineraries];

    if (filters.price) {
      updatedActivities = updatedActivities.filter(
        (itinerary) => itinerary.price <= filters.price
      );
    }
    if (filters.language) {
      updatedActivities = updatedActivities.filter(
        (itinerary) => itinerary.language === filters.language
      );
    }
    if (filters.tags) {
      updatedActivities = updatedActivities.filter(
        (itinerary) => itinerary.tags === filters.tags
      );
    }
    if (filters.startDate) {
      updatedActivities = updatedActivities.filter(
        (itinerary) =>
          new Date(itinerary.start_date) >= new Date(filters.startDate)
      );
    }
    if (searchTerm) {
      updatedActivities = updatedActivities.filter(
        (itinerary) =>
          itinerary.title &&
          itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOption) {
      updatedActivities.sort((a, b) => {
        if (sortOption === "price") {
          return a.price - b.price;
        } else if (sortOption === "ratingsAverage") {
          return b.ratingsAverage - a.ratingsAverage;
        } else if (sortOption === "-createdAt") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
    }

    setFilteredActivities(updatedActivities);
  }, [filters, searchTerm, sortOption, itineraries]);

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
          <Box>
            <Grid
              container
              spacing={0}
              sx={{ display: "flex", flexDirection: "column", width: "100vw" }}
            >
              {filteredActivities.map((itinerary, index) => (
                <Grid
                  item
                  key={index}
                  sx={{ display: "flex", justifyContent: "left" }}
                >
                  <AdminItineraryPost
                    id={itinerary._id}
                    title={itinerary.title}
                    img={"frontend/public/assets/images/itirenary.png"}
                    start_date={itinerary.start_date}
                    end_date={itinerary.end_date}
                    locations={itinerary.locations}
                    price={itinerary.price}
                    tags={itinerary.tags}
                    transportation={itinerary.transportation}
                    accommodation={itinerary.accommodation}
                    rating={itinerary.ratingsAverage}
                    isBooked={itinerary.isBooked}
                    accessibility={itinerary.accessibility}
                    isFlagged={itinerary.isFlagged}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>{" "}
        </Content>
      </Layout>
    </Layout>
  );
}
