import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import TouristNB from "./components/TouristNavBar";
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import MyOrderCard from "./components/MyOrderCard";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Review icon for activity
import ActivityReviewForm from "../../components/ActivityReviewForm.js"; // Renamed to ActivityReviewForm

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MyOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]); // Store current orders
  const [pastOrders, setPastOrders] = useState([]); // Store past orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Store filtered orders
  const [filters, setFilters] = useState("all"); // Filter between all, past, or current orders
  const [searchTerm, setSearchTerm] = useState("");
  const [openActivityReviewForm, setOpenActivityReviewForm] = useState(false); // For opening review form
  const [selectedActivityId, setSelectedActivityId] = useState(null); // For selecting the activity to review

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch("http://localhost:4000/cariGo/cart/MyOrders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        // Set the current and past orders based on the API response
        setCurrentOrders(json.currentOrders); // Set current orders
        setPastOrders(json.pastOrders); // Set past orders

        // By default, show both past and current orders
        setFilteredOrders([...json.currentOrders, ...json.pastOrders]);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilters(filter);
    if (filter === "past") {
      setFilteredOrders(pastOrders); // Show past orders
    } else if (filter === "current") {
      setFilteredOrders(currentOrders); // Show current orders
    } else {
      // Show both current and past orders when no specific filter is applied
      setFilteredOrders([...currentOrders, ...pastOrders]);
    }
  };

  const handleSearch = () => {
    const filtered = [...filteredOrders].filter((order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const openActivityReviewFormHandler = (id) => {
    setSelectedActivityId(id);
    setOpenActivityReviewForm(true);
  };

  const closeActivityReviewFormHandler = () => {
    setOpenActivityReviewForm(false);
    setSelectedActivityId(null);
  };

  return (
    <div>
      <TouristNB />
      <form>
        <TextField
          select
          label="Status"
          variant="outlined"
          value={filters}
          onChange={handleFilterChange}
          sx={{ mb: 2, mr: 2, width: "200px" }}
        >
          <MenuItem value="all">All Orders</MenuItem> {/* Option to view all orders */}
          <MenuItem value="past">Past Orders</MenuItem>
          <MenuItem value="current">Current Orders</MenuItem>
        </TextField>
        <Button variant="contained" onClick={() => setFilters("all")} sx={{ ml: 2 }}>
          Reset Filters
        </Button>
      </form>

      <Box sx={{ display: "flex" }}>

      </Box>

      <Box sx={{ width: "1150px", overflow: "hidden", margin: "0 auto", padding: "20px", height: "80vh", overflow: "auto" }}>
        <Grid container spacing={0} sx={{ flexDirection: "column", width: "100vw" }}>
          {filteredOrders.map((order, index) => (
            <Grid item key={index} sx={{ justifyContent: "left" }}>
              <MyOrderCard
                img={"frontend/public/assets/images/itinerary.png"}
                products={order.products}
                deliveryDate={order.deliveryDate}
                shippingAddress={order.shippingAddress}
                state={order.state}
                isCancelled={order.isCancelled}
                createdAt={order.createdAt}
                totalPrice={order.totalPrice}
                orderId={order._id}
                userId={order.userId}
              />
              <IconButton
                onClick={() => openActivityReviewFormHandler(order.ActivityId._id)}
                disabled={!(order.state === "delivered")}
              >
                <RateReviewIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedActivityId && (
        <ActivityReviewForm
          open={openActivityReviewForm}
          onClose={closeActivityReviewFormHandler}
          activityId={selectedActivityId}
        />
      )}
    </div>
  );
};

export default MyOrders;
