import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, Snackbar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../assets/itinerary.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState, useEffect } from "react";

export default function UserItineraryPost({
  id,
  author,
  img,
  title,
  start_date,
  end_date,
  locations = [],
  price,
  tags,
  transportation,
  accommodation,
  rating,
  isBooked,
  accessibility,
}) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [savedItineraries, setSavedItineraries] = React.useState([]);

  useEffect(() => {
    const fetchSavedItineraries = async () => {
      const token = localStorage.getItem("jwt");
      const userId = localStorage.getItem("id");

      if (!token || !userId) {
        console.error("No token or user ID found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`/cariGo/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userSavedItineraries = response.data.savedItineraries || [];
        setSavedItineraries(userSavedItineraries);
        setIsBookmarked(userSavedItineraries.includes(id));
      } catch (error) {
        console.error("Error fetching saved itineraries:", error);
      }
    };

    fetchSavedItineraries();
  }, [id]);

  const isUserTourist = () => {
    const userRole = localStorage.getItem("role");
    return userRole === "Tourist";
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatDateHour = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this itinerary?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.delete(`/cariGo/Event/itineraries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSnackbarMessage("Itinerary deleted successfully");
        setSnackbarOpen(true);
        navigate("/itineraries");
      } catch (error) {
        console.error(
          "Failed to delete itinerary:",
          error.response ? error.response.data : error.message
        );
        setSnackbarMessage(
          `An error occurred while deleting the itinerary. Details: ${error.message}`
        );
        setSnackbarOpen(true);
      }
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`/cariGo/Event/shareItinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shareLink = response.data;

      if (navigator.share) {
        await navigator.share({
          title: "Check out this itinerary!",
          text: "I found this great itinerary on CariGo",
          url: shareLink,
        });
      } else {
        await navigator.clipboard.writeText(shareLink);
        setSnackbarMessage("Link copied to clipboard!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error sharing itinerary:", error);
      if (error.response && error.response.status === 401) {
        setSnackbarMessage(
          "You need to be logged in to share this itinerary. Please log in and try again."
        );
      } else {
        setSnackbarMessage(
          "Failed to share itinerary. Please try again later."
        );
      }
      setSnackbarOpen(true);
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("jwt");
    const userId = localStorage.getItem("id");

    if (!token || !userId) {
      console.error("No token or user ID found. Please log in.");
      navigate("/login");
    }

    try {
      const updatedSavedItineraries = isBookmarked
        ? savedItineraries.filter((itineraryId) => itineraryId !== id)
        : [...savedItineraries, id];

      await axios.patch(
        `/cariGo/users/update/${userId}`,
        { savedItineraries: updatedSavedItineraries },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedItineraries(updatedSavedItineraries);
      setIsBookmarked(!isBookmarked);
      setSnackbarMessage(
        isBookmarked
          ? "Itinerary removed from bookmarks"
          : "Itinerary bookmarked successfully"
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error bookmarking itinerary:", error);
      setSnackbarMessage(
        "Failed to bookmark itinerary. Please try again later."
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  return (
    <Card
      sx={{
        width: "100%",
        height: "400px",
        color: "#126782",
        fontSize: "18px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        position: "relative",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/user_itineraries/${id}`)}
    >
      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={logoImage || "/default-itinerary.jpg"}
          alt="Itinerary Image"
          sx={{
            width: "400px",
            height: "250px",
            margin: "5px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            padding: "10px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}>
                {title?.charAt(0) || "A"}
              </Avatar>
            }
            title={
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", fontSize: "24px" }}
              >
                {title || "Anonymous"}
              </Typography>
            }
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginLeft: "15px",
            }}
          >
            {tags?.map((tag) => (
              <Chip
                key={tag._id}
                label={tag.title}
                sx={{ backgroundColor: "#126782", color: "white" }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <StarIcon sx={{ scale: "0.9" }} />
              <Typography sx={{ fontSize: "16px", marginTop: "1px" }}>
                {rating || "No rating"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "5px" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{ display: "flex", padding: "5px", paddingLeft: "0px" }}
                >
                  <CalendarMonthIcon sx={{ color: "#ff4d4d" }} />
                  <Typography sx={{ marginTop: "2px" }}>
                    {formatDateTime(start_date)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: "5px",
                    paddingLeft: "0px",
                    gap: "2px",
                  }}
                >
                  <AccessTimeIcon
                    sx={{ color: "#126782", marginLeft: "20px" }}
                  />
                  <Typography sx={{ marginTop: "2px" }}>
                    {formatDateHour(start_date)}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  margin: "2px",
                  marginTop: "5px",
                  color: "#ff4d4d",
                  fontWeight: "600",
                }}
              >
                to
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "5px",
                }}
              >
                <Box
                  sx={{ display: "flex", padding: "5px", paddingLeft: "0px" }}
                >
                  <CalendarMonthIcon sx={{ color: "#ff4d4d" }} />
                  <Typography sx={{ marginTop: "0px" }}>
                    {formatDateTime(end_date)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: "5px",
                    paddingLeft: "0px",
                    gap: "2px",
                  }}
                >
                  <AccessTimeIcon
                    sx={{ color: "#126782", marginLeft: "20px" }}
                  />
                  <Typography sx={{ marginTop: "2px" }}>
                    {formatDateHour(end_date)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", marginTop: "5px" }}>
              <PinDropIcon />
              <Typography sx={{ marginLeft: "5px" }}>
                {Array.isArray(locations)
                  ? locations.join(", ")
                  : "Not specified"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", marginTop: "5px" }}>
              <AttachMoneyIcon />
              <Typography
                sx={{ marginLeft: "5px", color: price ? "#126782" : "#ff4d4d" }}
              >
                {price
                  ? `${(price * conversionRate).toFixed(2)} ${code}`
                  : "Price not specified"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            marginTop: "-10px",
            fontSize: "16px",
            width: "460px",
          }}
        >
          {transportation || "No transportation info"} |{" "}
          {accommodation || "No accommodation info"}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ position: "absolute", bottom: "2px", left: "2px" }}>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="bookmark" onClick={handleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardActions>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Card>
  );
}
