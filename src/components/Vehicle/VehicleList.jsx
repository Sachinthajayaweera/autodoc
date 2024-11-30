import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import VehicleProfile from "./VehicleProfile";
import "./VehicleList.css";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const addOrUpdateVehicle = (vehicle) => {
    setVehicles((prev) => {
      const existing = prev.find((v) => v.id === vehicle.id);
      if (existing) {
        return prev.map((v) => (v.id === vehicle.id ? vehicle : v));
      }
      return [...prev, vehicle];
    });
    setEditingVehicle(null);
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/vehicles/${id}`);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  return (
    <div className="vehicle-list">
      {editingVehicle ? (
        <VehicleForm
          onSave={addOrUpdateVehicle}
          vehicle={editingVehicle}
          onCancel={() => setEditingVehicle(null)}
        />
      ) : (
        <VehicleForm onSave={addOrUpdateVehicle} />
      )}
      <div className="vehicle-profiles">
        {vehicles.map((vehicle) => (
          <VehicleProfile
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={handleEdit}
            onDelete={deleteVehicle}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
