import styled from "styled-components";
import { Container } from "./styles/styles";

import { UserContent, UserDashboardWrapper } from "./styles/user";
import UserMenu from "./components/user/UserMenu";
import Title from "./components/common/Title";
import { breakpoints, defaultTheme } from "./styles/themes/default";

import OrderItemList from "./components/user/OrderItemList";
import { useState,useEffect } from "react";
import TouristNB from "../components/TouristNavBar";
import vedio2 from "./sale.mp4"
import TouristSideBar from "../components/TouristSideBar";
const OrderListScreenWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
    border-top: 1px solid rgba(18, 103, 130, 0.3); /* Subtle separator using primary color */
    padding-top: 16px;
  }

  .order-tabs-head {
    min-width: 170px;
    padding: 12px 16px;
    font-family: ${defaultTheme.font_family_inter};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #126782; /* Primary color for text */
    background-color: #f9f9f9; /* Neutral background to highlight colors */
    position: relative;
    cursor: pointer;
    transition: ${defaultTheme.default_transition};

    /* Remove borders and shadows */
    border: none;
    box-shadow: none;

    /* Minimized breaker (white gap) */
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }

    /* Add stylish bottom border */
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #126782, #ff4d4d); /* Gradient with primary colors */
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease-in-out;
    }

    /* Hover and active states */
    &:hover:after {
      transform: scaleX(1);
    }

    &:hover {
      color: #ff4d4d; /* Secondary primary color on hover */
    }

    &.order-tabs-head-active:after {
      transform: scaleX(1);
      background: linear-gradient(90deg, #ff4d4d, #126782); /* Inverted gradient for active state */
    }

    &.order-tabs-head-active {
      color: #ff4d4d; /* Secondary primary color for active text */
      font-weight: 600;
    }

    @media (max-width: ${breakpoints.lg}) {
      min-width: 120px;
      font-size: 14px;
      margin-right: 3px;
    }

    @media (max-width: ${breakpoints.xs}) {
      min-width: 80px;
      font-size: 12px;
      margin-right: 2px;
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
];

const OrderListScreen = () => {
  const [currentOrders, setCurrentOrders] = useState([]); // Store current orders
  const [pastOrders, setPastOrders] = useState([]); // Store past orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Store filtered orders
  const [filters, setFilters] = useState("all"); // Filter between all, past, or current orders
  const [searchTerm, setSearchTerm] = useState("");
  const [openActivityReviewForm, setOpenActivityReviewForm] = useState(false); // For opening review form
  const [selectedActivityId, setSelectedActivityId] = useState(null); // For selecting the activity to review
  const [data,setData] =useState(null)
  const [cancelled,setCancelled] = useState(false)
  const [active,setActive] = useState(true)
  const [completed,setCompleted] = useState(false)
  const [ord,setOrders] = useState(null)
  const handleCancel= () =>{
    setOrders([...currentOrders,...pastOrders])
    setCancelled(true)
    setActive(false)
    setCompleted(false)
  }
  const handleActive= () =>{
    setOrders(currentOrders)
    setCancelled(false)
    setActive(true)
    setCompleted(false)
  }
  const handleComplete= () =>{
    setOrders(pastOrders)
    setCancelled(false)
    setActive(false)
    setCompleted(true)
  }
  
  
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
        setData(json)
        setOrders([...json.currentOrders, ...json.pastOrders])
        console.log(json)
        // By default, show both past and current orders
        setFilteredOrders([...json.currentOrders, ...json.pastOrders]);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  
  
  //setOrders(active?orders.currentOrders:completed?orders.pastOrders:[...orders.currentOrders, ...orders.pastOrders])
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
    <OrderListScreenWrapper className="page-py-spacing">
      <TouristNB />
      <TouristSideBar />
      <Container style={{marginTop:"70px",marginLeft:"50px"}}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <UserDashboardWrapper>
          <UserMenu type="order"/>
          <UserContent style={{marginLeft:"50px"}}>
            { <Title titleText={"Your Orders"} />}
            <div className="order-tabs">
              <div className="order-tabs-heads">
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic order-tabs-head${active?"-active":""}`}
                  onClick={handleActive}
                  data-id="active"
                >
                  Active
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic order-tabs-head${cancelled?"-active":""}`}
                  data-id="cancelled"
                  onClick={handleCancel}
                >
                  Cancelled
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic order-tabs-head${completed?"-active":""}`}
                  data-id="completed"
                  onClick={handleComplete}
                >
                  Completed
                </button>
              </div>

              <div className="order-tabs-contents">
                <div className="order-tabs-content" id="active">
                    {ord && <OrderItemList orders = {ord}  cancelledOnly={cancelled} completed={completed} active={active} type={'order'}/>}
                </div>
                
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
        
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderListScreen;
