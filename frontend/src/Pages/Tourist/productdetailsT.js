import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Rate, Divider, Button, message } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import ProductImageList from "../../components/ProductImageList";
import ProductReviews from "../../components/ProductReviews";
import TouristNavBar from "./components/TouristNavBar.js";
import TouristSideBar from "./components/TouristSideBar";
import {Box} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { ToastContainer } from "react-toastify";
import Container from "@mui/material/Container";
import avatar from "../../assets/profilePic.png";

const folderPics = `http://localhost:4000/public/img/products/`;


const { Title, Paragraph, Text } = Typography;
const { Content, Header } = Layout;

const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual API URL

const leftColumnStyle = {
  // backgroundColor: '#f7c59f',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  height: '100%',
};

const rightColumnStyle = {
  // backgroundColor: '#f7e1c6',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '40px',
  height: '100%',
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const [isInWishlist, setIsInWishlist] = useState(false); // Initially, the icon will be the outlined one



// Fetch user data and check if the product is in the wishlist
  const isTheproductInTheWishlist = async () => {
    const token = localStorage.getItem("jwt");
    const userId = localStorage.getItem("id");
    if (!token || !userId) {
      throw new Error("No token or user ID found. Please log in.");
    }

    try {
      // Fetch user data
      const userResponse = await fetch(`http://localhost:4000/cariGo/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Error fetching user data");
      }

      const user = await userResponse.json();
      // setUserData(user);

      // Check if the product is in the user's wishlist
      let ids=[];
      for (const item of user.wishList) {
        ids.push(item._id)
      }
      const productExistsInWishlist = ids.includes(id);
      setIsInWishlist(productExistsInWishlist); // Set initial icon state based on wishlist status
    } catch (error) {
      console.error("Error checking product in wishlist:", error);
    }
  };


  const handleWishlistClick = () => {
    // Toggle the state to switch between filled and outlined
    setIsInWishlist((prevState) => {
      const newState = !prevState; // Toggle the state
      // Add or remove product from wishlist based on the new state
      if (newState) {
        console.log("Add product to wishlist."); // Add to wishlist logic
        addProductToWishlist(); // Call function to add to wishlist
        // Here you would call an API or update local state to add the product to wishlist
      } else {
        console.log("Remove product from wishlist."); // Remove from wishlist logic
        removeProductFromWishlist(); // Call function to remove from wishlist
        // Here you would call an API or update local state to remove the product from wishlist
      }
      return newState; // Update the state
    });
  };

  // Add product to wishlist
  const addProductToWishlist = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const userId=localStorage.getItem("id");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      // Fetch the user by userId
      const userResponse = await fetch(`http://localhost:4000/cariGo/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!userResponse.ok) {
        throw new Error("Error fetching user data");
      }
  
      const userData = await userResponse.json();
      
      let ids=[];
      for (const item of userData.wishList) {
       ids.push(item._id)
      }

      // Check if the product is already in the wishlist
      const productExistsInWishlist = ids.includes(product._id);
  
      if (productExistsInWishlist) {
        console.log("Product already in the wishlist.");
        return; // Do nothing if it's already in the wishlist
      }
  
      // If not, add the product to the wishlist and update the user
      const updateData = { wishList: [...userData.wishList, product._id] };
  
      const updateResponse = await fetch(
        `http://localhost:4000/cariGo/users/update/${userId}`, // Use the correct endpoint for updating user data
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData), // Send the updated wishlist
        }
      );
  
      if (!updateResponse.ok) {
        throw new Error("Error updating wishlist");
      }
  
      const updatedUser = await updateResponse.json();
      console.log("Product added to wishlist:", updatedUser);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  // Remove product from wishlist
const removeProductFromWishlist = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const userId=localStorage.getItem("id");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Fetch the user by userId
    const userResponse = await fetch(`http://localhost:4000/cariGo/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Error fetching user data");
    }

    const userData = await userResponse.json();
    
    let ids=[];
    for (const item of userData.wishList) {
      ids.push(item._id)
    }

    // Check if the product is already in the wishlist
    const productExistsInWishlist = ids.includes(product._id);

    if (!productExistsInWishlist) {
      console.log("Product is not in the wishlist.");
      return; // Do nothing if the product is not in the wishlist
    }

    // If the product exists in the wishlist, remove it
    const updatedWishlist = userData.wishList.filter(id => id._id.toString() !== product._id);

    // Send PATCH request to update the wishlist
    let IDS=[];
    for (const item of updatedWishlist) {
      IDS.push(item._id)
    }
    const updateData = { wishList: IDS };
    

    const updateResponse = await fetch(
      `http://localhost:4000/cariGo/users/update/${userId}`, // Use the correct endpoint for updating user data
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Send the updated wishlist
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Error updating wishlist");
    }

    const updatedUser = await updateResponse.json();
    console.log("Product removed from wishlist:", updatedUser);
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
  }
};

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        
        const response = await fetch(
          `${API_BASE_URL}/cariGo/products/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
        console.log("Fetched product data:", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    
    // Check if the product is in the wishlist before loading the product details
    isTheproductInTheWishlist();
    
    fetchProductDetails();
  }, [id]);


  // useEffect(() => {
  //   const savedCartItems = localStorage.getItem('cartItems');
  //   if (savedCartItems) {
  //     try {
  //       setCartItems(JSON.parse(savedCartItems));
  //     } catch (e) {
  //       console.error('Error parsing saved cart items:', e);
  //       localStorage.removeItem('cartItems');
  //     }
  //   }
  // }, []);

  const updateCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        message.error('Please log in to update your cart.');
        return;
      }

      console.log('Updating cart with:', { productId, quantity });
      const response = await fetch(`${API_BASE_URL}/cariGo/cart/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to update cart');
      }

      

      message.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
      message.error('Failed to update cart. Please try again.');
    }
  };

  const addToCart = () => {
    if (product) {
      updateCart(product._id, 1);
    } else {
      console.error('No product to add to cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    {/* Sidebar */}
    <Box>
      <TouristSideBar />
    </Box>

    {/* Main Content Area */}
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "80px", // Sidebar width
        marginTop: "64px", // AppBar height
        padding: "16px",
      }}
    >
      {/* Top Navbar */}
      <TouristNavBar />
      <ToastContainer />
      <Content style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
        <Row style={{ flex: 1 }}>
          {/* Left half: Product Image with container-like structure */}
          <Col span={12} style={leftColumnStyle}>
            <div style={{ maxWidth: '100%', maxHeight: '80vh', overflow: 'hidden', borderRadius: '8px' }}>
              <img
                src={product.mainImage ? folderPics + product.mainImage : avatar}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </Col>

          {/* Right half: Product Details with new background color */}
          <Col span={12} style={rightColumnStyle}>
            {/* Product Name */}
            <Title level={2} >{product.name}</Title>

            {/* Product Description */}
            <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
              {product.description || "No description available."}
            </Paragraph>

            {/* Seller Information */}
            <Text style={{ fontSize: '18px', marginBottom: '16px' }}>
              Sold by: {(product.author?.sellerName?.length > 0 ? product.author?.sellerName : product.author?.username) || "Unknown Seller"}
            </Text>

            {/* Ratings */}
            <div style={{ marginBottom: '16px' }}>
              <Rate allowHalf disabled value={product.ratingsAverage || 0} />
              <Text style={{ marginLeft: '8px' }}>
                {product.ratingsAverage || 0}/5 ({product.ratingsQuantity || 0} reviews)
              </Text>
            </div>

            {/* Price */}
            <Title level={3} style={{ marginBottom: '16px' }}>
              ${(product.price * conversionRate).toFixed(2)} {code}
            </Title>

            {/* Stock Information */}
            <Text type="secondary" style={{ fontSize: '16px', marginBottom: '16px' }}>
              Only {product.quantity || "0"} left in stock!
            </Text>

            {/* Add to Cart and Wishlist */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Button 
                type="primary" 
                icon={<ShoppingCartOutlined />} 
                size="large"
                onClick={addToCart}
                style={{ marginRight: '16px', height: '50px', fontSize: '18px' }}
              >
                Add to Cart
              </Button>
              <span
                onClick={handleWishlistClick}
                style={{ cursor: 'pointer' }}
              >
                {isInWishlist ? (
                  <FavoriteOutlinedIcon style={{ fontSize: '32px', color: '#ff4d4f' }} />
                ) : (
                  <FavoriteBorderOutlinedIcon style={{ fontSize: '32px' }} />
                )}
              </span>
            </div>
          </Col>
        </Row>
        <Container maxWidth="xl">
        {/* Product Reviews Section */}
        <Divider style={{ margin: '40px 0' }} />
        <Row>
          <Col span={24}>
            {/* <Title level={3}>Product Reviews</Title> */}
            <ProductReviews id={id} />
          </Col>
        </Row>
        </Container>
      </Content>
</Box></Box>
  );
};

export default ProductDetails;

