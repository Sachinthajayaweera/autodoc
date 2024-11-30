import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Vehicle/VehicleForm.css";

const VehicleForm = ({ onSave, vehicle, onCancel }) => {
  const [formData, setFormData] = useState(
    vehicle || {
      vehicleNo: "",
      category: "",
      model: "",
      color: "",
      engineCapacity: "",
      registrationDate: "",
      image: "",
    }
  );

  // Update the formData when vehicle is passed as props for editing
  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (vehicle && vehicle.id) {
        // Edit existing vehicle
        response = await axios.put(
          `http://localhost:5000/vehicles/${vehicle.id}`,
          formData
        );
        console.log("Vehicle updated successfully:", response.data);
      } else {
        // Add new vehicle
        response = await axios.post(
          "http://localhost:5000/vehicles",
          formData
        );
        console.log("Vehicle added successfully:", response.data);
      }

      // Clear the form after successful submission
      setFormData({
        vehicleNo: "",
        category: "",
        model: "",
        color: "",
        engineCapacity: "",
        registrationDate: "",
        image: "",
      });

      // Call onSave to notify the parent component
      onSave(response.data);

    } catch (error) {
      console.error(
        "Error submitting vehicle:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="vehicleNo"
        placeholder="Vehicle No"
        value={formData.vehicleNo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="engineCapacity"
        placeholder="Engine Capacity"
        value={formData.engineCapacity}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="registrationDate"
        placeholder="Registration Date"
        value={formData.registrationDate}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <div>
        <button type="submit">{vehicle ? "Update" : "Save"}</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default VehicleForm;
