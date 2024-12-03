import React, { useState, useEffect } from 'react';
import { Button, IconButton, Container, Modal, Card, CardContent, Typography, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Navbar from './Tourist/components/TouristNavBar';




const API_BASE_URL = 'http://localhost:4000/cariGo'; // Adjust this to match your backend URL

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const conversionRate = parseFloat(localStorage.getItem("conversionRate") || "1");
  const code = localStorage.getItem("currencyCode") || "EGP";

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('User is not logged in.');
        return;
      }

      const response = await fetch(`http://localhost:4000/cariGo/cart/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("I AM علي آخري", response);

      if (!response.ok) {
        throw new Error('Failed to fetch cart 🌙');
      }

      const data = await response.json();
      console.log(data);
      setCartItems(data.products || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    setTotalCost(total);
  };

  const updateQuantity = async (id, change) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('User is not logged in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: change,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      await fetchCart(); // Refetch the cart to get updated data
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('User is not logged in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/remove/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      await fetchCart(); // Refetch the cart to get updated data
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const checkoutCart = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('User is not logged in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: 'User\'s shipping address', // You might want to get this from user input
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();
      console.log('Checkout successful:', result);
      alert('Checkout successful!');
      await fetchCart(); // Refetch the cart to get updated data (should be empty after checkout)
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const toggleReviewForm = (id) => {
    setSelectedItemId(id);
    setIsReviewFormOpen(!isReviewFormOpen);
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" style={styles.cartContainer}>
        <h1 style={styles.cartTitle}>Your Shopping Cart</h1>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map(item => (
            <Card key={item.productId._id} style={styles.productCard}>
              <CardContent style={styles.cardContent}>
                <Typography variant="h6" style={styles.productName}>
                  {item.productId.name}
                </Typography>
                <Typography variant="body2" style={styles.productDescription}>
                  {item.productId.description}
                </Typography>
                <Typography variant="body1" style={styles.productPrice}>
                  ${(item.productId.price * conversionRate).toFixed(2)} {code}
                </Typography>
                <Typography variant="body2" style={styles.productQuantity}>
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>
              <CardActions style={styles.cardActions}>
                <div style={styles.quantityControl}>
                                    <IconButton 
                    onClick={() => {
                        if (item.quantity === 1) {
                        // Handle delete action
                        removeItem(item.productId._id); // Corrected to use 'removeItem'
                        } else {
                        // Reduce quantity
                        updateQuantity(item.productId._id, -1);
                        }
                    }} 
                    size="small"
                    >
                    {item.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                    </IconButton>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <IconButton onClick={() => updateQuantity(item.productId._id, 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </div>
                <IconButton onClick={() => removeItem(item.productId._id)} size="small" style={styles.removeButton}>
                  <DeleteIcon />
                </IconButton>
                <RateReviewIcon
                  onClick={() => toggleReviewForm(item.productId._id)}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  titleAccess="Leave a Review"
                />
              </CardActions>
            </Card>
          ))
        ) : (
          <p style={styles.emptyCart}>Your cart is empty.</p>
        )}
        <div style={styles.totalCost}>
          <h2>Total Cost: ${(totalCost * conversionRate).toFixed(2)} {code}</h2>
        </div>
        <Button variant="contained" color="primary" style={styles.checkoutButton} onClick={checkoutCart}>
          Proceed to Checkout
        </Button>
      </Container>

      {/* ReviewForm Modal */}
      <Modal open={isReviewFormOpen} onClose={() => setIsReviewFormOpen(false)}>
        <div style={styles.modalContent}>
          <h2>Leave a Review</h2>
          <p>Product ID: {selectedItemId}</p>
          <Button onClick={() => setIsReviewFormOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  // ... (keep the existing styles)
  cartContainer: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  cartTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color:'#FF683C',
    textAlign: 'center',
  },
  productCard: {
    marginBottom: '16px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  cardContent: {
    padding: '16px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: '14px',
    color: '#555',
    margin: '10px 0',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#004c74',
  },
  productQuantity: {
    fontSize: '14px',
    color: '#666',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
  },
  quantity: {
    margin: '0 10px',
    fontSize: '16px',
  },
  removeButton: {
    color: 'red',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
  },
  totalCost: {
    textAlign: 'center',
    marginTop: '20px',
  },
  checkoutButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    marginTop: '20px',
  },
  modalContent: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '100px auto',
    textAlign: 'center',
  },

};

export default CartComponent;

