import React, { useState } from "react";
import { HiArrowSmRight, HiUser, HiMenuAlt1 } from "react-icons/hi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttractionsSharpIcon from "@mui/icons-material/AttractionsSharp";
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp";
import MosqueOutlinedIcon from "@mui/icons-material/MosqueOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import LuggageSharpIcon from "@mui/icons-material/LuggageSharp";
import EngineeringSharpIcon from "@mui/icons-material/EngineeringSharp";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import CurrencyConversion from "../../../components/CurrencyConversion";
import { useNavigate } from "react-router-dom";
import { Typography, ListItemButton, Divider, List } from "@mui/material";
import { useLocation } from "react-router-dom";
import { LogoutIcon } from "@heroicons/react/solid";
import { LogOutIcon } from "lucide-react";
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
export default function Side() {
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [linksExpanded, setLinksExpanded] = useState(false);
  const [openCurrencyDialog, setOpenCurrencyDialog] = React.useState(false); // State for dialog
  const [anchorElBookings, setAnchorElBookings] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const uncollapsedRoutes = ["/Tourist"];
  const [collapsed, setCollapsed] = useState(
    !uncollapsedRoutes.includes(location.pathname)
  );
  const [productsExpanded, setProductsExpanded] = useState(false);

  // Open and Close Dialog Functions
  const handleOpenCurrencyDialog = () => {
    setOpenCurrencyDialog(true);
  };

  const handleCloseCurrencyDialog = () => {
    setOpenCurrencyDialog(false);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        `http://localhost:4000/cariGo/delReq/createReq`,
        {
          method: "POST", // Change this to "POST" if your backend expects it
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      if (response.ok) {
        alert("Account delete request sent");
      } else {
        console.error("Failed to send delete request:", response.statusText);
      }
      console.log(response.json);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const toggleBookingsDropdown = () => {
    setAnchorElBookings((prev) => !prev);
  };

  return (
    <div className="flex h-full">
      <div
        className={`flex flex-col h-full fixed left-0 top-12 bottom-0 overflow-y-auto custom-scrollbar`}
        style={{
          width: collapsed ? "80px" : "250px",
          backgroundColor: "#004E89",
          transition: "width 0.3s ease",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          paddingBottom: "20px",
          zIndex: 800, // Ensure sidebar is above other content
        }}
      >
        {/* Collapse Toggle */}
        <div
          className="p-3 cursor-pointer flex justify-end sticky top-0 bg-[#004E89] z-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <HiMenuAlt1 className="text-white text-2xl" />
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col flex-grow pb-4">
          {/* Main Section */}
          <div className="flex flex-col">
            <SidebarItem
              href="/Tourist"
              icon={<DashboardIcon />}
              text="Suggested For You"
              collapsed={collapsed}
            />
            <SidebarItem
              href="/tourist-activities"
              icon={<AttractionsSharpIcon />}
              text="Activities"
              collapsed={collapsed}
            />
            <SidebarItem
              href="/Tourist-itineraries"
              icon={<FactCheckSharpIcon />}
              text="Itinerary"
              collapsed={collapsed}
            />
            <SidebarItem
              href="/allVintages"
              icon={<MosqueOutlinedIcon />}
              text="Historical Places"
              collapsed={collapsed}
            />
            {/* Products Section */}
            <div>
              <div
                className="flex items-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 rounded-lg"
                onClick={() => setProductsExpanded(!productsExpanded)}
              >
                <span className="text-xl">
                  <ProductionQuantityLimitsOutlinedIcon />
                </span>
                {!collapsed && (
                  <span className="text-sm whitespace-nowrap font-medium ml-3">
                    Products
                  </span>
                )}
              </div>

              {/* Collapsible Product Items */}
              {productsExpanded && (
                <div
                  className="flex flex-col mt-2"
                  style={{
                    paddingLeft: collapsed ? "0" : "20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* My Products Link */}
                  <SidebarItem
                    href="/Tourist/Products"
                    icon={<StorefrontOutlinedIcon />}
                    text="Gift Shop"
                    collapsed={collapsed}
                  />

                  {/* My Cart Link */}
                  <SidebarItem
                    href="/Tourist/Cart"
                    icon={<LocalGroceryStoreOutlinedIcon />}
                    text="My Cart"
                    collapsed={collapsed}
                  />
                </div>
              )}
            </div>
            <SidebarItem
              href="/book-services"
              icon={<LuggageSharpIcon />}
              text="Book Services"
              collapsed={collapsed}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              margin: "20px 0",
              borderTop: "1px solid #fff",
              opacity: 0.5,
            }}
          ></div>

          {/* Help and Support Section */}
          <div>
            <div
              className="flex items-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 rounded-lg"
              onClick={() => setHelpExpanded(!helpExpanded)}
            >
              <span className="text-xl">
                <EngineeringSharpIcon />
              </span>
              {!collapsed && (
                <span className="text-sm whitespace-nowrap font-medium ml-3">
                  Help and Support
                </span>
              )}
            </div>

            {/* Collapsible Content */}
            {!collapsed &&
              helpExpanded && ( // Only show content if not collapsed and expanded
                <div
                  className="flex flex-col mt-2"
                  style={{
                    paddingLeft: "20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemButton
                    onClick={() => setAnchorElBookings((prev) => !prev)}
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                  >
                    <HiArrowSmRight
                      size={22}
                      style={{
                        transform: anchorElBookings
                          ? "rotate(90deg)"
                          : "rotate(0deg)", // Rotate based on state
                        transition: "transform 0.3s ease", // Smooth transition for rotation
                      }}
                    />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      My Bookings
                    </Typography>
                  </ListItemButton>

                  {anchorElBookings && (
                    <div>
                      <List sx={{ paddingLeft: 4, mt: "10px" }}>
                        <a href="/Tourist/book/activity">
                          <ListItemButton
                            sx={{
                              padding: "5% 2%",
                              color: "#ffffff",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "16px" }}>
                              Booked Activities
                            </Typography>
                          </ListItemButton>
                        </a>
                        <Divider sx={{ backgroundColor: "lightgray" }} />

                        <a href="/Tourist/book/itenerary">
                          <ListItemButton
                            sx={{
                              padding: "5% 2%",
                              color: "#ffffff",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "16px" }}>
                              Booked Itineraries
                            </Typography>
                          </ListItemButton>
                        </a>
                        <Divider sx={{ backgroundColor: "lightgray" }} />

                        <a href="/Tourist/book/hotel">
                          <ListItemButton
                            sx={{
                              padding: "5% 2%",
                              color: "#ffffff",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "16px" }}>
                              Booked Hotels
                            </Typography>
                          </ListItemButton>
                        </a>
                        <Divider sx={{ backgroundColor: "lightgray" }} />

                        <a href="/Tourist/book/flight">
                          <ListItemButton
                            sx={{
                              padding: "5% 2%",
                              color: "#ffffff",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "16px" }}>
                              Booked Flights
                            </Typography>
                          </ListItemButton>
                        </a>
                        <Divider sx={{ backgroundColor: "lightgray" }} />

                        <a href="/Tourist/book/Transportation">
                          <ListItemButton
                            sx={{
                              padding: "5% 2%",
                              color: "#ffffff",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography sx={{ fontSize: "16px" }}>
                              Booked Transportation
                            </Typography>
                          </ListItemButton>
                        </a>
                      </List>
                    </div>
                  )}

                  <ListItemButton
                    href="/change-password"
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                    collapsed={collapsed}
                  >
                    <HiArrowSmRight size={22} />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      {" "}
                      Change Password
                    </Typography>

                  </ListItemButton>

                  <ListItemButton
                    onClick={handleOpenCurrencyDialog}
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                    collapsed={collapsed}
                  >
                    <HiArrowSmRight size={22} />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      {" "}
                      Choose Currency
                    </Typography>
                  </ListItemButton>
                  <CurrencyConversion
                    open={openCurrencyDialog}
                    onClose={handleCloseCurrencyDialog}
                  />

                  <ListItemButton
                    href="/tourist/file-complaint"
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                    collapsed={collapsed}
                  >
                    <HiArrowSmRight size={22} />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      {" "}
                      File a Complaint
                    </Typography>
                  </ListItemButton>
                  <ListItemButton
                    href="/tourist/complaint-history"
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                    collapsed={collapsed}
                  >
                    <HiArrowSmRight size={22} />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      {" "}
                      My Complaints
                    </Typography>
                  </ListItemButton>
                  <ListItemButton
                    href="/login"
                    sx={{
                      padding: "5% 2%",
                      gap: 1,
                      color: "#ffffff",
                      paddingLeft: "11%",
                    }}
                    collapsed={collapsed}
                  >
                    <LogOutIcon size="22" />
                    <Typography sx={{ fontSize: "15px", color: "ffffff" }}>
                      {" "}
                      Logout
                    </Typography>
                  </ListItemButton>
                </div>
              )}
            <div
              style={{
                margin: "20px 0",
                borderTop: "1px solid #fff",
                opacity: 0.5,
              }}
            ></div>

            {/* Socials Section */}
            <div>
              <div
                className="flex items-center cursor-pointer px-4 py-2 text-white hover:bg-blue-700 rounded-lg"
                onClick={() => setLinksExpanded(!linksExpanded)}
              >
                <span className="text-xl">
                  <InsertLinkIcon />
                </span>
                {!collapsed && (
                  <span className="text-sm whitespace-nowrap font-medium ml-3">
                    Socials
                  </span>
                )}
              </div>

              {/* Collapsible Content */}
              {linksExpanded && (
                <div
                  className="flex flex-col mt-2"
                  style={{
                    paddingLeft: collapsed ? "0" : "20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="py-2">
                    <SidebarItem
                      href="https://www.instagram.com/carigo_official/profilecard/?igsh=bWtleHkwa3pkZHhm"
                      icon={<FaInstagram style={{ fontSize: "1.5rem" }} />} // Instagram icon
                      text="Instagram"
                      collapsed={collapsed}
                    />

                    {/* Facebook Link */}
                    <SidebarItem
                      href="https://www.facebook.com/profile.php?id=61570089628999&mibextid=ZbWKwL"
                      icon={<FaFacebook style={{ fontSize: "1.5rem" }} />} // Facebook icon
                      text="Facebook"
                      collapsed={collapsed}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for Custom Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ href, icon, text, collapsed, isSocial }) {
  return (
    <a
      href={href}
      target={isSocial ? "_blank" : "_self"}
      rel={isSocial ? "noopener noreferrer" : undefined}
      className={`flex items-center text-white hover:bg-blue-700 transition-all px-4 py-3 my-1 rounded-lg ${
        collapsed ? "justify-center" : "space-x-3"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && (
        <span className="text-sm whitespace-nowrap font-medium">{text}</span>
      )}
    </a>
  );
}
