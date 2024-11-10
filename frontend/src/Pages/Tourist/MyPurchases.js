// PurchasesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PurchaseCard from './components/PurchaseCard';
import './components/BookingCard.css';

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("Please log in to view your purchases.");
        }
        
        const response = await axios.get('/cariGo/purchase/userPurchases', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [counter]);

  // Function to trigger a re-fetch by updating the counter
  const triggerRefresh = () => setCounter((prevCounter) => prevCounter + 1);

  return (
    <div className="purchases-page">
      <h1>My Purchases</h1>
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase._id}
          id={purchase.ProductId._id}
          name={purchase.ProductId.name}
          description={purchase.ProductId.description}
          price={purchase.ProductId.price}
          quantity={purchase.Quantity}
          ratingsAverage={purchase.ProductId.ratingsAverage}
          createdAt={purchase.createdAt}
          triggerRefresh={triggerRefresh}  // Pass the trigger function to PurchaseCard
        />
      ))}
    </div>
  );
};

export default MyPurchases;
