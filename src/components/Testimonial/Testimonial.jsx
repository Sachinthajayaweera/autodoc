import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setTestimonials([...testimonials, ...moreTestimonials]);
    setShowMore(true);
  };

  const handleAddReview = () => {
    navigate("/add-review"); // Navigate to AddReview page
  };

  return (
    <>
      <span id="about"></span>
      <div style={{ backgroundColor: "#fff", color: "#333", padding: "3.5rem 0" }}>
        <div className="container">
          {/* Header */}
          <div style={{ paddingBottom: "3rem", textAlign: "center" }}>
            <p
              data-aos="fade-up"
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                fontFamily: "serif",
              }}
            >
              What Our Clients Say About Us
            </p>
            <p
              data-aos="fade-up"
              style={{
                textAlign: "center",
                padding: "0 5rem",
                margin: "1rem 0",
                color: "#777",
              }}
            >
              We take pride in what our clients say. Here are some testimonials from our valued customers.
            </p>
          </div>

          {/* Testimonials Grid */}
          

          {/* View More and Add Review Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", gap: "1rem" }}>
            {!showMore && (
              <button
                onClick={handleViewMore}
                data-aos="fade-up"
                style={{
                  border: "2px solid #C30010",
                  color: "#C30010",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  transition: "background-color 0.3s, color 0.3s",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#C30010";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#C30010";
                }}
              >
                View More
              </button>
            )}
            <button
              onClick={handleAddReview}
              data-aos="fade-up"
              style={{
                border: "2px solid #C30010",
                color: "#C30010",
                padding: "0.5rem 1.5rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#C30010";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#C30010";
              }}
            >
              Add a Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
