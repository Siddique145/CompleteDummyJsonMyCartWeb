import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carosel";
import Header from "../components/Header";
import Statics from "../components/Statics";
import Products from "./Products";
import { auth } from "../firebase/Firebase"; // Adjust the path to your Firebase config
import Gallery from "../components/Gallery";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await auth.currentUser;
        if (!user) {
          // User is not logged in, redirect to login page after 6 seconds
          setTimeout(() => {
            alert("Hello Kindly First Register Yourself");
            navigate("/login"); // Adjust the path to your login page
          }, 6000);
        }
      } catch (error) {
        console.error("Error checking user authentication", error);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <>
      <Header />
      <Carousel />
      <Gallery />
      <div className="h-22">
        <Products />
      </div>
      <Statics />

      <Testimonials />
      <Footer />
    </>
  );
}

export default MainPage;
