import React from "react";
import "./Home.css"; // Custom styles
import { useNavigate } from "react-router-dom";
import { Box, Card, IconButton, Typography, styled } from "@mui/material";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import { EnvironmentOutlined, CompassOutlined} from "@ant-design/icons"; // Ant Design icons
import { Link } from "react-router-dom";
const { Sider, Content, Header } = Layout;

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const FeatureCard = styled(Card)(() => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

export default function EditCategory() {
  const navigate = useNavigate();

  // Handles navigation based on the card clicked
  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar />
        </Header>
        <ToastContainer />
        <Content
          className="ant-layout-content"
          style={{ padding: "20px", overflowY: "auto" }}
        >
          <section className="features">
            <h2>Choose type of Event</h2>
            <div className="feature-cards">
              {/* Clickable card for Edit Preference Tags */}
              <Link to="/admin-view-events/itineraries" className="card">
                <CompassOutlined className="card-icon" />{" "}
                {/* Use TagOutlined for preferences */}
                <h3>View Itineraries</h3>
                <p>View and manage itineraries created by tour guides.</p>
              </Link>

              {/* Clickable card for Edit Preference Tags */}
              <Link to="/admin-view-events/activities" className="card">
                <EnvironmentOutlined className="card-icon" />{" "}
                {/* Use TagOutlined for preferences */}
                <h3>View Activities</h3>
                <p>View and manage activities created by advertisers.</p>
              </Link>
            </div>
          </section>
        </Content>
      </Layout>
    </Layout>
  );
}
