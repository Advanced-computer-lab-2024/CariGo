import React from "react";
import { useNavigate } from 'react-router-dom';
import productImage from "../assets/product.png";

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#ff6b35" : "none"}
    stroke={filled ? "#ff6b35" : "#d1d5db"}
    className="w-4 h-4"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const folderPics = `http://localhost:4000/public/img/products/`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square relative overflow-hidden bg-[#ff6b35]/10">
        <img
          src={product.mainImage ? folderPics + product.mainImage : productImage}
          alt={product?.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#004e89] truncate">{product?.name}</h3>
        <div className="flex items-center space-x-1 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < Math.floor(product.ratingsAverage)} />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{product.description}</p>
        <div className="text-xs text-[#1a659e] mt-2">
          Sold by: {product.author?.sellerName?.length > 0 ? product.author?.sellerName : product.author?.username}
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-lg font-bold text-[#004e89]">
            ${product.price.toFixed(2)}
          </div>
          <button
            onClick={() => navigate(`/tourist/view-products/${product._id}`)}
            className="px-3 py-1 text-sm bg-[#ff6b35] text-white rounded-md hover:bg-[#ff6b35]/90 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

