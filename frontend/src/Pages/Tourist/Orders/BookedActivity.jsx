import styled from "styled-components";
import { Container } from "./styles/styles";

import { UserContent, UserDashboardWrapper } from "./styles/user";
import UserMenu from "./components/user/UserMenu";
import Title from "./components/common/Title";
import { breakpoints, defaultTheme } from "./styles/themes/default";
import { useParams, useNavigate } from "react-router-dom";
import OrderItemList from "./components/user/OrderItemList";
import { useState,useEffect } from "react";
import TouristNB from "../components/TouristNavBar";
import TouristSideBar from "../components/TouristSideBar";
import vedio2 from "./sale.mp4"
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

const BookedActivity = () => {
  const { type } = useParams();
  const [activities, setActivities] = useState([]);
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
  const [tourist,setTourist]=useState(false);
  const handleCancel = () => {
  
    const filteredActivities = activities.filter(activity => activity.Status === false);
   
    setFilteredOrders(filteredActivities);
    setCancelled(true);
    setActive(false);
    setCompleted(false);
  };

  const handleActive = () => {
    const today = new Date();
    const filteredActivities = activities.filter(activity => {
      let activityStartDate;
      if (type=="activity"){
      activityStartDate = new Date(activity?.ActivityId?.start_date);}
      else if (type=="itenerary"){
        activityStartDate = new Date(activity?.ItineraryId?.start_date); 
      }
      else if (type=="hotel"){
        activityStartDate = new Date(activity?.hotelData?.offer?.
          checkInDate); 
      }
      else if (type=="flight"){
        activityStartDate = new Date(activity?.flightData?.segments[0]?.departure?.time);
      }
      else if (type=="transportation"){
        activityStartDate = new Date(activity?.TransportationId?.date);
      }
      return activity.Status === true && activityStartDate >= today;
    });
    setFilteredOrders(filteredActivities);
    setCancelled(false);
    setActive(true);
    setCompleted(false);
  };

  const handleComplete = () => {
    const today = new Date();
    const filteredActivities = activities.filter(activity => {
      let activityStartDate;
      if (type=="activity"){
        activityStartDate = new Date(activity?.ActivityId?.start_date);}
      else if (type=="itenerary"){
          activityStartDate = new Date(activity?.ItineraryId?.start_date); 
        }
      else if (type=="hotel") {
        activityStartDate = new Date(activity?.hotelData?.offer?.checkInDate); 
      }
      else if (type=="flight"){
        activityStartDate = new Date(activity?.flightData?.segments[0]?.departure?.time);
      }
      else if (type=="transportation"){
        activityStartDate = new Date(activity?.TransportationId?.date);
      }
      return activityStartDate < today && activity.Status === true;
    });
    setFilteredOrders(filteredActivities);
    setCancelled(false);
    setActive(false);
    setCompleted(true);
  };

  
  
  useEffect(() => {
    const fetchActivities = async () => {
        // Renamed from fetchItineraries to fetchActivities
        try {
          const token = localStorage.getItem("jwt");
          let response;
          if (type==="activity"){
          response = await fetch(
            `http://localhost:4000/cariGo/activity/MyActivityBookings`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });}
          else if (type==="itenerary"){
           // const token = localStorage.getItem("jwt");
             response = await fetch(
              `http://localhost:4000/Event/MyItineraryBookings`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          }
          else if(type==="hotel"){
             response = await fetch(`http://localhost:4000/cariGo/flights//MyhBookings`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
          else if (type=="flight"){
            response = await fetch(`http://localhost:4000/cariGo/flights//MyfBookings`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
          else if (type=="transportation"){
             response = await fetch(`http://localhost:4000/cariGo/transportation/MyBookings`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          }
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setActivities(json); // Changed from setItineraries to setActivities
          console.log(json);
        } catch (error) {
          console.log("Error fetching activities:", error);
        }
      };
  
      fetchActivities();
    }, []);
  
    useEffect(() => {
      if (activities.length > 0) {
        handleActive(); // Only call handleActive when activities are not empty
      }
    }, [activities]);
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
      <Container style={{marginTop:"75px",marginLeft:"50px"}}>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
        <UserDashboardWrapper>
          <UserMenu type="book"/>
          <UserContent style={{marginLeft:"50px"}}>
            { <Title titleText={"Your Bookings"} />}
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
                    {filteredOrders && <OrderItemList orders = {filteredOrders}  cancelledOnly={cancelled} completed={completed} active={active} type={type}/>}
                </div>
                
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
        
      </Container>
    </OrderListScreenWrapper>
  );
};

export default BookedActivity;