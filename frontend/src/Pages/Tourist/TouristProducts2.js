import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import {
  SearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { Layout } from "antd";
import TouristNB from "./components/TouristNavBar";
import { chaoticOrbit } from "ldrs";

const { Header, Content } = Layout;

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("?quantity[gte]=1");
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/cariGo/products/tourist-products/${filter}${sort}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter, sort]);

  const handleSearch = (event) => {
    event.preventDefault();
    setFilter(`?name=${searchTerm}`);
  };

  const handlePriceFilter = (event) => {
    setPriceRange(event.target.value);
    switch (event.target.value) {
      case "1":
        setFilter("?price[lte]=19");
        break;
      case "2":
        setFilter("?price[gte]=19&price[lte]=59");
        break;
      case "3":
        setFilter("?price[gte]=59&price[lte]=99");
        break;
      case "4":
        setFilter("?price[gte]=99&price[lte]=149");
        break;
      case "5":
        setFilter("?price[gte]=149");
        break;
      default:
        setFilter("?quantity[gte]=1");
    }
  };

  const handleSort = () => {
    setSort(sort === "" ? "&sort=ratingsAverage" : "");
  };
  chaoticOrbit.register();

  return (
    <Layout style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#004e89", padding: "0" }}>
        <TouristNB />
      </Header>

      <Content style={{ padding: "24px" }}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4 bg-[#f7c59f] p-4 rounded-lg shadow-md">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#004e89]" />
              </div>
            </form>
            <select
              value={priceRange}
              onChange={handlePriceFilter}
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent bg-white text-[#004e89]"
            >
              <option value="">Price Range</option>
              <option value="1">Less than $19</option>
              <option value="2">$19 - $59</option>
              <option value="3">$59 - $99</option>
              <option value="4">$99 - $149</option>
              <option value="5">More than $149</option>
            </select>
            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-md hover:bg-[#1a659e] transition-colors"
            >
              <span>Sort by Rating</span>
              {sort === "" ? (
                <SortAscendingIcon className="h-5 w-5" />
              ) : (
                <SortDescendingIcon className="h-5 w-5" />
              )}
            </button>
          </div>
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
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProductGrid;
