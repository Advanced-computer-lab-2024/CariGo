import { useParams } from "react-router-dom";
import ProductImageList from "../../components/ProductImageList";
import { Layout, Row, Col, Typography, Rate, Divider } from "antd";
import Sider from "antd/es/layout/Sider";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { ToastContainer } from "react-toastify";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";
import ProductReviews from "../../components/ProductReviews";
import NavBar from "../../components/NavBarAdvertiser";
import ResponsiveAppBar from "./components/TouristNavBar";
const { Title, Paragraph, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams(); // Extracts the `id` from the URL
  const [product, setProduct] = useState(null); // Initialize as null to check loading state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://localhost:4000/cariGo/products/${id}`,
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
        setProduct(data); // Set the fetched product data
        console.log("Fetched product data:", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // If product is not yet loaded, display a loading message or spinner
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ height: "100vh" }}>
    <Layout>
        <Header style={{ background: "#001529", padding: 0 }}>
          <ResponsiveAppBar /> {/* Top bar added here */}
        </Header>
        <ToastContainer />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <Row
            gutter={[32, 16]} // Increase horizontal gutter for spacing
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start", // Align images and details at the top
            }}
          >
            {/* Left Column for Images */}
            <Col span={10} style={{ paddingRight: "20px" }}>
              <ProductImageList images={product.images || []} />
            </Col>

            {/* Right Column for Product Info */}
            <Col span={14} style={{ paddingLeft: "20px" }}>
              <Title level={2}>{product.name}</Title>
              <Row><Rate allowHalf disabled value={product.ratingsAverage || 0} />
              <Text
                type="secondary"
                style={{ display: "block", marginBottom: "8px", marginLeft: "8px" }}
              >
                {" "}{product.ratingsAverage || 0}/5 ({product.ratingsQuantity || 0} reviews)
              </Text>
              </Row>
              <Title level={3}>${product.price}</Title>
              
              {/* Description Section */}
              <Paragraph style={{ marginTop: "16px" }}>
                {product.description || "No description available."}
              </Paragraph>

              {/* Quantity Selector and Stock Info */}
              <div style={{ marginTop: "16px" }}>
                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: "8px" }}
                >
                  Only {product.quantity || "0"} left in stock!
                </Text>
              </div>
            </Col>
          </Row>

          {/* Divider below product details and above chart */}
          <Divider style={{ marginTop: "40px", marginBottom: "40px" }} />

          {/* Row for the product analysis chart */}
          <Row>
            <Col span={24}>
              <ProductReviews id={id}/>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductDetails;
