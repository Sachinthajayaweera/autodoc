import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    vehicleNo: "",
    vehicleModel: "",
    serviceType: "General Service",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      contact: "",
      email: "",
      vehicleNo: "",
      vehicleModel: "",
      serviceType: "General Service",
      date: "",
      time: "",
    });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          cd
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Vehicle No:</label>
        <input
          type="text"
          name="vehicleNo"
          value={formData.vehicleNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Vehicle Model:</label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Service Type:</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
        >
          <option>General Service</option>
          <option>Oil Change</option>
          <option>Brake Service</option>
          <option>Engine Repair</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Appointment</button>
    </form>
  );
};

export default AppointmentForm;
