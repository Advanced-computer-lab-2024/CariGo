import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import clsx from 'clsx'
import SelectChangeEvent, { Pagination } from "@mui/material"
import SearchBar from "./SearchBar/SearchBar"
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

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
    CardHeader,
    Tooltip,
    FormControl,
    InputLabel
  } from "@mui/material";
  import { Typography } from '@mui/material';
  import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from '../Sidebar';
import Sider from "antd/es/layout/Sider";
import { Flex, Layout } from "antd";
import Divider from '@mui/material/Divider';
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { TablePagination } from '@mui/material';
import { ToastContainer } from "react-toastify";

import { Navigate, useLocation } from "react-router-dom";
import { ArrowRightAlt, Edit } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
export default function ViewProducts() {
  const [products, setProducts] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const { palette } = useTheme();
  const [filter, setFilter] = useState("?quantity[gte]=1");
  const [sort, setSort] = useState("");
  const bgError = palette.error.main;
  const bgPrimary = palette.success.main;
  const bgSecondary = palette.warning.light;
  // Fetch categories function
  const fetchProducts = async () => {
    setLoading(true); // Start loading
    try {
        console.log(filter +" ffffffffffffff")
      const response = await axios.get(`http://localhost:4000/cariGo/products/${filter}`); // Fetch from backend
     // console.log(response.data); // Log the response data
      setProducts(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
const onChange = () =>{

}
const navigate = useNavigate();
  // useEffect to run fetchCategories when component mounts
  useEffect(() => {
    console.log("entered")
    fetchProducts(); // Automatically fetch categories on mount
  },[filter]); // Empty dependency array means this runs once when the component mounts

  
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
  const [age, setAge] = React.useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };
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
  let final;
    const handleChange = (value) =>{
         final  = value
       // console.log(final)
    // <SearchBar placeholder="Search By Name" onChange={(event) =>handleChange(event.target.value)}/>
  }
  
  const handleDetatils = (id) =>{

    // Navigating to a page with the id in the URL
    navigate(`/admin/manage-products/product-details/${id}`);
     
          
  }
  const handleAdd = () =>{
    navigate(`/admin/manage-products/AddProduct`);
  }
  const handleRequest = () =>{
    setFilter(`?name=${final}`)
    console.log(final)
  }
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
        
      <SearchBar placeholder="Search By Name" onChange={(event) =>handleChange(event.target.value)} onClick={handleRequest}/>
      
      <CardHeader>
        <Title>Top Rating Products</Title>
        <div style={{display:Flex}}>
        <FormControl fullWidth size="small"  style={{paddingRight:4}} >
  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Filter"
    onChange={(event) =>{setAge(event.target.value)}}
  >
    <MenuItem value="1" onClick={() =>{setFilter("?price=20")}}>Less Than $19</MenuItem>
          <MenuItem value="2" onClick={() =>{setFilter("?price[gte]=20&price[lte]=59")}}>$19 - $59</MenuItem>
          <MenuItem value="3" onClick={() =>{setFilter("?price[gte]=59&price[lte]=99")}}>$59 - $99</MenuItem>
          <MenuItem value="4" onClick={() =>{setFilter("?price[gte]=99&price[lte]=149")}}>$99 - $149</MenuItem>
          <MenuItem value="5" onClick={() =>{setFilter("?price[gte]=149")}}>More Than $149</MenuItem>
  </Select>
</FormControl>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month" >Filter</MenuItem>
          <MenuItem value="1" onClick={() =>{setFilter("?price=20")}}>Less Than $19</MenuItem>
          <MenuItem value="2" onClick={() =>{setFilter("?price=20")}}>$19 - $59</MenuItem>
          <MenuItem value="3" onClick={() =>{setFilter("?price=20")}}>$59 - $99</MenuItem>
          <MenuItem value="4" onClick={() =>{setFilter("?price=20")}}>$99 - $149</MenuItem>
          <MenuItem value="5" onClick={() =>{setFilter("?price[gte]=150")}}>More Than $149</MenuItem>


        </Select> */}
        <Tooltip title="Sort By Rating" placement="top">
              <IconButton onClick={() => setFilter("?sort=ratingsAverage['avgSoFar']")}>
                <SortIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add" placement="top">
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            </div>
        
    
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
              <TableCell colSpan={1} sx={{ px: 7 }}>
                Action
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

                <TableCell sx={{ px: 6}} colSpan={2}>
                  {/* <IconButton onClick={() => console.log(2)}>
                    <Edit color="primary" />
                  </IconButton> */}
                  <Rating name="read-only" value={product['ratingsAverage'].avgSoFar} readOnly size="small" precision={0.5} defaultValue={4} />
                </TableCell>
                <TableCell sx={{ px: 7 }} colSpan={1}>
                  <IconButton onClick={() =>handleDetatils(product._id)}>
                    <Edit color="primary"  />
                  </IconButton>
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
