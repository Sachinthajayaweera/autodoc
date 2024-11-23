import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import ServiceList from "./components/ServiceList/ServiceList";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import Profile from "./components/User/Profile";
import LoginModal from "./components/Navbar/LoginModal";
import AddReview from "./components/Testimonial/AddReview";

const App = () => {
  // Dark mode state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // AOS (Animation on Scroll) initialization
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // User state management
  const [user, setUser] = useState({ name: "", email: "", loggedIn: false });
  const [isLoading, setIsLoading] = useState(true); // Loading state for user data

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false); // No token, skip fetching
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser({ name: data.name, email: data.email, loggedIn: true });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        localStorage.removeItem("token"); // Remove invalid token
        setUser({ name: "", email: "", loggedIn: false });
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "", email: "", loggedIn: false });
  };

  // Protected Route Component
  const ProtectedRoute = ({ element: Component, ...rest }) => {
    if (isLoading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching user data
    }

    return user.loggedIn ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        {/* Navbar is always visible */}
        <Navbar
          theme={theme}
          setTheme={setTheme}
          user={user}
          setUser={setUser}
          onLogout={handleLogout}
        />

        {/* Define routes for different pages */}
        <Routes>
          {/* Home page route */}
          <Route
            path="/"
            element={
              <>
                <Hero theme={theme} />
                <About />
                <Services />
                <ServiceList />
                <Testimonial />
                <AppStoreBanner />
                <Contact />
              </>
            }
          />

          {/* Add Review route */}
          <Route path="/add-review" element={<AddReview />} />

          {/* Profile page route - protected */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={() => <Profile user={user} />} />}
          />

          {/* Login page route */}
          <Route
            path="/login"
            element={
              user.loggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <LoginModal user={user} setUser={setUser} />
              )
            }
          />
        </Routes>

        {/* Footer is always visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
