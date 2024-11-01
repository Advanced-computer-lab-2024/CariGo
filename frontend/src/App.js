
import "./styles/App.css";

import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure

import UserViewItineraries from "./Pages/UserViewItineraries";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./Pages/ItineraryDetails";
import CreateItineraryForm from "./components/CreateItineraryForm";
import AllItineraries from "./Pages/AllItineraries";
import UserItinDetails from "./Pages/UserItinDetails";
import TourGuideProfile from "./Pages/TourGuideProfile";
import  TouristItineraries from "./Pages/Tourist/TouristItineraries";
import  GuestItineraries from "./Pages/Guest/GuestItineraries";
import  GuestViewVintage from "./Pages/Guest/GuestPlaces";
import  TouristVintage from "./Pages/Tourist/TouristPlaces";
import CreateVintageForm from "./Pages/CreateVintageForm.js";

import './styles/index.css';

import UserViewActivities from './Pages/UserViewActivities';
import AdminHome from './Pages/Home';
import React, { lazy, Suspense } from 'react'; // Keep this line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Combined imports from react-router-dom
import Loadable from '@loadable/component'; // Keep other necessary imports
import Home from './Pages/Home.js';  // Ensure this import is case-sensitive
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Pages/Sidebar';
import TopBar from './Pages/TopBar';
import { Layout } from 'antd';
import ManageAccounts from './Pages/ManageAccounts.jsx'; // Import your new component
import EditCategory from './Pages/EditCategory';
import EditTag from './Pages/EditTag';
import ViewCategories from './Pages/category/viewCategories';
import UpdateCategories from './Pages/category/updateCategory.jsx';
import CreateCategories from './Pages/category/createCategory';
import DeleteCategories from './Pages/category/deleteCategory';
import ViewTags from './Pages/tags/viewTags';
import UpdateTag from './Pages/tags/updateTag';
import CreateTag from './Pages/tags/createTag';
import DeleteTag from './Pages/tags/deleteTag';
import AddAdmin from './Pages/accounts/addAdmin';
import AddGovernor from './Pages/accounts/addGovernor';
import DeleteUser from './Pages/accounts/deleteUser';
import LoginPage from './Pages/login.js';
import SignUp from './Pages/Signup';
import { jwtDecode } from 'jwt-decode';
import CreateActivityForm from "./Pages/CreateActivityForm.js";
import TouristProfile from "./Pages/Tourist/TouristProfile";
import TouristGuestHome from "./Pages/Tourist-Guest/TouristGuestHome";
import ViewProductsTourist from "./Pages/Tourist/TouristProducts.js";
import GuestHome from "./Pages/Guest/GuestHome";
import TouristActivities from './Pages/Tourist/TouristActivities.js';
import GuestActivities from './Pages/Guest/GuestActivities.js';
import NavBar from "./components/NavBar";
import UserViewVintages from "./Pages/UserViewVintages";
import VintageDetails from "./Pages/VintageDetails";
import TouristViewVintage from "./Pages/TouristViewVintage";
import UserVintageDetails from "./Pages/UserVintageDetails";
import Dashboard from "./Pages/Dashboard";
import ViewProducts from "./Pages/products/viewProducts.jsx";
import ManageProducts from "./Pages/products/ManageProducts.jsx";
import AddProduct from "./Pages/products/AddPrduct.jsx";
import ProductDetails from "./Pages/products/productDetails.jsx";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./AuthAdmin.js";
import SellerProfile from "./Pages/Seller/SellerProfile.js";
import ViewProductsSeller from "./Pages/Seller/productsSeller.js";
import TouristHome from "./Pages/Tourist/TouristHome";
import ViewProductTourist from "./Pages/Tourist/prodDetails.js";
import EditProductD from "./Pages/Seller/prodD.js";
import AddProductSeller from "./Pages/Seller/addP.js";
import UpdateActivityForm from "./components/UpdateActivityForm.js";
import ComplaintsList from './Pages/ComplaintsList';
import ComplaintDetails from './Pages/ComplaintDetails';
import InactiveItineraries from "./Pages/itineraries/InactiveItineraries.js"
function App() {
  const token = localStorage.getItem("jwt");
 // const navigate = useNavigate();
  // Decode the token safely
  let userId;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Assuming the id is in the decoded token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  else{

    console.log(2)
    // return navigate("/login")
  }
  return (
  //  <AuthProvider>
    <Router>
    <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
      <Route
        path="tour_guide/profile"
        element={<TourGuideProfile userId={localStorage.getItem("id")} />}
      />
      <Route path="tour_guide/itineraries" element={<UserViewItineraries />} />
      <Route path="tour_guide/inactive_itineraries" element={<InactiveItineraries />} />
      <Route path="tour_guide/itineraries/:id" element={<ItineraryDetails />} />
      <Route path="/Tourist/Products" element={<ViewProductsTourist />} />
      <Route path="/Tourist/Products/ViewProduct/:id" element={<ViewProductTourist />} />
      <Route
        path="tour_guide/itineraries/new"
        element={<CreateItineraryForm />}
      />
      <Route
        path="tour_guid/itineraries/:id/edit"
        element={<ItineraryUpdate />}
      />
      <Route path="/Tourist" element={<TouristHome />} />
      <Route path="/user_itineraries" element={<AllItineraries />} />
      <Route path="/user_itineraries/:id" element={<UserItinDetails />} />
      <Route path="/Seller" element={<SellerProfile />} />
      <Route path="/Seller/products" element={<ViewProductsSeller />} />
      <Route path="/Seller/products/:id" element={<EditProductD />} />
      <Route path="/Seller/products/addProduct" element={<AddProductSeller />} />
        {<Route path="/activities" element={<UserViewActivities />} /> }
        <Route path="/tourist-activities" element={<TouristActivities/>} />
        <Route path="/tourist-itineraries" element={< TouristItineraries/>} />
        <Route path="/guest-itineraries" element={<GuestItineraries/>} />
        <Route path="/guest-activities" element={<GuestActivities/>} />
        {/* <Route path="/guest-places" element={<GuestViewVintage/>} /> */}
        <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} /> 
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tourist-profile" element={<TouristProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tgHome" element={<TouristGuestHome/>} />
        <Route path="/touristHome" element={<TouristHome/>} />
        <Route path="/guestHome" element={<GuestHome/>} />
        <Route path="/activities/update/:id" element={<UpdateActivityForm/>} />
        <Route path="/myVintages" element={<UserViewVintages />} />
        <Route path="/vintage/:id" element={<VintageDetails />} />
        <Route path="/allVintages" element={<TouristViewVintage />} />
        <Route path="/viewingAllvintage/:id" element={<UserVintageDetails />} />
        <Route element={< ProtectedRoute/>}>
        <Route path="/admin" element={<Dashboard/> } />
        <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
              <Route path="/edit-category" element={<EditCategory />} />
              <Route path="/edit-tag" element={<EditTag />} />
              <Route path="/view-categories" element={<ViewCategories />} />
              <Route path="/update-categories" element={<UpdateCategories />} />
              <Route path="/create-categories" element={<CreateCategories />} />
              <Route path="/delete-categories" element={<DeleteCategories />} />
              <Route path="/view-tags" element={<ViewTags />} />
              <Route path="/admin/manage-products" element={<ManageProducts />} />
              <Route path="/admin/manage-products/AddProduct" element={<AddProduct/>} />
              <Route path="/admin/manage-products/product-Details/:id" element={<ProductDetails/>} />
              <Route path="/update-tag" element={<UpdateTag />} />
              <Route path='/admin/view-products' element={<ViewProducts/>}/>
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/delete-tag" element={<DeleteTag />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-governor" element={<AddGovernor />} />
              <Route path="/delete-User" element={<DeleteUser />} /> 
              <Route path="/complaints" element={<ComplaintsList />} />
              <Route path="/complaints/:id" element={<ComplaintDetails />} />
       
        </Route>

        <Route path="/guest-places" element={<GuestViewVintage/>} />
        <Route path="/tourist-places" element={<TouristViewVintage />} />
        <Route path="/createVintage" element={<CreateVintageForm />} />
        <Route path="/sellerProfile" element={<SellerProfile userId={localStorage.getItem("id")} />} />


        {/* Add more routes as needed */}
      </Routes>
      </Router>
     // </AuthProvider>
  );
}

export default App;
