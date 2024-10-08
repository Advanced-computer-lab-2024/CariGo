import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import clsx from 'clsx'
import {
    Table,
    Select,
    Avatar,
    TableRow,
    useTheme,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    IconButton, Rating,
    CardHeader
  } from "@mui/material";
  import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from '../Sidebar';
import Sider from "antd/es/layout/Sider";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { ToastContainer } from "react-toastify";
import { Box, Card,Grid, styled, Tooltip } from "@mui/material";
import { AttachMoney, Group, ShoppingCart, Store, ArrowRightAlt } from "@mui/icons-material";


// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));
export default function ManageProducts() {
  const [products, setProducts] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const { palette } = useTheme();
  const [filter, setFilter] = useState("");
  const bgError = palette.error.main;
  const bgPrimary = palette.success.main;
  const bgSecondary = palette.warning.light;
  // Fetch categories function
  const fetchProducts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/cariGo/products"); // Fetch from backend
     // console.log(response.data); // Log the response data
      setProducts(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // useEffect to run fetchCategories when component mounts
  useEffect(() => {
    fetchProducts(); // Automatically fetch categories on mount
  }, []); // Empty dependency array means this runs once when the component mounts
  const CardHeader = styled(Box)(() => ({
    display: "flex",
    paddingLeft: "24px",
    paddingRight: "24px",
    marginBottom: "12px",
    alignItems: "center",
    justifyContent: "space-between"
  }));
  
  const Title = styled("span")(() => ({
    fontSize: "1rem",
    fontWeight: "500",
    textTransform: "capitalize"
  }));
  
  const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: "pre",
    "& small": {
      width: 50,
      height: 65,
      borderRadius: 500,
      boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
    },
    "& td": { borderBottom: "none" },
    "& td:first-of-type": { paddingLeft: "16px !important" }
  }));
  
  const Small = styled("small")(({ bgcolor }) => ({
    width: 50,
    height: 15,
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "4px",
    overflow: "hidden",
    background: bgcolor,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  }));
  const StyledBox = styled(Box)(({ ellipsis }) => ({
    textTransform: "none",
    ...(ellipsis && { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })
  }));
  const Paragraph = ({ children, className, ellipsis, ...props }) => {
    return (
      <StyledBox

        mb={0}
        mt={0}
        component="p"
        fontSize="14px"
        ellipsis={ellipsis}
        className={clsx({ [className || ""]: true })}
        {...props}>
        {children}
      </StyledBox>
    );
  };
  const cardList = [
    { name: "Create Admin/Governer", amount: 3050, Icon: Group },
    { name: "Create Category", amount: "$80,500", Icon: AttachMoney },
    { name: "Add Product", amount: "8.5% Stock Surplus", Icon: Store },
    { name: "Create Tags", amount: "305 Orders", Icon: ShoppingCart }
  ];
  return (
    <Layout style={{ height: '100vh' }}>
      
    <Sider width={256} style={{ background: '#001529' }}>
          <Sidebar />
        </Sider>
        <Layout>
        <Header style={{ background: '#001529', padding: 0 }}>
            <TopBar /> {/* Top bar added here */}
          </Header>
          <ToastContainer />
          <Content style={{ padding: '20px', overflowY: 'auto' }}>
         
    <Grid container  spacing={2} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name }) => (
        <Grid item style={{height:150}} xs={20} md={7} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />

              <Box ml="12px">
                <Heading>{name}</Heading>
                {/* <Heading>{amount}</Heading> */}
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => console.log(3)}>
                <ArrowRightAlt />
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  

    </Content>
  </Layout>
  </Layout>
  );
}
