import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Rate, Divider, Button, message } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import ProductImageList from "../../components/ProductImageList";
import ProductReviews from "../../components/ProductReviews";
import ResponsiveAppBar from "./components/TouristNavBar";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { ToastContainer } from "react-toastify";

const { Title, Paragraph, Text } = Typography;
const { Content, Header } = Layout;

const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual API URL

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
      const productExistsInWishlist = user.wishList.includes(id);
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
      
      // Check if the product is already in the wishlist
      const productExistsInWishlist = userData.wishList.includes(product._id);
  
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
    
    // Check if the product is already in the wishlist
    const productExistsInWishlist = userData.wishList.includes(product._id);

    if (!productExistsInWishlist) {
      console.log("Product is not in the wishlist.");
      return; // Do nothing if the product is not in the wishlist
    }

    // If the product exists in the wishlist, remove it
    const updatedWishlist = userData.wishList.filter(id => id.toString() !== product._id);

    // Send PATCH request to update the wishlist
    const updateData = { wishList: updatedWishlist };

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
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <ResponsiveAppBar />
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <Row
            gutter={[32, 16]}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            <Col span={10} style={{ paddingRight: "20px" }}>
              <ProductImageList images={product.images || []} />
            </Col>

            <Col span={14} style={{ paddingLeft: "20px" }}>
              <Title level={2}>{product.name}</Title>
              <Text
                type="secondary"
                style={{ display: "block", marginBottom: "8px" }}
              >
                Sold by: {(product.author?.sellerName.length > 0 ? product.author?.sellerName : product.author?.username) || "Unknown Seller"}
              </Text>

              <Row>
                <Rate allowHalf disabled value={product.ratingsAverage || 0} />
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    marginLeft: "8px",
                  }}
                >
                  {product.ratingsAverage || 0}/5 (
                  {product.ratingsQuantity || 0} reviews)
                </Text>
              </Row>
              <Title level={3}>
                ${(product.price * conversionRate).toFixed(2)} {code}
              </Title>
              {/* Wishlist Icon */}
              <span
                onClick={handleWishlistClick}
                style={{ fontSize: "24px", marginLeft: "10px", cursor: "pointer" }}
              >
              {isInWishlist ? (
              <FavoriteOutlinedIcon style={{ fontSize: "24px" }} />
              ) : (
              <FavoriteBorderOutlinedIcon style={{ fontSize: "24px" }} />
              )}
              </span>

              

              <Paragraph style={{ marginTop: "16px" }}>
                {product.description || "No description available."}
              </Paragraph>

              <div style={{ marginTop: "16px" }}>
                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: "8px" }}
                >
                  Only {product.quantity || "0"} left in stock!
                </Text>
              </div>

              <Button 
                type="primary" 
                icon={<ShoppingCartOutlined />} 
                size="large"
                onClick={addToCart}
                style={{ marginTop: "16px" }}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>

          <Divider style={{ marginTop: "40px", marginBottom: "40px" }} />

          <Row>
            <Col span={24}>
              <ProductReviews id={id} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductDetails;

