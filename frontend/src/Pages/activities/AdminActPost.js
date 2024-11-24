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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SellIcon from "@mui/icons-material/Sell";
import StarIcon from "@mui/icons-material/Star";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import NotInterestedIcon from '@mui/icons-material/NotInterested';

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
  isFlagged,
}) {
  const [expanded, setExpanded] = useState(false);
  const [flagged, setFlagged] = useState(isFlagged);
  const [counter, setCounter] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const updateActivity = async (newFlagState) => {
    const token = localStorage.getItem("jwt");
    try {
      await axios.patch(
        `http://localhost:4000/cariGo/activity/updateActivity/${id}`,
        {
          isFlagged: newFlagState,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlagged(newFlagState);
      setCounter(counter + 1); // Update the counter to trigger re-render
    } catch (error) {
      console.error("Failed to update activity flag state:", error);
    }
  };

  useEffect(() => {
    // Re-render component when the flagged state changes
  }, [counter]);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "900px",
        height: "350px",
        maxHeight: "500px",
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
    >
      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={img || "/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"}
          alt={title}
          sx={{
            width: "500px",
            height: "250px",
            margin: "2px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              width: "400px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "overflow",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  sx={{ width: "300px", fontWeight: "bold", fontSize: "24px" }}
                >
                  {title}
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
              {tag != null ? (
                <Chip
                  label={tag}
                  sx={{ backgroundColor: "#126782", color: "white" }}
                />
              ) : (
                ""
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              marginLeft: "30px",
            }}
          >
            <Typography>
              category: {category != null ? category : "no specified category"}
            </Typography>

            <Box sx={{ display: "flex" }}>
              <StarIcon sx={{ scale: "0.9" }} />
              <Typography sx={{ fontSize: "16px", marginTop: "1px" }}>
                {"" + rating + ""}
              </Typography>
            </Box>
            <Box
              sx={{
                fontSize: "16px",
                backgroundColor: isOpened === "open" ? "#70db70" : "#ff4d4d",
                color: "white",
                display: "inline-block",
                borderRadius: "4px",
                width: isOpened === "open" ? "50px" : "60px",
              }}
            >
              <Typography
                sx={{
                  marginLeft: "6px",
                  marginBottom: "2px",
                }}
              >
                {isOpened || "status"}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", marginTop: "5px", margoinLeft: "-10px" }}
            >
              <AttachMoneyIcon />
              <Typography
                sx={{
                  marginLeft: "5px",
                  color: "#126782",
                  marginRight: "5px",
                }}
              >
                {price != null
                  ? price   //? price.range.max + "-" + price.range.min
                  : "no specified price"}
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#ff4d4d",
                  display: "flex",
                  marginLeft: "5px",
                  borderRadius: "5px",
                  padding: "0px",
                }}
              >
                <Typography sx={{ marginLeft: "5px", color: "white" }}>
                  {"-" + discount + "%" || ""}
                </Typography>
                <SellIcon
                  sx={{
                    scale: "0.7",
                    color: "white",
                    marginTop: "2px",
                    marginLeft: "-2px",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              marginTop: "-15px",
              marginLeft: "-5px",
              flexWrap: "wrap",
              fontSize: "16px",
              width: "460px",
              position: "absolute",
              top: "290px",
            }}
          >
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Box sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
            <IconButton onClick={() => updateActivity(!flagged)} aria-label="flag">
              {flagged ? (
                <FlagIcon sx={{ color: "#ff4d4d" }} />
              ) : (
                <FlagOutlinedIcon sx={{ color: "#126782" }} />
              )}
            </IconButton>
            {flagged && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                //   marginBottom: "20px",
                    marginTop: "30px",
                }}
              >
                <NotInterestedIcon aria-label="inappropriate" sx={{ color: "red"}} />
                <h4 style={{ marginTop: "20px" }}>This itinerary is flagged as inappropriate content</h4>
              </Box>
            )}
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}
