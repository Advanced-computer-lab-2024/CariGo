import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
  SearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { Layout } from "antd";
import TouristNB from "./Tourist/components/TouristNavBar";
import { chaoticOrbit } from "ldrs";

const { Header, Content } = Layout;
const folderPics = `http://localhost:4000/public/img/products/`;

export default function WishlistPage() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("?quantity[gte]=1");
  const [sort, setSort] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, [filter, sort]);

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
      const user = response.data;
      if (user && user.wishList) {
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

  return (
    <Layout style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#004e89", padding: "0" }}>
        <TouristNB />
      </Header>

      <Content style={{ padding: "24px" }}>
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-[#004e89] mb-8">Wishlisted Products</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? (
              <div className="text-center p-8">
                <l-chaotic-orbit
                  size="35"
                  speed="1.5"
                  color="rgb(255,107,53)"
                ></l-chaotic-orbit>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

