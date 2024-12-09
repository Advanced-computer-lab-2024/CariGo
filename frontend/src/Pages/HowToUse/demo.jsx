import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import {
  ChevronDown,
  Search,
  UserCircle,
  Calendar,
  Compass,
  Layout,
  ShoppingCart,
  MessageSquare,
  X,
} from "lucide-react";
import ChangePass from "./image/ChangePass.jpg";
import EditPrefrences from "./image/EditPrefrence.jpg";
import DeleteAcc from "./image/DeleteAcc.jpg";
import BookItin from "./image/BookingIt.gif";
import BookFlight from "./image/BookFlights.gif";
import Orders from "./image/orders.jpg";
import CancelBooking from "./image/CancelBooking.gif";
import Notification from "./image/notification.jpg";
import SearchFilter from "./image/Search_Filter.gif";
import ShareLink from "./image/ShareLink.gif";
import BookMarking from "./image/Bookmarkp.jpg";
import WishList from "./image/wishlist.jpg";
import Badge from "./image/badge.jpg";
import ChooseCurrency from "./image/chooseCurrency.jpg";
import CheckOut from "./image/checkout.gif";
import Review from "./image/Review.gif";
import FileComplaint from "./image/Complaints.gif";
import TouristNavBar from "../Tourist/components/TouristNavBar";
import TouristSideBar from "../Tourist/components/TouristSideBar";
import GuestNavBar from "../Tourist/components/GuestNavBar";
import GuestSideBar from "../Tourist/components/GuestSideBar";

const MainSection = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#1a659e]/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#f7e1c6] transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-lg font-medium text-[#004e89]">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#1a659e] transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && <div className="bg-[#f7e1c6]">{children}</div>}
    </div>
  );
};

const SubSection = ({ title, content, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="border-t border-[#1a659e]/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 pl-12 flex items-center justify-between hover:bg-[#f7e1c6]/50 transition-colors text-[#004e89]"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#1a659e] transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && <div className="p-4 pl-12 bg-white/50">{content}</div>}
    </div>
  );
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = {
    account: {
      title: "Account Management",
      icon: <UserCircle className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Change Password",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To change your password:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to your account settings</li>
                <li>Click on "Change Password"</li>
                <li>Enter your userName and current password</li>
                <li>Enter your new password</li>
                <li>Confirm your new password</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={ChangePass}
                  alt="Booking Process"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Edit Preferences",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">
                To Edit your Prefrences that form your suggested page:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to your account settings</li>
                <li>Click on "Edit Prefrences"</li>
                <li>Pick your Prefrences</li>
                <li>Save them</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={EditPrefrences}
                  alt="Booking Process"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Delete Account",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">
                To Permenentaly Delete your Account:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to your account settings</li>
                <li>Click on "Delete Account"</li>
                <li>Confirm that you want to delete your account</li>
                <li>Be ware, this action is irreversable!</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src={DeleteAcc} alt="Booking Process" className="w-full" />
              </div>
            </div>
          ),
        },
      ],
    },
    bookings: {
      title: "Bookings & Reservations",
      icon: <Calendar className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Book Itinerary/Activity and Use Promo Code",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">
                To make a booking and apply a promo code:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Select your desired Itinerary or activity</li>
                <li>Click "Book Now"</li>
                <li>
                  If you have one, enter your promo code in the designated field
                </li>
                <li>Complete the payment process</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src={BookItin} alt="Booking Process" className="w-full" />
              </div>
            </div>
          ),
        },
        {
          title: "Book Flights/Hotels/Transportation",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To book a service:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to "Book Services" then "Planes"</li>
                <li>Select your Departure & Destination</li>
                <li>fill the rest of the needed information</li>
                <li>Search for flight and View Flight Details</li>
                <li>Book Flight</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={BookFlight}
                  alt="Booking Process"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
        {
          title: "See My Bookings & Orders",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">View Your Bookings and orders:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>
                  In the SideBar ,go to "Help&Support" &rarr; "My Bookings" and
                  choose the booked intity type you want
                </li>
                <li>
                  To Get Orders, simply click on the shopping Bag Icon in your
                  Profile
                </li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src={Orders} alt="Booking Process" className="w-full" />
              </div>
            </div>
          ),
        },
        {
          title: "Cancel Booking",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To Cancel an order:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>
                  Go to your Bookings and simply click cancel on the intity you
                  want to cancel
                </li>
                <li>
                  Confirm, But be ware you will not get your money refunded if
                  canceling after 48 hours
                </li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={CancelBooking}
                  alt="Booking Process"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
      ],
    },
    search: {
      title: "Search & Discovery",
      icon: <Compass className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "How to Search & Filter for Itineraries",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Searching and Applying Filters:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Searching is straightForward</li>
                <li>To filter , choose from the options</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SearchFilter}
                  alt="Notifications"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
      ],
    },
    features: {
      title: "Features & Tools",
      icon: <Layout className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Share Link",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">
                To Share any Itinerary / Activity / Historical Place / Product:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>click on the share icon on them</li>
                <li>share the link</li>
                <li>you can also share it through social media</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src={ShareLink} alt="Notifications" className="w-full" />
              </div>
            </div>
          ),
        },
        {
          title: "Add Products To Wishlist",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Adding Product to your WishList:</p>
              <div className="rounded-lg overflow-hidden">
                <img src={WishList} alt="Notifications" className="w-full" />
              </div>
            </div>
          ),
        },
        {
          title: "Bookmarking",
          content: (
            <div className="space-y-4">
              {/* <p className="text-[#1a659e]"></p> */}
              <div className="rounded-lg overflow-hidden">
                <img src={BookMarking} alt="Notifications" className="w-full" />
              </div>
            </div>
          ),
        },
        {
          title: "Notifications",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Your Recieve Notifications for:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>
                  Reminders of your upcoming booked Itineraries and Activities
                </li>
                <li>Your Birthday Promo Code</li>
                <li>
                  Events you requested to be notified of when they open booking
                </li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={Notification}
                  alt="Notifications"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Badges and Loyalty Points",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Just click on your Badge:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Bronze gets x1 loyalty points</li>
                <li>Silver gets x2 loyalty points</li>
                <li>Gold gets x3 loyalty points</li>
                <li>You can exchange lyalty points for money on your wallet</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={Badge}
                  alt="Badge and loyalty points"
                  className="w-full"
                />
              </div>
            </div>
          ),
        },
        {
          title: "Choose Currency",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">Change Website's Currency:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>
                  In the SideBar ,go to "Help&Support" &rarr; "Change Currency"
                  and select your perefered currency
                </li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={ChooseCurrency}
                  alt="Booking Process"
                  className="w-270"
                />
              </div>
            </div>
          ),
        },
      ],
    },
    shopping: {
      title: "Shopping & Checkout",
      icon: <ShoppingCart className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Checkout Cart",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">follow the steps below:</p>
              <div className="rounded-lg overflow-hidden">
                <img src={CheckOut} alt="Booking Process" className="w-270" />
              </div>
            </div>
          ),
        },
      ],
    },
    reviews: {
      title: "Reviews & Feedback",
      icon: <MessageSquare className="w-5 h-5 text-[#ff6b36]" />,
      subsections: [
        {
          title: "Review",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To Review:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>Go to your Bookings</li>
                <li>On your done bookings , you'll be able able to review</li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img src={Review} alt="Booking Process" className="w-270" />
              </div>
            </div>
          ),
        },
        {
          title: "File Complaint",
          content: (
            <div className="space-y-4">
              <p className="text-[#1a659e]">To File a Complaint:</p>
              <ol className="list-decimal list-inside space-y-2 text-[#004e89]">
                <li>
                  In the SideBar ,go to "Help&Support" &rarr; "File Complaints"
                  and add your complaint
                </li>
              </ol>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={FileComplaint}
                  alt="Booking Process"
                  className="w-270"
                />
              </div>
            </div>
          ),
        },
      ],
    },
  };

  const isSubsectionVisible = (subsection) => {
    if (!searchQuery) return true;
    return subsection.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const isSectionVisible = (section) => {
    if (!searchQuery) return true;
    return (
      section.subsections.some((subsection) =>
        subsection.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || section.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [user, setUser] = useState();
  const [tourist, setTourist] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const id = jwtDecode(token).id;

        const response = await axios.get(
          `http://localhost:4000/cariGo/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response Data:", response.data); // Logs the fetched data
        setUser(Object.assign({}, response.data));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#004e89]">
      {!user ? <GuestNavBar /> : <TouristNavBar />}
      {!user ? <GuestSideBar /> : <TouristSideBar />}

      <TouristSideBar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#004e89]">
            How can we help you?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white border border-[#1a659e]/20 focus:outline-none focus:border-[#ff6b36] text-[#004e89] placeholder-[#1a659e]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-[#1a659e]" />
              </button>
            )}
            {!searchQuery && (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1a659e]" />
            )}
          </div>
        </div>

        <div className="space-y-px rounded-lg overflow-hidden border border-[#1a659e]/20 bg-white">
          {Object.values(sections).map(
            (section, index) =>
              isSectionVisible(section) && (
                <MainSection
                  key={index}
                  title={section.title}
                  icon={section.icon}
                >
                  {section.subsections.map((subsection, subIndex) => (
                    <SubSection
                      key={subIndex}
                      title={subsection.title}
                      content={subsection.content}
                      isVisible={isSubsectionVisible(subsection)}
                    />
                  ))}
                </MainSection>
              )
          )}
        </div>
      </div>
    </div>
  );
}
