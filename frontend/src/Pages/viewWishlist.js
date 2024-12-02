import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Rating,
  styled,
} from '@mui/material';
import { Layout } from 'antd';
import TouristNB from './Tourist/components/TouristNavBar';
import SearchBar from './products/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const folderPics = `http://localhost:4000/public/img/products/`;

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const StyledBox = styled(Box)(({ ellipsis }) => ({
  textTransform: 'none',
  ...(ellipsis && {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
      className={className}
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:4000/cariGo/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const user=response.data;
    //   if (response.data && response.data.data && response.data.data.user && response.data.data.user.wishList)
      if (user && user.wishList)   {
        setWishlistItems(user.wishList);
        console.log("in")
      }
      else
      console.log("out");
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (id) => {
    navigate(`/tourist/view-products/${id}`);
  };

  const handleSearch = (searchTerm) => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  const conversionRate = localStorage.getItem('conversionRate') || 1;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: 0 }}>
        <TouristNB />
      </Header>
      <Content style={{ padding: '20px', overflowY: 'auto' }}>
        {loading && <p>Loading wishlist items...</p>}
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
          <Box sx={{ mb: 2, px: 2 }}>
            <SearchBar placeholder="Search Wishlist" onChange={handleSearch} />
          </Box>
          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="h6">My Wishlist</Typography>
          </Box>
          <Box overflow="auto">
            <ProductTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ px: 3 }}>Product</TableCell>
                  <TableCell sx={{ px: 3 }}>Price</TableCell>
                  <TableCell sx={{ px: 3 }}>Quantity</TableCell>
                  <TableCell sx={{ px: 3 }}>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlistItems.map((item) => (
                  <TableRow key={item._id} hover onClick={() => handleDetails(item._id)}>
                    <TableCell sx={{ px: 3 }}>
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.mainImage ? folderPics + item.mainImage : '/placeholder.png'}
                          alt={item.name}
                          style={{ width: 50, height: 50, marginRight: 16, objectFit: 'cover' }}
                        />
                        <Paragraph>{item.name}</Paragraph>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ px: 3 }}>
                      ${((item.price * conversionRate).toFixed(2) > 999
                        ? (item.price * conversionRate / 1000).toFixed(1) + 'k'
                        : (item.price * conversionRate).toFixed(2))}
                    </TableCell>
                    <TableCell sx={{ px: 3 }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ px: 3 }}>
                      <Rating
                        name="read-only"
                        value={item.ratingsAverage}
                        readOnly
                        size="small"
                        precision={0.5}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ProductTable>
          </Box>
        </Card>
      </Content>
    </Layout>
  );
}

