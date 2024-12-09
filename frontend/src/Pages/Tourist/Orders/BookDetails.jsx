import TouristNB from "../components/TouristNavBar";
import { BaseLinkGreen } from "./styles/button";
import styled from "styled-components";
import { Container } from "./styles/styles";
import { useLocation } from 'react-router-dom';
import { UserContent, UserDashboardWrapper } from "./styles/user";
import UserMenu from "./components/user/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { IconChevronLeft } from '@tabler/icons-react'
import Title from "./components/common/Title";
import axios from "axios";

import { currencyFormat } from "./utils/helper";
import { Button } from "@mui/material";
import { breakpoints, defaultTheme } from "./styles/themes/default";
import { useContext,useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "./components/user/OrderItem";
//import { Navigate } from "react-router-dom";
import DetailMenu from "./components/user/DetailMenu";

const OrderDetailScreenWrapper = styled.main`
  .btn-and-title-wrapper {
    margin-bottom: 24px;
    .title {
      margin-bottom: 0;
    }

    .btn-go-back {
      margin-right: 12px;
      transition: ${defaultTheme.default_transition};

      &:hover {
        margin-right: 16px;
      }
    }
  }

  .order-d-top {
    background-color: ${defaultTheme.color_whitesmoke};
    padding: 26px 32px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 12px;
    }
  }
`;


const OrderDetailStatusWrapper = styled.div`
  margin: 0 36px;
  
  @media (max-width: ${breakpoints.sm}) {
    margin: 0 10px;
    overflow-x: scroll;
  }

  .order-status {
    height: 6px; /* Slightly thicker for better visibility */
    margin: 50px 0;
    max-width: 580px;
    width: 100%; /* Responsive width */
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-bottom: 70px;
    background: linear-gradient(90deg, #126782, #ff4d4d); /* Stylish gradient */

    @media (max-width: ${breakpoints.sm}) {
      margin-right: 20px;
      margin-left: 20px;
    }

    &-dot {
      width: 24px;
      height: 24px;
      border: 3px solid #ffffff; /* Border for better contrast */
      background-color: #ff4d4d; /* Default dot color */
      border-radius: 50%;
      position: absolute;
      top: 50%;
      
     

      &:nth-child(1) {
        left: 0;
      }

      &:nth-child(2) {
        left: calc(33.3333% - 12px);
      }

      &:nth-child(3) {
        left: calc(66.6666% - 12px);
      }

      &:nth-child(4) {
        right: 0;
      }

      &.status-done {
        background-color: #126782; /* Blue for completed steps */
        
        
        .order-status-text {
          color: #126782; /* Text color matches the step */
        }
      }

      &.status-current {
        background-color: #ff4d4d; /* Red for the current step */
        box-shadow: 0 0 10px rgba(255, 77, 77, 0.5); /* Glow effect for focus */

        &::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          background-color: #ffffff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 1; /* Ensure visibility */
        }

        .order-status-text {
          color: #ff4d4d;
        }
      }

      &:hover {
        background-color: #126782; /* Change to blue on hover */
        transform: scale(1.2); /* Enlarges for better interactivity */
      }
    }

    &-text {
      position: absolute;
      top: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: bold;
      color: #6d6d6d; /* Neutral text color */
      transition: color 0.3s ease;

      .status-done & {
        color: #126782;
      }

      .status-current & {
        color: #ff4d4d;
      }
    }
  }
`;

const OrderDetailMessageWrapper = styled.div`
  background: linear-gradient(135deg, #ff4d4d, #126782); /* Apply gradient background */
  max-width: 165px;
  margin-right: auto;

  margin-left: auto;
  min-height: 30px;
  max-height: 40px;
  padding: 16px 20px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;
  margin-bottom:-15px;
  color: #ffffff; /* Ensure text color contrasts with the background */
  font-weight: 500; /* Add modern font styling */
  text-align: center; /* Center align the text */

  &::after {
    content: "";
    position: absolute;
    bottom: -37px; /* Align at the bottom */
    left: 20%;
    border-top: 22px solid #126782; /* Match the start of the gradient */
    border-bottom: 18px solid transparent;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
  }

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #ff4d4d, #126782); /* Reverse gradient on hover */
    transition: background 0.3s ease;
  }
`;
const OrderDetailMessageWrapper2 = styled.div`
  background: linear-gradient(135deg, #ff4d4d, #126782); /* Apply gradient background */
  max-width: 130px;
  margin-right: auto;

  margin-left: auto;
  min-height: 30px;
  max-height: 40px;
  padding: 16px 20px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;
  margin-bottom:-15px;
  color: #ffffff; /* Ensure text color contrasts with the background */
  font-weight: 500; /* Add modern font styling */
  text-align: center; /* Center align the text */

  

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 10px;
  }

  &:hover {
    background: linear-gradient(135deg, #ff4d4d, #126782); /* Reverse gradient on hover */
    transition: background 0.3s ease;
  }
`;

const OrderDetailListWrapper = styled.div`
  padding: 24px;
  margin-top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
max-width: 640px;
  @media (max-width: ${defaultTheme.md}) {
    padding: 18px;
  }

  @media (max-width: ${defaultTheme.md}) {
    padding: 12px;
  }

  .order-d-item {
    grid-template-columns: 80px 1fr 1fr 32px;
    gap: 20px;
    padding: 12px 0;
    border-bottom: 1px solid ${defaultTheme.color_whitesmoke};
    position: relative;

    @media (max-width: ${defaultTheme.xl}) {
      grid-template-columns: 80px 3fr 2fr 32px;
      padding: 16px 0;
      gap: 16px;
    }

    @media (max-width: ${defaultTheme.sm}) {
      grid-template-columns: 50px 3fr 2fr;
      gap: 16px;
    }

    @media (max-width: ${defaultTheme.xs}) {
      grid-template-columns: 100%;
      gap: 12px;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    &-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      @media (max-width: ${breakpoints.sm}) {
        width: 50px;
        height: 50px;
      }

      @media (max-width: ${breakpoints.sm}) {
        width: 100%;
        height: 100%;
      }
    }

    &-calc {
      p {
        display: inline-block;
        margin-right: 50px;

        @media (max-width: ${defaultTheme.lg}) {
          margin-right: 20px;
        }
      }
    }

    &-btn {
      margin-bottom: auto;
      &:hover {
        color: ${defaultTheme.color_sea_green};
      }

      @media (max-width: ${breakpoints.sm}) {
        position: absolute;
        right: 0;
        top: 10px;
      }

      @media (max-width: ${defaultTheme.xs}) {
        width: 28px;
        height: 28px;
        z-index: 5;
        background-color: ${defaultTheme.color_white};
        border-radius: 50%;
        right: 8px;
        top: 24px;
      }
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
  { label: "Booking Details", link: "/BookDetails" },
];

const BookDetails = () => {
  const navigate = useNavigate();
  //const {ord} = useContext(OrderContext)

  
  
  //console.log(state);
  const { id,type } = useParams();
  const [order,setOrder] = useState(null)
  const [products,setProducts] = useState(null)
  const [book,setbook]= useState(null);
  const { state } = useLocation();
  useEffect(() => {
    
    setbook(state);
    //console.log(state.ActivityId.start_date);
    

    //console.log(order?order.state:"null");
}, [])

let message;
const [done,setDone] = useState(false)


  const currentTime = new Date();
  let activityStartDate;
  if(type=="activity"){
 activityStartDate = new Date(state?.ActivityId?.start_date);}
 else if (type=="itenerary"){
  activityStartDate = new Date(state?. ItineraryId?.start_date);
 }
 else if (type=="hotel"){
  activityStartDate = new Date(state?. hotelData?.offer?.checkInDate);
 }

 else if (type=="flight"){
  activityStartDate = new Date(state?. flightData?.segments[0]?.departure?.time);
 }

// Calculate the difference in hours
const timeDifference = (activityStartDate - currentTime) / (1000 * 60 * 60);

if (timeDifference <= 48) {
  message = 693; // Activity starts in less than 48 hours
} else {
  message = 317; // Activity starts in 48 hours or more
}

const folderPics = `http://localhost:4000/public/img/products/`;
const handleCancel = async () => {
  const cancelBooking = window.confirm("Are you sure you want to cancel this booking?");
  if (cancelBooking) {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      if (type=="activity"){
      await axios.patch(`/cariGo/activity/CancelActivityBooking`, {
        bookingId: state._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });}
      else if (type=="itenerary"){
        await axios.patch(`/cariGo/Event/CancelItineraryBooking`, {
          bookingId:state._id ,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      else if (type=="hotel"){
        await axios.patch(`http://localhost:4000/cariGo/flights//CancelhBooking`, {bookingId: state?._id,}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      else if (type=="flight"){
        await axios.patch(`http://localhost:4000/cariGo/flights//CancelfBooking`, {bookingId: state?._id,}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
      else if (type=="transportation"){
        await axios.patch(`http://localhost:4000/cariGo/transportation/CancelBooking/${state?._id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }


      alert("activity booking canceled successfully");
      navigate(`/Tourist/book/${type}`);
      window.location.reload();
      const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
      console.log(rate);
      await axios.patch(`/cariGo/users/UpdateWallet`, {
        numOfTickets:1,
        price:state?.TotalPrice,
        conversionRate:1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("refunded to your wallet successfully");

      // Add a 5-second delay before reloading the page
    setTimeout(() => {
      
    }, 100); // 5000 ms = 5 seconds
    } catch (error) {
      console.error('Failed to cancel Activity booking:', error.response ? error.response.data : error.message);
      alert(`An error occurred while canceling the booking. Details: ${error.message},${error.response.data.message}`);
    }
  }
};

const conversionRate = localStorage.getItem("conversionRate") || 1;
const currencyCode = localStorage.getItem("currencyCode") || "USD";
  return (
    <OrderDetailScreenWrapper className="page-py-spacing">
      <TouristNB />
      <Container style={{marginLeft:"-10px"}}>
      
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <UserDashboardWrapper>
          <DetailMenu type="book" />
          <UserContent style={{marginLeft:"90px"}}>
          
            <div className="flex items-center justify-start btn-and-title-wrapper">
              <Link
                to="/book"
                className="btn-go-back inline-flex items-center justify-center text-xxl"
              >
                <i className="bi bi-chevron-left"></i>
              </Link>
              <Fab color="#ff4d4d" size="medium" onClick={()=>navigate(`/Tourist/book/${type}`)} sx={{color: '#ff4d4d',marginLeft:"0px"}} style={{marginLeft:"-70px",marginRight:"20px",marginTop:"-10px"}}>
        <IconChevronLeft width={24}  />
      </Fab>
              <Title titleText={"Booking Details"} />
            </div>

            { <div className="order-d-wrapper">
              <div
  className="order-details-card"
  style={{
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "2px 2px",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Inter', sans-serif",
    marginBottom: "20px",
    margin: "2 auto",
    position: "relative",
    backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #ff4d4d, #126782)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    border: "2px solid transparent", // Narrow border size
  }}
>
  {/* Top Section */}
  <div
    className="order-d-top flex justify-between items-start"
    style={{
      borderBottom: "1px solid #ececec",
      paddingBottom: "15px",
      marginBottom: "15px",
      marginLeft:"1px"
    }}
  >
    <div className="order-d-top-l">
      
      <h4
        className="text-xl order-d-no"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#126782",
          marginBottom: "8px",
        }}
      >
        #{state?.ActivityId?.title}{state?.ItineraryId?.title} {state?.hotelData?.hotelName}
        {state?.flightData?.airlineName}{state?.TransportationId?.carType} {state?.TransportationId?.plateNumber}
      </h4>
      <p
        className="text-lg font-medium text-gray"
        style={{
          fontSize: "16px",
          color: "#126782",
          marginBottom: "0",
        }}
      >
        Total : {currencyFormat(state?.TotalPrice ||0)}
      </p>
    </div>
    
  </div>

  {/* Shipping Address */}
  <div className="shipping-address" style={{ marginBottom: "20px" ,marginLeft:"20px"}}>
    <h5
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#126782",
        marginBottom: "10px",
      }}
    >
       Address
    </h5>
    <div
      className="address-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: "10px",
        columnGap: "20px",
      }}
    >
      <div>
        <span
          style={{
            fontWeight: "600",
            color: "#333333",
            marginBottom: "4px",
            display: "block",
          }}
        >
         
        </span>
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {state?.ActivityId?.discription} {state?. ItineraryId?.pick_up}
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: "600",
            color: "#333333",
            marginBottom: "4px",
            display: "block",
          }}
        >
         
        </span>
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {order?.ActivityId?.shippingAddress?.city} {order?. ItineraryId?.shippingAddress?.city}
          {state?.TransportationId?.departureLocation?.discription}{state?. ItineraryId?.drop_off}
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: "600",
            color: "#333333",
            marginBottom: "4px",
            display: "block",
          }}
        >
          
        </span>
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {state?.ActivityId?.shippingAddress?.state}{order?. ItineraryId?.shippingAddress?.state}
          {state?.TransportationId?.arrivalLocation?.discription}{state?. ItineraryId?.language}
         
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: "600",
            color: "#333333",
            marginBottom: "4px",
            display: "block",
          }}
        >
          
        </span>
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {order?.shippingAddress?.postalCode} {state?.hotelData?.offer?.room?.typeEstimated?.beds} {state?.hotelData?.offer?.room?.typeEstimated?.bedType}
        </span>
      </div>
      <div>
        <span
          style={{
            fontWeight: "600",
            color: "#333333",
            marginBottom: "4px",
            display: "block",
          }}
        >
          
        </span>
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {state?.ActivityId?.shippingAddress?.country} {order?. ItineraryId?.shippingAddress?.country}
          {state?.hotelData?.offer?.room?.typeEstimated?.category}
        </span>
      </div>
      <div
  className="segments-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "10px",
  }}
>
{state?.flightData?.segments?.length > 0 ? (
  state?.flightData?.segments.map((segment, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "left", 
        
        marginBottom: "20px" ,marginLeft:"-460px",// Ensures left alignment
        display: "flex",   // Aligns items inside flexibly
        flexDirection: "column",
       alignSelf: "flex-start", // Align the segments grid to the start of the parent container
       // Aligns content to the top
      }}
    >
      <div>
        <span style={{ fontWeight: "600", color: "#333333" }}>Departure:</span>{" "}
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {segment.departure.airport || "N/A"} at {segment.departure.time || "N/A"}
        </span>
      </div>
      <div>
        <span style={{ fontWeight: "600", color: "#333333" }}>Arrival:</span>{" "}
        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
          {segment.arrival.airport || "N/A"} at {segment.arrival.time || "N/A"}
        </span>
      </div>
    </div>
  ))
) : (
  " "
)}

</div>

    </div>
  </div>


  {/* Additional Information */}
  <div
    className="order-additional-info"
    style={{
      borderTop: "1px solid #ececec",
      paddingTop: "10px",
      marginBottom:"5px",
      marginLeft:"20px",
      fontSize: "14px",
      color: "#6d6d6d",
    }}
  >
    <p>
      For questions about your order, please contact{" "}
      <span style={{ fontWeight: "600", color: "#126782" }}>
        abdelrahman.zakzouk@gmail.com
      </span>
      .
    </p>
  </div>
</div>

{ <OrderDetailMessageWrapper className="order-message flex items-center justify-start" style={{marginLeft:`${message}px`}}>
                <p className="font-semibold text-gray" style={{marginTop:"-10px",marginLeft:"-8px"}}>
                   Your Ticket on the TimeLine
                  
                </p>
              </OrderDetailMessageWrapper>}
              {!done && <OrderDetailStatusWrapper className="order-d-status" style={{marginBottom:"10px"}}>
                <div className="order-status bg-silver">
                  <div className="order-status-dot status-done bg-silver" style={{marginTop:"-12px",marginLeft:"-2.5px"}}>
                    <span className="order-status-text font-semibold text-center no-wrap text-silver">
                      Ticked booked
                    </span>
                  </div>
                  <div className={`order-status-dot status${timeDifference >= 48?"-current":"-done"} bg-silver`} style={{marginTop:"-12px",marginBottom:"10px"}}>
                    <span className="order-status-text font-semibold text-center no-wrap text-silver">
                      you  can cancel
                    </span>
                  </div>
                  <div className={`order-status-dot status${timeDifference <= 48?"-current":"-done"} bg-silver`} style={{marginTop:"-12px"}}>
                    <span className="order-status-text font-semibold text-center no-wrap text-silver">
                      you can't cancel
                    </span>
                  </div>
\
                </div>
              </OrderDetailStatusWrapper>}
             

              
                {
                  
                    <OrderDetailListWrapper className="order-d-list" style={{marginLeft:"190px",marginTop:"30px"}}>
                    <div
                    className="order-d-item"
                    key={state?.ActivityId}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px auto auto",
                      gap: "20px",
                      alignItems: "center",
                      background: "linear-gradient(135deg, #ff4d4d, #126782)",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: "24px",
                      color: "#ffffff",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                      fontFamily: "'Inter', sans-serif",
                      maxWidth: "600px", // Maximum width for the card
                      margin: "0 auto", // Center the card within its parent
                    }}
                  >
                    {/* Product Image */}
                    <div
                      className="order-d-item-img"
                      style={{
                        width: "100%",
                        height: "120px",
                        overflow: "hidden",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <img
                        src={folderPics+""+state?.ActivityId}
                        alt={state?.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  
                    {/* Product Details */}
                    <div
                      className="order-d-item-info"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {/* Product Name */}
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          margin: 0,
                        }}
                      >
                        {state?.ActivityId?.title}{state?.ItineraryId?.title}
                        {state?.hotelData?.hotelName} {state?.flightData?.airlineName}
                        {state?.TransportationId?.carType} {state?.TransportationId?.plateNumber}
                      </p>
                  
                      {/* Product Attributes */}
                      <p
                        style={{
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Price:</span> {state?.ActivityId?.price ||state?. ItineraryId?.price ||state?.hotelData?.offer?.price?.total||state?.flightData?.price?.total|| state?.TransportationId?.price||"N/A"}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>Qty:</span> {state?.NumberOfTickets}
                      </p>
                    </div>
                  
                    {/* Price Section */}
                    <div
                      className="order-d-item-price"
                      style={{
                        textAlign: "right",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#ffffff",
                          margin: 0,
                        }}
                      >
                        {currencyFormat(state?.TotalPrice ||0)}
                      </p>
                    </div>
                  </div>
                  
                  


                  </OrderDetailListWrapper>      
                 
               }
             
              
             <div style={{ marginTop: "50px", marginLeft: "800px", marginBottom: "100px" }}>
  {!done && (
    <BaseLinkGreen
      // to={"/Tourist/orders"}
      style={{
        backgroundColor: state.Status === false || timeDifference < 48
          ? "#e0e0e0" // Gray background for disabled button
          : "linear-gradient(135deg, #ff4d4d, #126782)",
        borderColor: state.Status === false || timeDifference < 48
          ? "#b0b0b0" // Gray border for disabled button
          : "linear-gradient(135deg, #ff4d4d, #126782)",
        color: state.Status === false || timeDifference < 48
          ? "#808080" // Gray text for disabled button
          : "white",
        textDecoration: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        fontSize: "14px",
        width: "130px",
        fontWeight: "500",
        transition: "all 0.3s ease",
        cursor: state.Status === false || timeDifference < 48
          ? "not-allowed" // Prevent interaction
          : "pointer", // Enable interaction
      }}
      onClick={
        state.Status === false || timeDifference < 48
          ? null // Disable action when button is disabled
          : handleCancel
      }
    >
      Cancel Order
    </BaseLinkGreen>
  )}
</div>

            </div>}
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderDetailScreenWrapper>
  );
};

export default BookDetails;
