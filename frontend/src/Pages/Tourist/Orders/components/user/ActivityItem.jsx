import styled from "styled-components";
import PropTypes from "prop-types";
import { currencyFormat } from "../../utils/helper";
import { BaseLinkGreen } from "../../styles/button";
import { BaseLinkGreen1 } from "../../styles/button";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { createContext, useContext, useState } from "react";

import "../../../../../styles/App.css"
import { useNavigate } from "react-router-dom";
const OrderItemWrapper = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${defaultTheme.color_anti_flash_white};

  .order-item-title {
    margin-bottom: 12px;
  }

  .order-item-details {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 24px 32px;
    border-radius: 8px;

    @media (max-width: ${breakpoints.sm}) {
      padding: 20px 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      padding: 12px 16px;
    }
  }

  .order-info-group {
    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .order-info-item {
    width: 50%;

    span {
      &:nth-child(2) {
        margin-left: 4px;
      }
    }

    &:nth-child(even) {
      text-align: right;
      @media (max-width: ${breakpoints.lg}) {
        text-align: left;
      }
    }

    @media (max-width: ${breakpoints.sm}) {
      width: 100%;
      margin: 2px 0;
    }
  }

  .order-overview {
    margin: 28px 0;
    gap: 12px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 20px 0;
    }

    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
    }

    &-img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      overflow: hidden;
    }

    &-content {
      grid-template-columns: 100px auto;
      gap: 18px;
    }

    &-info {
      ul {
        span {
          &:nth-child(2) {
            margin-left: 4px;
          }
        }
      }
    }
  }
`;
export const OrderContext = createContext();

const ActivityItem = ({ order ,type}) => {
  const [ord,setOrder] = useState(false)
  const navigate = useNavigate()
  console.log(order)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
};

  const handleNavigation = () => {
    if (!order.isCancelled) {
      navigate(`/Tourist/details/${order._id}/${type}`, { state: order });
    }
  };
   const styles = {
    orderItemDetails: () => ({
      backgroundColor: '#f9f9f9',
      border: '1px solid #ececec',
      borderRadius: '8px',
      padding: '20px 30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      fontFamily: "'Inter', sans-serif",
    }),
  
    orderItemTitle: () => ({
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#126782',
      marginBottom: '20px',
    }),
  
    orderInfoGroup: () => ({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '20px',
    }),
  
    orderInfoItem: () => ({
      flex: 1,
      minWidth: '200px',
    }),
  
    label: () => ({
      display: 'block',
      fontWeight: '600',
      color: '#333333',
      marginBottom: '4px',
    }),
  
    value: () => ({
      fontSize: '14px',
      color: '#6d6d6d',
    }),
  
    valueStatus: (status) => {
      switch (status) {
        case 'shipped':
          return { color: '#126782' };
        case 'delivered':
          return { color: '#7ad005' };
        case 'cancelled':
          return { color: '#ff4d4d' };
        default:
          return {};
      }
    },
  
    orderActions: () => ({
      textAlign: 'right',
    }),
  
    orderActionsLink: () => ({
      backgroundColor: '#126782',
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    }),
  
    orderActionsLinkHover: () => ({
      backgroundColor: '#ff4d4d',
      color: 'white',
    }),
  };
  
//localStorage.setItem("orderStatus",order.state) 
return (
    <OrderItemWrapper>
      {/* <h3>{order.products[0].productId._id}</h3> */}
      <div
  className="order-item-details"
  style={{
    backgroundColor: '#f9f9f9',
    border: '1px solid #ececec',
    borderRadius: '8px',
    padding: '20px 30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    fontFamily: "'Inter', sans-serif",
  }}
>
  {/* Title */}
  <h3
    className="order-item-title"
    style={{
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#126782',
      marginBottom: '20px',
      textAlign: 'center',
    }}
  >
     {order?.ActivityId?.title} {order?. ItineraryId?.title}{order?. hotelData?.
hotelName} {order?.flightData?.airlineName} {order?.TransportationId?.carType}
{ formatDate(order?.TransportationId?.date)}
  </h3>

  {/* Information Group */}
  <div
    className="order-info-group"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '20px',
    }}
  >
    {/* Order Date */}
    <div className="order-info-item" style={{ textAlign: 'center' }}>
      <span
        className="label"
        style={{
          display: 'block',
          fontWeight: '600',
          color: '#333333',
          marginBottom: '4px',
        }}
      >
         from
            </span>
      <span
        className="value"
        style={{
          fontSize: '14px',
          color: '#6d6d6d',
        }}
      >
          {formatDate(order?.ActivityId?.start_date)} 
          {formatDate(order?.ItineraryId?.start_date)}
          {formatDate(order?.hotelData?.offer?.checkInDate)} 
          {formatDate(order?.flightData?.segments[0]?.departure?.time)} 
          {order?.TransportationId?.departureTime?.hours} :
          {order?.TransportationId?.departureTime?.minutes} :
          {order?.TransportationId?.departureTime?.dayTime}
      </span>
    </div>



    {/* Delivery Date */}
    <div className="order-info-item" style={{ textAlign: 'center' ,marginLeft:"100px"}}>
      <span
        className="label"
        style={{
          display: 'block',
          fontWeight: '600',
          color: '#333333',
          marginBottom: '4px',
        }}
      >
         to
      </span>
      <span
        className="value"
        style={{
          fontSize: '14px',
          color: '#6d6d6d',
        }}
      >
          {formatDate(order?.ActivityId?.end_date)} 
          {formatDate(order?.ItineraryId?.end_date)}
          {formatDate(order?.hotelData?.offer?.checkOutDate)} 
          {formatDate(order?.flightData?.segments[0]?.arrival.time)} 
          {order?.TransportationId?.arrivalTime?.hours} :
          {order?.TransportationId?.arrivalTime?.minutes} :
          {order?.TransportationId?.arrivalTime?.dayTime}
      </span>
    </div>

    {/* Payment Method */}
    <div className="order-info-item" style={{ textAlign: 'center' ,marginLeft:"100px"}}>
      <span
        className="label"
        style={{
          display: 'block',
          fontWeight: '600',
          color: '#333333',
          marginBottom: '4px',
        }}
      >
        Method
      </span>
      <span
        className="value"
        style={{
          fontSize: '14px',
          color: '#6d6d6d',
        }}
      >
        {order.PaymentMethod}
      </span>
    </div>
  </div>

  {/* View Details Button */}
  <div
  className="order-actions"
  style={{
    textAlign: 'center',
    marginTop: '20px',
  }}
>
<div
  onClick={() => {
    if (!order.isCancelled) {
      navigate(`/Tourist/details/${order._id}/${type}`, { state: order });
    }
  }}
  style={{
    backgroundColor: !order.isCancelled
      ? '#ff4d4d' // Updated color for active button
      : '#e0e0e0', // Light gray for disabled
    borderColor: !order.isCancelled ? '#ff4d4d' : '#b0b0b0', // Match border to button color
    color: !order.isCancelled ? '#ffffff' : '#808080', // White for active, gray for disabled text
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px', // Slightly larger font size
    fontWeight: '600', // Slightly bolder text
    transition: 'all 0.3s ease',
    cursor: !order.isCancelled ? 'pointer' : 'not-allowed', // Pointer for active, not-allowed for disabled
    display: 'inline-block',
    textAlign: 'center',
    boxShadow: !order.isCancelled
      ? '0 4px 6px rgba(0, 0, 0, 0.1)' // Add a subtle shadow for depth
      : 'none', // No shadow for disabled
  }}
  className="btn"
>
  View Details
</div>

</div>


</div>


      {/* <div className="order-overview flex justify-between">
        <div className="order-overview-content grid">
          <div className="order-overview-img" style={{marginTop:"30px"}}>
            <img
              src={staticImages.brand1}
              alt=""
              className="object-fit-cover"
            />
          </div>
          <div className="order-overview-info">
            <h4 className="text-xl">{order.products[0].productId._id}</h4>
            <ul>
              <li className="font-semibold text-base">
                <span>Colour:</span>
                <span className="text-silver">{"red"}</span>
              </li>
              <li className="font-semibold text-base">
                <span>Qty:</span>
                <span className="text-silver">{order.products[0].quantity}</span>
              </li>
              <li className="font-semibold text-base">
                <span>Total:</span>
                <span className="text-silver">
                  {currencyFormat(order.products[0].totalPrice)}
                </span>
              </li>
            </ul>
           
        <div style={{marginLeft:"699px",marginTop:"10px"}}>
        <BaseLinkGreen1 to="/order_detail">Cancel Order</BaseLinkGreen1>
          </div>
          </div>
        </div>
        
       
      </div>  */}
      

    </OrderItemWrapper>
  );
};

export default ActivityItem;

ActivityItem.propTypes = {
  order: PropTypes.object,
};