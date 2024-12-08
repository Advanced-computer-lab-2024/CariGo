import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  ratingsQuantity,
  isBooked,
  accessibility,
  language,
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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const styles = {
    card: {
      maxWidth: "400px",
      height: "100%", // Ensure card fills the available height
      backgroundColor: "#FFFFFF", // Subtle off-white for a clean look
      color: "#003055", // Darker Blue for text
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex", // Flexbox for alignment
      flexDirection: "column", // Stack content vertically
    },
    imageContainer: {
      height: "200px", // Fixed height for image section
      backgroundColor: "#00355a", // Dark Navy
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    content: {
      padding: "24px",
      flexGrow: 1, // Make content fill available space
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // Space out title, description, and footer
    },
    iconContainer: {
      position: "absolute",
      top: "8px",
      right: "8px",
      display: "flex",
      gap: "8px",
    },
    iconButton: {
      backgroundColor: "#F6F6F6", // White for contrast
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s",
    },
    iconBookmark: {
      color: "#cc5b22", // Dark Shrimp Toast for the bookmarked state
      fontSize: "20px",
    },
    iconBookmarkUnmarked: {
      color: "#00355a", // Dark Navy for the unbookmarked state
      fontSize: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#002b4d", // Darker Blue
      marginBottom: "4px",
    },
    author: {
      fontSize: "14px",
      color: "#cc5b22", // Dark Shrimp Toast
      marginBottom: "8px",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginBottom: "16px",
    },
    star: {
      color: "#ff6b35", // Bright Orange
      fontSize: "16px",
    },
    ratingText: {
      fontSize: "14px",
      color: "#cc5b22", // Dark Shrimp Toast
    },
    description: {
      fontSize: "14px",
      color: "#003055", // Dark Blue
      marginBottom: "16px",
    },
    dateContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#1a4975", // Dark Jazz Blue
      marginBottom: "16px",
    },
    dateText: {
      fontSize: "14px",
    },
    tagsContainer: {
      marginBottom: "16px",
    },
    tagsTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#cc5b22", // Dark Shrimp Toast
      marginBottom: "8px",
    },
    tagsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    tag: {
      backgroundColor: "#00355a", // Dark Navy
      color: "#ffffff", // White for contrast
      padding: "4px 8px",
      borderRadius: "16px",
      fontSize: "12px",
    },
    actionButton: {
      width: "100%",
      backgroundColor: "#ff6b35", // Bright Orange
      color: "#ffffff", // White for contrast
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    actionButtonHover: {
      backgroundColor: "#1a4975", // Darker Jazz Blue on hover
    },
    price: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#F6F6F6", // White for contrast
      backgroundColor: "#ff6b35", // Bright Orange
      padding: "2px 8px",
      borderRadius: "4px",
      display: "inline-block",
    },
    locations: {
      fontSize: "14px",
      color: "#003055", // Dark Blue
      marginBottom: "8px",
    },
    priceLanguageContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      marginTop: "2px",
    },
    language: {
      fontSize: "14px",
      color: "#1a4975", // Dark Jazz Blue
    },
  };
  
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={img} alt={title} style={styles.image} />
        <div style={styles.iconContainer}>
          <button style={styles.iconButton} onClick={handleShare}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
          <button style={styles.iconButton} onClick={handleBookmark}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "#D59D80" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.author}>by {author.username}</p>
        <div style={styles.ratingContainer}>
          {"★★★★★".split("").map((star, index) => (
            <span
              key={index}
              style={{
                ...styles.star,
                opacity: index < Math.floor(rating) ? 1 : 0.5,
              }}
            >
              {star}
            </span>
          ))}
          <span style={styles.ratingText}>
            {rating}
          </span>
        </div>
        <div style={styles.priceLanguageContainer}>
          <span style={styles.price}>${(price * conversionRate).toFixed(2)} {code}</span>
          <span style={styles.language}>{language}</span>
        </div>
        <div style={styles.dateContainer}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span style={styles.dateText}>
            {formatDate(start_date)} - {formatDate(end_date)}
          </span>
        </div>
        <div style={styles.tagsContainer}>
          {tags?.length> 0 ? <h3 style={styles.tagsTitle}>Tags</h3> : <h4 style={styles.tagsTitle}>No tags to view</h4>}
          <div style={styles.tagsList}>
            {tags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag.title || tag.name || "Unknown Tag"}
              </span>
            ))}
          </div>
        </div>
        <button
          style={styles.actionButton}
          onClick={() => navigate(`/user_itineraries/${id}`)}
        >
          View Itinerary
        </button>
      </div>
    </div>
  );
}
