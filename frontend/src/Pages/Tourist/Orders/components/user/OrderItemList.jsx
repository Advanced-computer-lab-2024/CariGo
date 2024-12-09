import OrderItem from "./OrderItem";
import PropTypes from "prop-types";
import { useState } from "react";
const OrderItemList = ({ orders,cancelledOnly,completed,active}) => {
  const [filteredOrders,setOrders]= useState(orders)
   
   let filtered;
   const today = new Date();
   if(active)
     filtered = orders?.filter(
      (order) => !order.isCancelled && new Date(order.deliveryDate) > new Date()
    );
  else
     if(completed)
      filtered = orders?.filter(
        (order) => order.state==="delivered"
      );
    else
    filtered = orders?.filter(
      (order) => order.isCancelled
    );
    
    console.log(filtered)
     
     //setOrders(filtered)

      //const delivery = new Date(deliveryDate);
  return (
    <div>
      {filtered?.map((order) =>
   (<OrderItem key={order._id} order={order}/>)
)}

    </div>
  );
};

export default OrderItemList;

OrderItemList.propTypes = {
  orders: PropTypes.array,
};
