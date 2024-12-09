import TouristNB from "../components/TouristNavBar";
import { BaseLinkGreen } from "./styles/button";
import styled from "styled-components";
import { Container } from "./styles/styles";

import { UserContent, UserDashboardWrapper } from "./styles/user";
import UserMenu from "./components/user/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { IconChevronLeft } from "@tabler/icons-react";
import Title from "./components/common/Title";
import axios from "axios";
import { Modal } from "@mui/material";
import { currencyFormat } from "./utils/helper";
import { Button } from "@mui/material";
import { breakpoints, defaultTheme } from "./styles/themes/default";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "./components/user/OrderItem";
//import { Navigate } from "react-router-dom";
import DetailMenu from "./components/user/DetailMenu";
import RateReviewIcon from "@mui/icons-material/RateReview";
import IconButton from "@mui/material/IconButton";
import ProductReviewForm from "../components/ProductReviewForm";

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
  background: linear-gradient(
    135deg,
    #ff4d4d,
    #126782
  ); /* Apply gradient background */
  max-width: 165px;
  margin-right: auto;

  margin-left: auto;
  min-height: 30px;
  max-height: 40px;
  padding: 16px 20px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;
  margin-bottom: -15px;
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
    background: linear-gradient(
      135deg,
      #ff4d4d,
      #126782
    ); /* Reverse gradient on hover */
    transition: background 0.3s ease;
  }
`;
const OrderDetailMessageWrapper2 = styled.div`
  background: linear-gradient(
    135deg,
    #ff4d4d,
    #126782
  ); /* Apply gradient background */
  max-width: 130px;
  margin-right: auto;

  margin-left: auto;
  min-height: 30px;
  max-height: 40px;
  padding: 16px 20px;
  border-radius: 8px;
  position: relative;
  margin-top: 30px;
  margin-bottom: -15px;
  color: #ffffff; /* Ensure text color contrasts with the background */
  font-weight: 500; /* Add modern font styling */
  text-align: center; /* Center align the text */

  @media (max-width: ${breakpoints.sm}) {
    margin-top: 10px;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      #ff4d4d,
      #126782
    ); /* Reverse gradient on hover */
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
  { label: "Order Details", link: "/order_detail" },
];

const OrderDetailScreen = () => {
  const navigate = useNavigate();
  //const {ord} = useContext(OrderContext)
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const [reviewForm, setReviewForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleReviewClick = (productId) => {
    setSelectedProductId(productId); // Set the product ID for which the modal is open
  };

  const handleClose = () => {
    setSelectedProductId(null); // Reset the state when modal closes
  };
  useEffect(() => {
    const fetchTitles = async () => {
      const token = localStorage.getItem("jwt"); // Get the token from local storage
      const userId = localStorage.getItem("id"); // Get user ID if needed
      console.log(userId);
      console.log(token);
      //const revenue =null;
      try {
        const response = await fetch(
          `http://localhost:4000/cariGo/cart/order/${id}`,
          {
            method: "GET", // Change this to "POST" if your backend expects it
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          }
        );

        // console.log(Request.json())

        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json().catch((err) => {
          console.error("Error parsing JSON:", err);
          throw new Error("Invalid JSON response");
        });
        // setRevenue(json.Revenue);
        console.log("Fetched Titles:", json.products);
        setOrder(json);

        setProducts(json.products);
        //  setTitles(json.activityTitles)
        //setEvents(json.report); // Set activities if response is okay
        //  if(revenue)
        //onHandleRev(json.Revenue)
      } catch (error) {
        console.log("Error fetching activities:", error);
      }
    };
    fetchTitles();
    console.log(order ? order.state : "null");
  }, []);
  let message;
  const [done, setDone] = useState(false);
  switch (order?.state) {
    case "processing":
      message = 317;
      break;
    case "shipped":
      message = 511;
      break;
    case "delivered":
      message = 693;
      break;
    default:
      message = 168;
  }
  const folderPics = `http://localhost:4000/public/img/products/`;
  const handleCancel = async () => {
    const cancelOrder = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (cancelOrder) {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.patch(
          `/cariGo/cart/Cancel`,
          {
            OrderId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert("Order canceled successfully");

        const rate =
          parseFloat(JSON.parse(localStorage.getItem("conversionRate"))) || 1;
        console.log(rate);
        await axios.patch(
          `/cariGo/users/UpdateWallet`,
          {
            numOfTickets: 1,
            price: order.totalPrice,
            conversionRate: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("refunded to your wallet successfully");
        // Add a 5-second delay before reloading the page
        setDone(true);
        // useEffect(() => {
        const timer = setTimeout(() => {
          window.location.href = "/Tourist/orders"; // Navigate to the desired page
        }, 2000); // 2 seconds

        //   return () => clearTimeout(timer); // Cleanup the timer on unmount
        // }, []);

        //navigate('/ord')
      } catch (error) {
        console.error(
          "Failed to cancel Activity booking:",
          error.response ? error.response.data : error.message
        );
        alert(
          `An error occurred while canceling the booking. Details: ${error.message},${error.response.data.message}`
        );
      }
    }
  };

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const currencyCode = localStorage.getItem("currencyCode") || "USD";
  return (
    <OrderDetailScreenWrapper className="page-py-spacing">
      <TouristNB />
      <Container style={{ marginLeft: "-10px" }}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <UserDashboardWrapper>
          <DetailMenu />
          <UserContent style={{ marginLeft: "90px" }}>
            <div className="flex items-center justify-start btn-and-title-wrapper">
              <Link
                to="/order"
                className="btn-go-back inline-flex items-center justify-center text-xxl"
              >
                <i className="bi bi-chevron-left"></i>
              </Link>
              <Fab
                color="#ff4d4d"
                size="medium"
                onClick={() => navigate("/Tourist/orders")}
                sx={{ color: "#ff4d4d", marginLeft: "0px" }}
                style={{
                  marginLeft: "-70px",
                  marginRight: "20px",
                  marginTop: "-10px",
                }}
              >
                <IconChevronLeft width={24} />
              </Fab>
              <Title titleText={"Order Details"} />
            </div>

            {order && (
              <div className="order-d-wrapper">
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
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(135deg, #ff4d4d, #126782)",
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
                      marginLeft: "1px",
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
                        Order no: #{order._id}
                      </h4>
                      <p
                        className="text-lg font-medium text-gray"
                        style={{
                          fontSize: "16px",
                          color: "#126782",
                          marginBottom: "0",
                        }}
                      >
                        Total : {currencyFormat(order.totalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div
                    className="shipping-address"
                    style={{ marginBottom: "20px", marginLeft: "20px" }}
                  >
                    <h5
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#126782",
                        marginBottom: "10px",
                      }}
                    >
                      Shipping Address
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
                          Street:
                        </span>
                        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
                          {order.shippingAddress.street}
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
                          City:
                        </span>
                        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
                          {order.shippingAddress.city}
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
                          State:
                        </span>
                        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
                          {order.shippingAddress.state}
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
                          Postal Code:
                        </span>
                        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
                          {order.shippingAddress.postalCode}
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
                          Country:
                        </span>
                        <span style={{ fontSize: "14px", color: "#6d6d6d" }}>
                          {order.shippingAddress.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div
                    className="order-additional-info"
                    style={{
                      borderTop: "1px solid #ececec",
                      paddingTop: "10px",
                      marginBottom: "5px",
                      marginLeft: "20px",
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

                {!done && (
                  <OrderDetailMessageWrapper
                    className="order-message flex items-center justify-start"
                    style={{ marginLeft: `${message}px` }}
                  >
                    <p
                      className="font-semibold text-gray"
                      style={{ marginTop: "-10px", marginLeft: "-8px" }}
                    >
                      Your Order is here
                    </p>
                  </OrderDetailMessageWrapper>
                )}
                {!done && (
                  <OrderDetailStatusWrapper
                    className="order-d-status"
                    style={{ marginBottom: "10px" }}
                  >
                    <div className="order-status bg-silver">
                      <div
                        className="order-status-dot status-done bg-silver"
                        style={{ marginTop: "-12px", marginLeft: "-2.5px" }}
                      >
                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                          Order Placed
                        </span>
                      </div>
                      <div
                        className={`order-status-dot status${
                          order.state === "processing" ? "-current" : "-done"
                        } bg-silver`}
                        style={{ marginTop: "-12px", marginBottom: "10px" }}
                      >
                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                          In Progress
                        </span>
                      </div>
                      <div
                        className={`order-status-dot status${
                          order.state === "shipped" ? "-current" : "-done"
                        } bg-silver`}
                        style={{ marginTop: "-12px" }}
                      >
                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                          Shipped
                        </span>
                      </div>
                      <div
                        className={`order-status-dot status${
                          order.state === "delivered" ? "-current" : ""
                        } bg-silver`}
                        style={{ marginRight: "-2px", marginTop: "-12px" }}
                      >
                        <span className="order-status-text font-semibold text-center no-wrap text-silver">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </OrderDetailStatusWrapper>
                )}

                {products?.map((item) => {
                  return (
                    <OrderDetailListWrapper
                      className="order-d-list"
                      style={{ marginLeft: "190px", marginTop: "30px" }}
                    >
                      <div
                        className="order-d-item"
                        key={item.productId}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "120px auto auto",
                          gap: "20px",
                          alignItems: "center",
                          background:
                            "linear-gradient(135deg, #ff4d4d, #126782)",
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
                            src={folderPics + "" + item.productId.mainImage}
                            alt={item.name}
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
                            {item.productId.name}
                          </p>

                          {/* Product Attributes */}
                          <p
                            style={{
                              fontSize: "14px",
                              margin: 0,
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>Price:</span>{" "}
                            {item.productId.price || "N/A"}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              margin: 0,
                            }}
                          >
                            <span style={{ fontWeight: "600" }}>Qty:</span>{" "}
                            {item.quantity}
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
                            {currencyFormat(item.totalPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Review Icon */}
                      <IconButton
                        onClick={() => handleReviewClick(item.productId._id)}
                        sx={{ color: "#ff4d4d" }}
                      >
                        <RateReviewIcon />
                      </IconButton>
                    </OrderDetailListWrapper>
                  );
                })}

                {/* Review Form Modal */}
                <Modal open={!!selectedProductId} onClose={handleClose}>
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      maxWidth: "600px",
                      margin: "50px auto",
                    }}
                  >
                    {selectedProductId && (
                      <ProductReviewForm
                        id={selectedProductId} // Pass the selected product ID to the review form
                        open={!!selectedProductId}
                        onClose={handleClose} // Close the modal after submission
                      />
                    )}
                  </div>
                </Modal>
                <div
                  style={{
                    marginTop: "50px",
                    marginLeft: "800px",
                    marginBottom: "100px",
                  }}
                >
                  {(!done && order.state!=="delivered") && (
                    <BaseLinkGreen
                      // to={"/Tourist/orders"}
                      style={{
                        backgroundColor:
                          "linear-gradient(135deg, #ff4d4d, #126782)",
                        borderColor:
                          "linear-gradient(135deg, #ff4d4d, #126782)",

                        color: "white",
                        textDecoration: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        width: "130px",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                      // onMouseOut={(e) => (e.target.style.backgroundColor = '#126782')}
                      onClick={handleCancel}
                    >
                      Cancel Order
                    </BaseLinkGreen>
                  )}
                </div>
              </div>
            )}
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderDetailScreenWrapper>
  );
};

export default OrderDetailScreen;
