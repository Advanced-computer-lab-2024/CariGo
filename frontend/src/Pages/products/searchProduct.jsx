import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import clsx from 'clsx'
import {
    Box,
    Card,
    Table,
    Select,
    Avatar,
    styled,
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

export default function ViewProducts() {
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
      height: 15,
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
      {loading && <p>Loading categories...</p>}
     
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Top Rating Products</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable hover>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ px: 8 }}>
                Name
              </TableCell>
              {/* <TableCell colSpan={2} sx={{ px: 8 }}>
                Rating
              </TableCell> */}

              <TableCell colSpan={2} sx={{ px: 8 }}>
               Price
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 7 }}>
                Quantity
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 9 }}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
      
          <TableBody hover>
            {products.map((product,index) => (
              <TableRow key={product._id} hover>
                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <img src={product.imgUrl} alt="p"  />
                    <Paragraph>{product.name}</Paragraph>
                  </Box>
                </TableCell>
               
                <TableCell align="left" colSpan={2} sx={{ px: 8,mr:10, textTransform: "capitalize" }}>
                  ${product.price > 999 ? (product.price / 1000).toFixed(1) + "k" : product.price}
                </TableCell>

                <TableCell sx={{px:5 }}  align="left" colSpan={2}>
                  {product.quantity ? (
                    product.quantity < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.quantity} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 6}} colSpan={1}>
                  {/* <IconButton onClick={() => console.log(2)}>
                    <Edit color="primary" />
                  </IconButton> */}
                  <Rating name="read-only" value={product['ratingsAverage'].avgSoFar} readOnly size="small" precision={0.5} defaultValue={4} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>

    </Content>
  </Layout>
  </Layout>
  );
}
