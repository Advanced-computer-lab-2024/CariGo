import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ActivityPost({
  id,
  author,
  img,
  start_date,
  end_date,
  duration,
  tag,
  description,
  title,
  location,
  price,
  category,
  discount,
  isOpened,
  rating,
}) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [savedActivities, setSavedActivities] = React.useState([]);

  useEffect(() => {
    const fetchSavedActivities = async () => {
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
        const userSavedActivities = response.data.savedActivities || [];
        setSavedActivities(userSavedActivities);
        setIsBookmarked(userSavedActivities.includes(id));
      } catch (error) {
        console.error("Error fetching saved activities:", error);
      }
    };

    fetchSavedActivities();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.delete(`/cariGo/Event/activities/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSnackbarMessage("Activity deleted successfully");
        setSnackbarOpen(true);
        navigate("/activities");
      } catch (error) {
        console.error(
          "Failed to delete activity:",
          error.response ? error.response.data : error.message
        );
        setSnackbarMessage(
          `An error occurred while deleting the activity. Details: ${error.message}`
        );
        setSnackbarOpen(true);
      }
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
      const updatedSavedActivities = isBookmarked
        ? savedActivities.filter((activityId) => activityId !== id)
        : [...savedActivities, id];

      await axios.patch(
        `/cariGo/users/update/${userId}`,
        { savedActivities: updatedSavedActivities },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedActivities(updatedSavedActivities);
      setIsBookmarked(!isBookmarked);
      setSnackbarMessage(
        isBookmarked
          ? "Activity removed from bookmarks"
          : "Activity bookmarked successfully"
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error bookmarking activity:", error);
      setSnackbarMessage(
        "Failed to bookmark activity. Please try again later."
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

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`/cariGo/Activity/shareActivity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shareLink = response.data;

      if (navigator.share) {
        await navigator.share({
          title: "Check out this activity!",
          text: "I found this great activity on CariGo",
          url: shareLink,
        });
      } else {
        await navigator.clipboard.writeText(shareLink);
        setSnackbarMessage("Link copied to clipboard!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error sharing activity:", error);
      if (error.response) {
        if (error.response.status === 404) {
          setSnackbarMessage("Activity not found. It may have been deleted.");
        } else if (error.response.status === 401) {
          setSnackbarMessage(
            "You need to be logged in to share this activity. Please log in and try again."
          );
        } else {
          setSnackbarMessage(
            "An error occurred while sharing the activity. Please try again later."
          );
        }
      } else if (error.request) {
        setSnackbarMessage(
          "Unable to reach the server. Please check your internet connection and try again."
        );
      } else {
        setSnackbarMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
      setSnackbarOpen(true);
    }
  };

  const styles = {
    // Using the same styles as before, adjust based on activity
    card: {
      maxWidth: "400px",
      height: "100%",
      backgroundColor: "#ffffff",
      color: "#003055",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
    },
    imageContainer: {
      height: "200px",
      backgroundColor: "#00355a",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    content: {
      padding: "24px",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    iconContainer: {
      position: "absolute",
      top: "8px",
      right: "8px",
      display: "flex",
      gap: "8px",
    },
    iconButton: {
      backgroundColor: "#F6F6F6",
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
      color: "#cc5b22",
      fontSize: "20px",
    },
    iconBookmarkUnmarked: {
      color: "#00355a",
      fontSize: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#002b4d",
      marginBottom: "4px",
    },
    author: {
      fontSize: "14px",
      color: "#cc5b22",
      marginBottom: "8px",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginBottom: "16px",
    },
    star: {
      color: "#ff6b35",
      fontSize: "16px",
    },
    ratingText: {
      fontSize: "14px",
      color: "#cc5b22",
    },
    description: {
      fontSize: "14px",
      color: "#003055",
      marginBottom: "16px",
    },
    dateContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#1a4975",
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
      color: "#cc5b22",
      marginBottom: "8px",
    },
    tagsList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    tag: {
      backgroundColor: "#00355a",
      color: "#ffffff",
      padding: "4px 8px",
      borderRadius: "16px",
      fontSize: "12px",
    },
    actionButton: {
      width: "100%",
      backgroundColor: "#ff6b35",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    actionButtonHover: {
      backgroundColor: "#1a4975",
    },
    price: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#F6F6F6",
      backgroundColor: "#ff6b35",
      padding: "2px 8px",
      borderRadius: "4px",
      display: "inline-block",
    },
    location: {
      fontSize: "14px",
      color: "#003055",
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
      color: "#1a4975",
    },
  };

  const priceNumber = parseFloat(price);
  const discountedPrice =
    discount > 0 ? (priceNumber * (1 - discount/100)).toFixed(2) : priceNumber.toFixed(2);
  const priceDisplay =
    discount > 0 ? (
      <>
        <span
          style={{
            ...styles.price,
            textDecoration: "line-through",
            color: "#ccc",
          }}
        >
          ${priceNumber.toFixed(2)}
        </span>
        <span style={styles.price}>${discountedPrice}</span>
      </>
    ) : (
      <span style={styles.price}>${discountedPrice}</span>
    );

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={img || "./activity.png"} alt={title} style={styles.image} />
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
        <p style={styles.author}>by {author?.username ? author?.username :"Big Bang"}</p>
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
          <span style={styles.ratingText}>{rating}</span>
        </div>
        <div style={styles.priceLanguageContainer}>
          {priceDisplay}
          {discount > 0 && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#ff6b35", marginLeft: "8px" }}
            >
              <path d="M12 3v18M3 12h18" />
            </svg>
          )}
          <span style={styles.language}>
            {discount > 0 ? `${(discount).toFixed(0)}% off` : ""}
          </span>
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
          <span style={styles.dateText}>{formatDate(start_date)}</span>
        </div>
        <div style={styles.tagsContainer}>
          {tag ? (
            <h3 style={styles.tagsTitle}>Tags</h3>
          ) : (
            <h4 style={styles.tagsTitle}>No tags to view</h4>
          )}
          <div style={styles.tagsList}>
            <span style={styles.tag}>{tag}</span>
          </div>
        </div>
        <button
          style={styles.actionButton}
          onClick={() => navigate(`/activity/${id}`)}
        >
          View Activity
        </button>
      </div>
    </div>
  );
}
