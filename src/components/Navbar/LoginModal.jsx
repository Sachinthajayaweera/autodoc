import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For signup
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errorMessage, setErrorMessage] = useState(""); // Error message display
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setIsLoading(true); // Show loading spinner or feedback

    try {

 // Hardcoded admin credentials check
 if (!isSignup && email === "admin@gmail.com" && password === "admin") {
  alert("Admin login successful!");
  navigate("/service-bill-generator"); // Navigate to the service bill generator page
  return; // Exit the function to prevent further execution
}



      const endpoint = isSignup ? "signup" : "login";
      const body = isSignup ? { name, email, password } : { email, password };










      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setIsLoading(false); // Stop loading spinner or feedback

      if (response.ok) {
        if (isSignup) {
          alert("Account created successfully! Please log in.");
          setIsSignup(false); // Switch to login mode
          clearInputs();
        } else {
          alert("Login successful!");
          setUser({
            name: data.user.name,
            email: data.user.email,
            loggedIn: true,
          });
          localStorage.setItem("token", data.token); // Store JWT for authentication
          navigate("/profile"); // Redirect to profile
        }
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setIsLoading(false); // Stop loading spinner or feedback
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Create an Account" : "Login"}
        </h2>
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-[#C30010]"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-[#C30010]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-[#C30010]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#C30010] text-white w-full py-2 rounded-md ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#a0000d] transition"
            }`}
          >
            {isLoading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setErrorMessage(""); // Clear error message when switching modes
              clearInputs();
            }}
            className="text-[#C30010] hover:underline focus:outline-none"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
