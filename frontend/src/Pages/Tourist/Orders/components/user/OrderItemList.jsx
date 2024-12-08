import OrderItem from "./OrderItem";
import ActivityItem from "./ActivityItem";
import PropTypes from "prop-types";
import { useState } from "react";
const OrderItemList = ({ orders,cancelledOnly,completed,active,type}) => {
  const [filteredOrders,setOrders]= useState(orders)
   console.log(orders)
   let filtered;
   if(type=='activity'){
    filtered=orders;
   }
   else if (type=='order'){
   const today = new Date();
   
   if(active)
     filtered = orders?.filter(
      (order) => !order.isCancelled && new Date(order.deliveryDate) > new Date()
    );
  else
     if(completed)
      filtered = orders?.filter(
        (order) => order.isCancelled && new Date(order.deliveryDate) <= new Date()
      );
    else
    filtered = orders?.filter(
      (order) => order.isCancelled
    );
  }
     
     
     //setOrders(filtered)

      //const delivery = new Date(deliveryDate);
  return (
    <div>
{filtered && type === 'order' ? (
  filtered.map((order) => (
    <OrderItem key={order._id} order={order} />
  ))
) :" "}

{filtered && type === 'activity' ? (
  filtered.map((order) => (
    <ActivityItem key={order._id} order={order} />
  ))
) :" "}



    </div>
  );
};

export default OrderItemList;

OrderItemList.propTypes = {
  orders: PropTypes.array,
};
