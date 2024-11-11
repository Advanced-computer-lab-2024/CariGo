import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import clsx from "clsx";
import SelectChangeEvent, { Pagination } from "@mui/material";
import SearchBar from "../products/SearchBar/SearchBar";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

import { Tag } from "primereact/tag";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
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
  IconButton,
  Rating,
  CardHeader,
  Tooltip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../Sidebar";
import Sider from "antd/es/layout/Sider";
import { Flex, Layout } from "antd";
import Divider from "@mui/material/Divider";
import { Content, Header } from "antd/es/layout/layout";
import TopBar from "../TopBar";
import { TablePagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Navigate, useLocation } from "react-router-dom";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { ArrowRightAlt, Edit } from "@mui/icons-material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import SearchIcon from "@mui/icons-material/Search";
import avatar from "../../assets/profilePic.png";
export default function ReviewAccounts() {
  const [products, setProducts] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state
  const [status, setStatus] = useState({ documentApprovalStatus: "Pending" });
  const { palette } = useTheme();
  const [filter, setFilter] = useState("?quantity[gte]=1");
  const [sort, setSort] = useState("");
  const bgError = palette.error.main;
  const bgPrimary = palette.success.main;
  const bgSecondary = palette.warning.light;
  const token = localStorage.getItem("jwt");
  const folderPics = `http://localhost:4000/public/img/users/`;
  const folderDocs = `http://localhost:4000/public/img/documents/`;
  const folderLogos = `http://localhost:4000/public/img/logos/`;
  // Fetch categories function
  const fetchProducts = async () => {
    setLoading(true); // Start loading
    try {
      //console.log(filter + " ffffffffffffff");
      const response = await axios.get(`http://localhost:4000/cariGo/users`); // Fetch from backend
      // console.log(response.data); // Log the response data
      setProducts(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching Users:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const refreshProducts = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/cariGo/users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }); // Fetch from backend
      //console.log(response.data); // Log the response data
      setProducts(response.data); // Set the products state
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const acceptUser = async (product) => {
    try {
      //console.log("INNNNNNNNN")

      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${product._id}`, // Use the user ID from context
        { documentApprovalStatus: "Approved" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.status);

      if (response.status === 201) {
        toast.success(`Done successfully!`);

        refreshProducts();
      }
    } catch (error) {
      console.error("Error archiving product:", error.message || error);
      toast.error(
        "Error archiving product. Please check the network tab for details."
      );
    }
  };
  const downloadDocs = async (user) => {
    let files =
      user.certificates.length > 0
        ? user.certificates
        : [user.taxationRegistryCard];
    console.log(files);
    if (files && user.idDocument) files.push(user.idDocument);
    console.log(files);
    if (files) {
      files.forEach((fileUrl) => {
        fetch(folderDocs + fileUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileUrl; // Use the file name from the URL

            // Programmatically click the link to trigger download
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the link
            document.body.removeChild(link);
          });

        // Create a temporary link element
      });
    }
  };

  const rejectUser = async (product) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/cariGo/users/update/${product._id}`, // Use the user ID from context
        { documentApprovalStatus: "Rejected" },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(`Done successfully!`);

        refreshProducts();
        // Update the product's `archived` status locally
      }
    } catch (error) {
      console.error("Error unarchiving product:", error.message || error);
      toast.error(
        "Error unarchiving product. Please check the network tab for details."
      );
    }
  };

  const onChange = () => {};
  const navigate = useNavigate();
  // useEffect to run fetchCategories when component mounts
  useEffect(() => {
    //console.log("entered");
    fetchProducts(); // Automatically fetch categories on mount
  }, [filter]); // Empty dependency array means this runs once when the component mounts

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

  const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: "pre",
    "& small": {
      width: 50,
      height: 15,
      borderRadius: 500,
      boxShadow:
        "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    },
    "& td": { borderBottom: "none" },
    "& td:first-of-type": { paddingLeft: "16px !important" },
  }));
  const [age, setAge] = React.useState("");

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
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  }));
  const StyledBox = styled(Box)(({ ellipsis }) => ({
    textTransform: "none",
    ...(ellipsis && {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
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
        {...props}
      >
        {children}
      </StyledBox>
    );
  };
  let final;
  const handleChange = (value) => {
    final = value;
    // console.log(final)
    // <SearchBar placeholder="Search By Name" onChange={(event) =>handleChange(event.target.value)}/>
  };

  const handleDetatils = (id) => {
    // Navigating to a page with the id in the URL
    navigate(`/admin/manage-products/product-details/${id}`);
  };

  const handleDetatils2 = (id) => {
    // Navigating to a page with the id in the URL
    navigate(`/admin/view-products/${id}`);
  };

  const handleAdd = () => {
    navigate(`/admin/manage-products/AddProduct`);
  };
  const handleRequest = () => {
    setFilter(`?name=${final}`);
    console.log(final);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={256} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <TopBar /> {/* Top bar added here */}
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          {loading && <p>Loading Users...</p>}

          <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
            <SearchBar
              placeholder="Search By Name"
              onChange={(event) => handleChange(event.target.value)}
              onClick={handleRequest}
            />

            <CardHeader>
              <Title>New Accounts</Title>
              <div style={{ display: Flex }}>
                {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month" >Filter</MenuItem>
          <MenuItem value="1" onClick={() =>{setFilter("?price=20")}}>Less Than $19</MenuItem>
          <MenuItem value="2" onClick={() =>{setFilter("?price=20")}}>$19 - $59</MenuItem>
          <MenuItem value="3" onClick={() =>{setFilter("?price=20")}}>$59 - $99</MenuItem>
          <MenuItem value="4" onClick={() =>{setFilter("?price=20")}}>$99 - $149</MenuItem>
          <MenuItem value="5" onClick={() =>{setFilter("?price[gte]=150")}}>More Than $149</MenuItem>


        </Select> */}
              </div>
            </CardHeader>
            <Box overflow="auto">
              <ProductTable hover>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} sx={{ px: 8 }}>
                      Username
                    </TableCell>
                    {/* <TableCell colSpan={2} sx={{ px: 8 }}>
                Rating
              </TableCell> */}

                    <TableCell colSpan={2} sx={{ px: 8 }}>
                      Role
                    </TableCell>

                    <TableCell colSpan={1} sx={{ px: 7 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody hover>
                  {products.map((product, index) => (
                    <TableRow key={product._id} hover>
                      <TableCell
                        colSpan={2}
                        align="left"
                        sx={{ px: 0, textTransform: "capitalize" }}
                        onClick={() => handleDetatils2(product._id)}
                      >
                        <Box display="flex" alignItems="center" gap={4}>
                          <label
                            htmlFor="file-upload"
                            className="custom-file-upload"
                          >
                            <img
                              src={
                                product.photo && product.role === "Tour_Guide"
                                  ? folderPics + product.photo
                                  : product.photo
                                  ? folderLogos + product.photo
                                  : avatar
                              }
                              style={{ borderRadius: "50%" }}
                              alt="p"
                            />
                          </label>
                          <Paragraph>{product.username}</Paragraph>
                        </Box>
                      </TableCell>

                      <TableCell
                        align="left"
                        colSpan={2}
                        sx={{ px: 8, mr: 10, textTransform: "capitalize" }}
                      >
                        {product.role}
                      </TableCell>

                      <TableCell sx={{ px: 7 }} colSpan={1}>
                        <Tooltip title="Reject" placement="top">
                          <IconButton
                            onClick={() => rejectUser(product)}
                            style={{ color: "red" }}
                          >
                            <DangerousIcon />
                          </IconButton>
                        </Tooltip>
                        {(product.certificates.length > 0 ||
                          product.idDocument ||
                          product.taxationRegistryCard) && (
                          <Tooltip title="Download Docs" placement="top">
                            <IconButton
                              onClick={() => downloadDocs(product)}
                              style={{ color: "green" }}
                            >
                              <ArchiveIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Accept" placement="top">
                          <IconButton
                            onClick={() => acceptUser(product)}
                            style={{ color: "green" }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
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
