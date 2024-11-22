import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialTestimonials = [
  {
    name: "Sachintha",
    image: "https://picsum.photos/200?1",
    description: "Excellent.",
    aosDelay: "0",
  },
  {
    name: "Tharusha",
    image: "https://picsum.photos/200?2",
    description: "Good.",
    aosDelay: "300",
  },
  {
    name: "Erandi",
    image: "https://picsum.photos/200?3",
    description: "Good Service.",
    aosDelay: "1000",
  },
];

const moreTestimonials = [
  {
    name: "Lakshan",
    image: "https://picsum.photos/200?4",
    description: "Very professional.",
    aosDelay: "0",
  },
  {
    name: "Sanduni",
    image: "https://picsum.photos/200?5",
    description: "Amazing experience!",
    aosDelay: "300",
  },
  {
    name: "Ruwan",
    image: "https://picsum.photos/200?6",
    description: "Highly recommended.",
    aosDelay: "600",
  },
  {
    name: "Dilini",
    image: "https://picsum.photos/200?7",
    description: "Quick and reliable.",
    aosDelay: "900",
  },
  {
    name: "Nadeesha",
    image: "https://picsum.photos/200?8",
    description: "Friendly staff.",
    aosDelay: "1200",
  },
  {
    name: "Amila",
    image: "https://picsum.photos/200?9",
    description: "Will come again!",
    aosDelay: "1500",
  },
];

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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={testimonial.aosDelay}
                style={{
                  backgroundColor: "#fff",
                  textAlign: "center",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                  <img
                    src={testimonial.image}
                    alt="Testimonial"
                    style={{
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                    }}
                  />
                </div>
                <div style={{ color: "#C30010", fontSize: "1.5rem" }}>⭐⭐⭐⭐⭐</div>
                <p>{testimonial.description}</p>
                <p style={{ fontWeight: "600" }}>{testimonial.name}</p>
              </div>
            ))}
          </div>

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
