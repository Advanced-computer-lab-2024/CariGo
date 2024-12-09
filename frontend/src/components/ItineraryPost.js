import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/joy/Typography";
export default function ItineraryPost({
  id,
  title,
  img,
  start_date,
  end_date,
  locations,
  price,
  tags,
  transportation,
  accommodation,
  rating,
  isBooked,
  accessibility,
  author,
  language,
}) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

        alert("Itinerary deleted successfully");
        navigate("/tour_guide/itineraries");
      } catch (error) {
        console.error(
          "Failed to delete itinerary:",
          error.response ? error.response.data : error.message
        );
        alert(
          `An error occurred while deleting the itinerary. Details: ${error.message}`
        );
      }
    }
  };

  // const handleShare = (e) => {
  //   e.stopPropagation();
  //   // Implement share functionality here
  //   alert("Share functionality not implemented yet");
  // };

  // const handleBookmark = (e) => {
  //   e.stopPropagation();
  //   setIsBookmarked(!isBookmarked);
  //   // Implement bookmark functionality here
  //   alert("Bookmark functionality not implemented yet");
  // };

  const styles = {
    card: {
      maxWidth: "400px",
      height: "100%",
      backgroundColor: "#FFFFFF",
      color: "#003055",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.02)",
      },
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
    price: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#F6F6F6",
      backgroundColor: "#ff6b35",
      padding: "2px 8px",
      borderRadius: "4px",
      display: "inline-block",
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

  return (
    <div style={styles.card} onClick={() => navigate(`/tour_guide/itineraries/${id}`)}>
      <div style={styles.imageContainer}>
        <img src={img} alt={title} style={styles.image} />
        <div style={styles.iconContainer}>
          
        </div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        {/* <p style={styles.author}>by {author?.username || "Unknown Author"}</p> */}
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
          <span style={styles.price}>${price}</span>
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
          {tags?.length > 0 ? (
            <h3 style={styles.tagsTitle}>Tags</h3>
          ) : (
            <h4 style={styles.tagsTitle}>No tags to view</h4>
          )}
          <div style={styles.tagsList}>
            {tags?.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag.title || tag.name || "Unknown Tag"}
              </span>
            ))}
          </div>
        </div>
        {isBooked ? (
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#004e89' }}>
            The Itinerary is Booked
          </Typography>
          ) : (
          <button style={styles.actionButton} onClick={handleDelete}>
            Delete Itinerary
          </button>
          )}
      </div>
    </div>
  );
}

