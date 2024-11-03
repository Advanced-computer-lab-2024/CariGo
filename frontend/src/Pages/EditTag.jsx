import { Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  styled,
  useTheme,
} from "@mui/material";
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer } from "react-toastify";
import TopBar from "./TopBar";
import { Content, Header } from "antd/es/layout/layout";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import Sidebar from "./Sidebar";

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

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

export default function EditTag() {
  const navigate = useNavigate(); // Use the navigate hook
  const { palette } = useTheme();
  const bgPrimary = palette.primary.main;

  // Updated handleIconClick function to handle different routes
  const handleIconClick = (product) => {
    switch (product.name) {
      case "View All":
        navigate("/view-tags"); // Redirect to "View All" page
        break;
      case "Edit or Delete":
        navigate("/update-tag"); // Redirect to "Update" page
        break;
      case "Create":
        navigate("/create-tag"); // Redirect to "Create" page
        break;
      default:
        console.log(`No route for ${product.name}`);
    }
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
          <ToastContainer/>
          <Content style={{ padding: '20px', overflowY: 'auto' }}>
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Edit Tag</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ px: 3 }}>
                Name
              </TableCell>
              <TableCell colSpan={2} sx={{ px: 0 }}></TableCell>
              <TableCell colSpan={1} sx={{ px: 0 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Typography>{product.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {product.NUmOfTimes}
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton onClick={() => handleIconClick(product)}>
                    <Edit color="primary" />
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

// Sample product list
const productList = [
  {
    name: "View All",
  },
  {
    name: "Edit or Delete",
  },
  {
    name: "Create",
  },
];
