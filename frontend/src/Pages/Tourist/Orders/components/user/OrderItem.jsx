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
const OrderItem = ({ order }) => {
  const [ord,setOrder] = useState(false)
  const navigate = useNavigate()
  console.log(order)
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
  let status="cancelled";
  const now = new Date();
  const deliveryDate = new Date(order.deliveryDate);
  
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = deliveryDate - now;
  // Convert milliseconds to days
const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
if(!order.isCancelled){
if(differenceInDays<1)
  status = "delivered"
else
   if(differenceInDays<3)
    status="shipped"
else
  if(differenceInDays<7)
    status="pending"
}
console.log(differenceInDays)
localStorage.setItem("orderStatus",order.state) 
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
    Order no: #{order._id}
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
        Order Date
            </span>
      <span
        className="value"
        style={{
          fontSize: '14px',
          color: '#6d6d6d',
        }}
      >
        {new Date(order.createdAt).toLocaleDateString()}
      </span>
    </div>

    {/* Order Status */}
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
        Order Status
      </span>
      <span
        className={`value status-${!order.isCancelled?status:order.state.toLowerCase()}`}
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color:
            order.state === 'shipped'
              ? '#126782'
              : order.state === 'delivered'
              ? `#5cb85c`
              :order.state === 'processing'
              ? `${defaultTheme.color_dim_gray}`
              : '#ff4d4d',
        }}
      >
        {!order.isCancelled?status:order.state}
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
         Delivery Date
      </span>
      <span
        className="value"
        style={{
          fontSize: '14px',
          color: '#6d6d6d',
        }}
      >
        {new Date(order.deliveryDate).toLocaleDateString()}
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
        Wallet
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
    <BaseLinkGreen
    to={!order.isCancelled && "/Tourist/order_detail/"+order._id}
    style={{
      backgroundColor: !order.isCancelled ? 'linear-gradient(90deg, #ff4d4d 50%, #126782 50%)' : '#f0f0f0', // Fix for conditional background
      borderColor: '#ff4d4d',
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      ...(order.isCancelled && { 
        backgroundColor: '#f0f0f0',  // Disabled background color
        color: '#c0c0c0',  // Disabled text color
        borderColor: '#dcdcdc',  // Disabled border color
        cursor: 'not-allowed'  // Change cursor to not-allowed
      })
    }}
    
      className="btn" disabled
     // onMouseOver={(e) => (e.target.style.backgroundColor = '#ff4d4d')}
     // onMouseOut={(e) => (e.target.style.backgroundColor = '#126782')}
  //  onClick={()=>{navigate(`/order_detail/${order._id}`)}}
   >
      View Details
    </BaseLinkGreen>
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

export default OrderItem;

OrderItem.propTypes = {
  order: PropTypes.object,
};