import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import "./Appointmentpage.css";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const addAppointment = async (appointment) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/appointments",
        appointment
      );
      setAppointments([...appointments, response.data]);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const updateAppointment = async (id, updatedAppointment) => {
    try {
      await axios.put(
        `http://localhost:5000/appointments/${id}`,
        updatedAppointment
      );
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, ...updatedAppointment }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="appointments-page">
      <h1 className="text-2xl font-bold">Add  Appointment</h1>
      <AppointmentForm onAdd={addAppointment} />
      <AppointmentList
        appointments={appointments}
        onDelete={deleteAppointment}
        onUpdate={updateAppointment}
      />
    </div>
  );
};

export default AppointmentPage;
