import ReactDOM from "react-dom/client";
import "../../styles/index.css";
import App from "../../App";
import NavBar from "../../components/NavBarTourist";
import ActivityList from "../../components/ActivityListUser";
import React, { useState, useEffect } from "react";
import AdminActList from "./AdminActList";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Layout } from "antd";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
const { Sider, Content, Header } = Layout;
// import IconButton from '@mui/icons-material';

export default function UserViewActivities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activities, setActivities] = useState([]);

  //to show user typed in values
  const [filterInputValues, setFilterInputValues] = useState({
    minPrice: "",
    category: "",
    rating: "",
    startDate: "",
  });
  //for actual filtering
  const [filters, setFilters] = useState({
    minPrice: "",
    category: "",
    rating: "",
    startDate: "",
  });

  //handles filter menu opening and closing
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = (event) => {
    if (isFilterOpen) {
      handleFilterClose();
    } else {
      setAnchorEl(event.currentTarget);
      setIsFilterOpen(true);
    }
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setIsFilterOpen(false);
  };

  // handles if filter value changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterInputValues((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    // Perform filter action using the `filters` object
    setFilters(filterInputValues);
    console.log("Filters applied:", filters);
    handleFilterClose();
  };

  const resetFilters = () => {
    setFilters({
      price: "",
      category: "",
      rating: "",
      startDate: "",
    });
    setFilteredActivities(activities); // Reset to all activities
  };

  //handling sort
  const [anchorE2, setAnchorE2] = useState(null);
  const [sortOption, setSortOption] = useState("");

  const handleSortClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleSortClose = () => {
    setAnchorE2(null);
  };

  const handleSortChange = (sortValue) => {
    setSortOption(sortValue); // Set the selected sort option
    handleSortClose(); // Close the menu
  };

  const [filteredActivities, setFilteredActivities] = useState(activities); // Store filtered results separately

  // Combined useEffect for Fetching Activities with Filters and Sort
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.price) queryParams.append("price", filters.price);
        if (filters.category) queryParams.append("Category", filters.category);
        if (filters.rating)
          queryParams.append("ratingsAverage", filters.rating);
        if (filters.startDate) {
          const startDateISO = new Date(filters.startDate).toISOString();
          queryParams.append("start_date", startDateISO);
        }
        if (sortOption) queryParams.append("sort", sortOption);

        const response = await fetch(
          `http://localhost:4000/Carigo/Activity/?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Fetched activities:", json);
        setActivities(json);
        setFilteredActivities(json); // Initialize filteredActivities with all activities
      } catch (error) {
        console.log("Error fetching activities:", error);
        setError("Failed to fetch activities. Please try again later.");
      } finally {
        setLoading(false);
      }
      console.log("fetched activities:", filteredActivities);
    };

    fetchActivities();
  }, [filters, sortOption]); // Re-fetch activities when filters or sort option change

  //handlign searching
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If searchTerm is empty, show all activities
      setFilteredActivities(filteredActivities);
    } else {
      const filtered = activities.filter((activity) => {
        return (
          (activity.title &&
            activity.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (activity.tag &&
            activity.tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (activity.Category &&
            activity.Category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredActivities(filtered); // Update the filtered activities
    }
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
          <Box
            sx={{
              width: "1150px",
              overflow: "hidden",
              margin: "0 auto",
              padding: "20px",
              height: "80vh", // Set a fixed height for the scrolling area
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none", // Hides the scrollbar for WebKit browsers (Chrome, Safari)
              },
            }}
          >
            <AdminActList fetchedActivities={filteredActivities} />
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
