import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Rate, Divider, Button, message } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import ProductImageList from "../../components/ProductImageList";
import ProductReviews from "../../components/ProductReviews";
import ResponsiveAppBar from "./components/TouristNavBar";
import { ToastContainer } from "react-toastify";

const { Title, Paragraph, Text } = Typography;
const { Content, Header } = Layout;

const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual API URL

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

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

