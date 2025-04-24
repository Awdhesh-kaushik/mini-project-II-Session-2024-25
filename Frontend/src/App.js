import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import "antd/dist/antd.css";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
import ChatBot from "react-simple-chatbot";

function App() {
  const [chatbotKey, setChatbotKey] = useState(0);

  const handleChatbotClose = () => {
    setChatbotKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    // This function will execute when the component unmounts
    return () => {
      setChatbotKey((prevKey) => prevKey + 1); // Reset chatbot state
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoute path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/booking/:carid" exact component={BookingCar} />
        <ProtectedRoute path="/addcar" exact component={AddCar} />
        <ProtectedRoute path="/editcar/:carid" exact component={EditCar} />
        <ProtectedRoute path="/admin" exact component={AdminHome} />
        <ProtectedRoute path="/userbookings" exact component={UserBookings} />

        {/* Integrate ChatBot component */}
        <ChatBot
          key={chatbotKey}
          headerTitle="Car Rental Assistance"
          recognitionEnable={true}
          steps={[
            {
              id: "1",
              message:
                "Welcome to our Car Rental Assistance. How can I help you today?",
              trigger: "2",
            },
            {
              id: "2",
              options: [
                {
                  value: "filter",
                  label: "I want to apply filters for my rental",
                  trigger: "apply_filters",
                },
                {
                  value: "baby_sitter_car",
                  label: "I need a car with baby sitter features",
                  trigger: "baby_sitter_car",
                },
                { value: "home", label: "Go back to Home", trigger: "home" },
              ],
            },
            {
              id: "apply_filters",
              message:
                "Sure, please specify your filters like location, date, and type of car you are looking for.",
              trigger: "apply_filters_response",
            },
            {
              id: "apply_filters_response",
              user: true,
              trigger: "filtered_results",
            },
            {
              id: "filtered_results",
              message:
                "Here are the filtered results based on your preferences.",
              end: true,
            },
            {
              id: "baby_sitter_car",
              message:
                "Great! We have cars equipped with baby sitter features. Please specify your requirements if any.",
              trigger: "baby_sitter_car_response",
            },
            {
              id: "baby_sitter_car_response",
              user: true,
              trigger: "baby_sitter_car_results",
            },
            {
              id: "baby_sitter_car_results",
              message:
                "Here are the cars suitable for you and your baby. You can find more details on our Home page.",
              end: true,
            },
            {
              id: "home",
              component: (
                <div>
                  <p>Redirecting you to the Home page...</p>
                  <button onClick={() => (window.location.href = "/")}>
                    Go to Home
                  </button>
                </div>
              ),
              end: true,
            },
          ]}
          floating={true}
        />
      </BrowserRouter>
    </div>
  );
}
export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
