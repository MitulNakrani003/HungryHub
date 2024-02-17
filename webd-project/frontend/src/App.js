import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import FooditemScreen from "./screens/FooditemScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import FooditemListScreen from "./screens/FooditemListScreen";
import FooditemEditScreen from "./screens/FooditemEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import MenuScreen from "./screens/MenuScreen";
// // import Contact from "./components/contact";
// import Contact from "./components/Reservation";
// const checkStyle = () =>{
//   if(window.location.pathname == '/login'){
//     return 'url(/images/signup.jpeg)';
//   }
//   if(window.location.pathname == '/register'){
//     return 'url(/images/signup.jpeg)';
//   }
//   return null;  
// }

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-1">

        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />

          <Route path="/fooditem/:id" component={FooditemScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/fooditemlist"
            component={FooditemListScreen}
            exact
          />
          <Route
            path="/admin/fooditemlist/:pageNumber"
            component={FooditemListScreen}
            exact
          />
          <Route
            path="/admin/fooditem/:id/edit"
            component={FooditemEditScreen}
          />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          </Container>
          <Container fluid style={{padding:"0px"}}>
          <Route path="/about" component={AboutScreen} />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/menu" component={MenuScreen} />

            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
             {/* <Route path="/reservations" component={Contact} /> */}
            <Route path="/" component={HomeScreen} exact />
         </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
