import "./styles/App.css";
import ReactDOM from 'react-dom';

import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure
import OrderItem, {OrderProvider} from "./Pages/Tourist/Orders/components/user/OrderItem.jsx"
import UserViewItineraries from "./Pages/UserViewItineraries.js";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./Pages/ItineraryDetails.js";
import CreateItineraryForm from "./components/CreateItineraryForm";
import AllItineraries from "./Pages/AllItineraries.js";
import UserItinDetails from "./Pages/UserItinDetails.js";
import TourGuideProfile from "./Pages/TourGuideProfile.js";
import  TouristItineraries from "./Pages/Tourist/TouristItineraries.js";
import  GuestItineraries from "./Pages/Guest/GuestItineraries.js";

import  GuestViewVintage from "./Pages/Guest/GuestPlaces.js";
import  TouristVintage from "./Pages/Tourist/TouristPlaces.js";
import CreateVintageForm from "./Pages/CreateVintageForm.js";
import MyOrders from "./Pages/Tourist/MyOrders.js";
import './styles/index.css';

//import Checkout from "./Pages/SignUp/Checkout.js";
import SignIn from "./Pages/SignUp/SignIn.js";
import PaymentCheckout from './Pages/checkout/Checkout';
import ServicesCheckout from './Pages/checkout/ExtraServicesCheckout';
import UserViewActivities from "./Pages/Tourist/TouristActivities.js";
import React, { lazy, Suspense } from 'react'; // Keep this line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Combined imports from react-router-dom
import Loadable from '@loadable/component'; // Keep other necessary imports
// import Home from './Pages/open-react-template/app/(default)/page.jsx';  // Ensure this import is case-sensitive
import HomePageGuest from './Pages/HomePageGuest/App/page.jsx';  // Ensure this import is case-sensitive
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Pages/Sidebar.jsx';
import TopBar from './Pages/TopBar.jsx';
import { Layout } from 'antd';
import ManageAccounts from './Pages/ManageAccounts.jsx'; // Import your new component
import EditCategory from './Pages/EditCategory.jsx';
import EditTag from './Pages/EditTag.jsx';
import ViewCategories from './Pages/category/viewCategories.jsx';
import UpdateCategories from './Pages/category/updateCategory.jsx';
import CreateCategories from './Pages/category/createCategory.jsx';
import DeleteCategories from './Pages/category/deleteCategory.jsx';
import ViewTags from './Pages/tags/viewTags.jsx';
import UpdateTag from './Pages/tags/updateTag.jsx';
import CreateTag from './Pages/tags/createTag.jsx';
import DeleteTag from './Pages/tags/deleteTag.jsx';
import AddAdmin from './Pages/accounts/addAdmin.jsx';
import AddGovernor from './Pages/accounts/addGovernor.jsx';
import DeleteUser from './Pages/accounts/deleteUser.jsx';
import LoginPage from './Pages/login.js';
import SignUp from './Pages/Signup.js';
import { jwtDecode } from 'jwt-decode';
import CreateActivityForm from "./Pages/CreateActivityForm.js";
import TouristProfile from "./Pages/Tourist/TouristProfile.js";
import TouristGuestHome from "./Pages/Tourist/TouristHome.js";
import ViewProductsTourist from "./Pages/Tourist/TouristProducts2.js";
import GuestHome from "./Pages/Guest/GuestHome.js";
import TouristActivities from './Pages/Tourist/TouristActivities.js';
import GuestActivities from './Pages/Guest/GuestActivities.js';
import NavBar from "./components/NavBar";
import UserViewVintages from "./Pages/UserViewVintages.js";
import VintageDetails from "./Pages/VintageDetails.js";
import TouristViewVintage from "./Pages/TouristViewVintage.js";
import UserVintageDetails from "./Pages/UserVintageDetails.js";
import Dashboard from "./Pages/Dashboard.jsx";
import ViewProducts from "./Pages/products/viewProducts.jsx";
import ManageProducts from "./Pages/products/ManageProducts.jsx";
import AddProduct from "./Pages/products/AddPrduct.jsx";
import ProductDetails from "./Pages/products/productDetails.jsx";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./AuthAdmin.js";
import SellerProfile from "./Pages/Seller/SellerProfile.js";
import ViewProductsSeller from "./Pages/Seller/productsSeller.js";
import TouristHome from "./Pages/Tourist/TouristHome.js";
import ViewProductTourist from "./Pages/Tourist/prodDetails.js";
import EditProductD from "./Pages/Seller/prodD.js";
import AddProductSeller from "./Pages/Seller/addP.js";
import UpdateActivityForm from "./components/UpdateActivityForm.js";
import UpdateTransportationForm from "./components/UpdateTransportationForm.js";
import ComplaintsList from './Pages/ComplaintsList';
import ComplaintDetails from './Pages/ComplaintDetails';
import InactiveItineraries from "./Pages/itineraries/InactiveItineraries.js"
import AdminViewEvents from "./Pages/AdminViewEvents.js"
import AdminItineraryDetails from "./Pages/itineraries/AdminItinDetails.js";
import AdminViewItineraries from "./Pages/itineraries/AdminViewItineraries.js"
import TouristHistory from "./Pages/Tourist/TouristHistory.js";
import FlightBooking from './Pages/FlightBooking.jsx';
import FlightDetails from "./components/FlightDetails";
import FileComplaintForm from "./Pages/Tourist/FileComplaintForm";
import ActivityPostDetail from "./components/ActivityPostDetail.js";
import CreatePromoCode from './Pages/createPromoCode';
import Demo from "../src/Pages/HowToUse/demo.jsx";
// import HotelBooking from "./Pages/Tourist/HotelBooking.js";
import Sign from "./components/L&S/signUp/App.js";
import BookingPage from "./Pages/Tourist/Booking.js";
import BookingServices from "./Pages/Tourist/Booking.js";
import TransportationSearch from "./Pages/TransportationSearch.js" ;
import LS from "./components/L&S/signUp/App.js";
import AdminViewActivity from "./Pages/activities/AdminViewActivity.js";
import Report from "./components/Report/dashboard/Dashboard.js";
import Pass from "./Pages/changePassword.js";
//import UploadDocumentsPage from "./Pages/UploadDocuments.js";
import UploadDocumentsPage from "./Pages/SignUp/components/UploadDocuments.js"
import ProductAnalysis from "./Pages/products/ProductAnalysis.jsx";
import ProductDetails2 from "./Pages/products/ProductDetails2.jsx";
import MyBookings from "./Pages/Tourist/MyBookings.js";
import MyBookedActivities from "./Pages/Tourist/MyBookedActivities.js"
import ComplaintHistory from "./Pages/Tourist/ComplaintHistory.js";
import MyBookedTransportation from "./Pages/Tourist/MyBookedTransportation.js"
import MyBookedFlights from "./Pages/Tourist/MyBookedFlights.js"
import MyBookedHotels from "./Pages/Tourist/MyBookedHotels.js"
import CreateTransportation from "./components/CreateTransportationForm.js"
import HotelDetails from "./components/HotelDetails.js";
import BookServicesPage from "./Pages/Tourist/Booking.js";
//const dotenv = require('dotenv')
import ReviewAccounts from "./Pages/accounts/docsReview.jsx";
import ProductDetailsT from "./Pages/Tourist/productdetailsT"
import ProductDetailsSeller from "./Pages/products/ProductDetailsSeller.jsx";
import TotalReport from "./Pages/TotalReport.js";
import BookmarkedItineraries from "./Pages/BookmarkedItineraries.js";
import BookmarkedActivities from "./Pages/BookmarkedActivities.js";
import UserReport from "./Pages/UserReport.jsx";
import CartComponent from "./Pages/ProductsCart.js";
import WishlistPage from "./Pages/viewWishlist.js";
//import ChooseSignUP from "./Pages/ChooseSignUp";
import OrderListScreen from "./Pages/Tourist/Orders/OrderListScreen.jsx";
import Temp from "./components/L&S/signUp/App2.jsx";
import BookedActivity from "./Pages/Tourist/Orders/BookedActivity.jsx";
import OrderDetailScreen from "./Pages/Tourist/Orders/OrderDetailScreen.jsx";
import ActivityPostAdvList from "./components/ActivityPostAdvList.js";
import BookDetails from "./Pages/Tourist/Orders/BookDetails.jsx";
import OTP from "./components/L&S/signUp/OTP.jsx";
import ViewReport from "./components/Report/ViewReport.jsx";
import Table from "./components/Report/Table.jsx";
function App() {
  
  const token = localStorage.getItem("jwt");
  //dotenv.config({ path: "./.env" });
 // const navigate = useNavigate();
  // Decode the token safely
  let userId;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Assuming the id is in the decoded token
    } catch (error) {
      console.error("Failed to decode token:", error);
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
    <Route path="/Tourist/orders" element={<OrderListScreen />} />
    <Route path="/Tourist/details/:id/:type" element={<BookDetails />} />
    <Route path="/Tourist/book/:type" element={<BookedActivity />} />
    
    <Route path="Tourist/order_detail/:id" element={<OrderDetailScreen />} />
    <Route path="/OTP/" element={<Temp />} />  
        <Route path="/" element={<HomePageGuest />} /> {/* Default route */}
        <Route path="/login" element={<Sign />} /> 
        <Route path="/tourist/MyBookings" element={<MyBookings />} /> {/* Default route */}
        <Route path="/tourist/MyBookedActivities" element={<MyBookedActivities />} /> {/* Default route */}
        <Route path="/tourist/MyBookedTransportation" element={<MyBookedTransportation />} /> 
        <Route path="/tourist/MyBookedFlights" element={<MyBookedFlights />} /> 
        <Route path="/tourist/MyBookedHotels" element={<MyBookedHotels />} /> 
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/how-to-use" element={<Demo />} />

        {/* <Route path="/choose-sign-up" element={<ChooseSignUp/>} /> */}
      <Route
        path="tour_guide/profile"
        element={<TourGuideProfile userId={localStorage.getItem("id")} />}
      />
      <Route path="tour_guide/itineraries" element={<UserViewItineraries />} />
      <Route path="tour_guide/inactive_itineraries" element={<InactiveItineraries />} />
      <Route path="Advertiser/ActivityList" element = {< ActivityPostAdvList />}/>
      
      <Route path="tour_guide/itineraries/:id" element={<ItineraryDetails />} />
      <Route path="Tour-Guide/Report" element={<Report />} />
      <Route path="/Tourist/Products" element={<ViewProductsTourist />} />
      <Route path="/Tourist/Products/ViewProduct/:id" element={<ViewProductTourist />} />
      <Route path="/Tourist/cart" element={<CartComponent />} />
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
      <Route path="/Seller/Report" element={<Report />} />
      <Route path="/Seller/products" element={<ViewProductsSeller />} />
      <Route path="/Seller/products/:id" element={<EditProductD />} />
      <Route path="/Seller/products/addProduct" element={<AddProductSeller />} />
      <Route path="/Seller/productDetails/:id" element={<ProductDetailsSeller />} />
      <Route path="/hotel-details/:id" element={<HotelDetails/>} />
        {<Route path="/activities" element={<UserViewActivities />} /> }
        <Route path="/tourist-activities" element={<TouristActivities/>} />
        <Route path="/tourist-itineraries" element={< TouristItineraries/>} />
        <Route path="/guest-itineraries" element={<GuestItineraries/>} />
        <Route path="/guest-activities" element={<GuestActivities/>} />
        <Route path="/activity/:id" element={<ActivityPostDetail />} />
        <Route path="/Tourist-History" element={<TouristHistory />} />
        <Route path="/tourist/file-complaint" element={<FileComplaintForm />} />
        <Route path="/tourist/complaint-history" element={<ComplaintHistory />} />
        <Route path="/tourist/BookmarkedItineraries" element={<BookmarkedItineraries />} />
        <Route path="/tourist/BookmarkedActivities" element={<BookmarkedActivities />} />
        {/* <Route path="/guest-places" element={<GuestViewVintage/>} /> */}
        <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} />
        <Route path="/createTransportation" element={<CreateTransportation userId={localStorage.getItem("id")} />} /> 
        <Route path="/Register-Tourist" element={<SignIn role={"Tourist"}/>} />
        {/* <Route path="/Register-Tourist" element={<SignUp/>} /> */}
        <Route path="/Register-Seller" element={<SignIn role={"Seller"}/>} />
        <Route path="/Register-TourGuide" element={<SignIn role={"Tour_Guide"}/>} />
        <Route path="/Register-Advertiser" element={<SignIn role={"Advertiser"}/>} />
        <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tourist-profile" element={<TouristProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tgHome" element={<TouristGuestHome/>} />
        <Route path="/touristHome" element={<TouristHome/>} />
        <Route path="/guestHome" element={<GuestHome/>} />
        <Route path="/activities/update/:id" element={<UpdateActivityForm/>} />
        <Route path="/trans/update/:id" element={<UpdateTransportationForm/>} />
        <Route path="/myVintages" element={<UserViewVintages />} />
        <Route path="/vintage/:id" element={<VintageDetails />} />
        <Route path="/allVintages" element={<TouristVintage />} />
        <Route path="/checkout/:type/:id" element={<PaymentCheckout />} />
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
              <Route path="/admin/manage-accounts/ReviewDocs" element={<ReviewAccounts/>} />
              <Route path="/create-promo-code" element={<CreatePromoCode />} />
              <Route path="/update-tag" element={<UpdateTag />} />
              <Route path='/admin/view-products' element={<ViewProducts/>}/>
              <Route path='/admin/view-products/:id' element={<ProductDetails2/>}/>
              <Route path="/tourist/view-products/:id" element={<ProductDetailsT/>} />
              <Route path="/create-tag" element={<CreateTag />} />
              <Route path="/delete-tag" element={<DeleteTag />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-governor" element={<AddGovernor />} />
              <Route path="/delete-User" element={<DeleteUser />} /> 
              <Route path="/complaints" element={<ComplaintsList />} />
              <Route path="/complaints/:id" element={<ComplaintDetails />} />
              <Route path="/admin-view-events" element={<AdminViewEvents />} />
              <Route path="/admin-view-events/itineraries" element={<AdminViewItineraries />} />
              <Route path="/admin-view-events/itineraries/:id" element={<AdminItineraryDetails />} />
              <Route path="/admin-view-events/activities" element={<AdminViewActivity />} />
              <Route path="/admin/analysis" element={<ProductAnalysis />} />
        </Route>

        <Route path="admin/reports" element={<TotalReport />} />
        <Route path="/admin/user_reports" element={<UserReport />} />
       
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/guest-places" element={<GuestViewVintage/>} />
        <Route path="/tourist-places" element={<TouristViewVintage />} />
        <Route path="/createVintage" element={<CreateVintageForm />} />
        <Route path="/book-services" element={<BookServicesPage/>} />
        <Route path="/flight" element={<FlightBooking/>} />
        <Route path="/flight-details/:id" element={<FlightDetails/>} />
        {/* <Route path="/hotels" element={<HotelBooking/>} /> */}
        <Route path="/hotel-details/:id" element={<HotelDetails/>} />
        <Route path="/map" element={<TransportationSearch/>} />  
        <Route path="/sellerProfile" element={<SellerProfile userId={localStorage.getItem("id")} />} />
        <Route path="/change-password" element={<Pass/>} />
        <Route path="/upload" element={<UploadDocumentsPage/>} />
        <Route path="/wishlist" element={<WishlistPage/>} />


      
        <Route path="/ExtraServicesCheckOut/:type" element={<ServicesCheckout />} />


        {/* Add more routes as needed */}
      </Routes>
      </Router>
      
     // </AuthProvider>
  );
}

export default App;

