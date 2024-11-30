import React from "react";
import "../Vehicle/VehicleProfile.css";
import { Link, Navigate} from "react-router-dom";

const VehicleProfile = ({ vehicle, onEdit, onDelete, onAddAppointment }) => {
  const handleDelete = async () => {
    try {
      await onDelete(vehicle.id);
      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleAddAppointment = () => {
                      
    // Trigger the add appointment handler passed from the parent component
    onAddAppointment(vehicle.id);
  };

  return (
    <div className="vehicle-profile">
      <img src={vehicle.image || "/default-car.png"} alt="Vehicle" />
      <h3>{vehicle.vehicleNo}</h3>
      <p>Category: {vehicle.category}</p>
      <p>Model: {vehicle.model}</p>
      <p>Color: {vehicle.color}</p>
      <p>Engine Capacity: {vehicle.engineCapacity} CC</p>
      <p>Registration Date: {vehicle.registrationDate}</p>
      <button onClick={() => onEdit(vehicle)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      {/* New button to add appointment */}
      <Link to={'/appointments'}>
      <button onClick={handleAddAppointment}>
        Add Appointment
        </button>
        </Link>
    </div>
  );
};

export default VehicleProfile;
