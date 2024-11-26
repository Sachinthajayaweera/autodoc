import React, { useState } from "react";
import "./AppointmentList.css";

const AppointmentList = ({ appointments, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditData(appointment);
  };

  const handleSave = () => {
    onUpdate(editingId, editData);
    setEditingId(null);
  };

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Vehicle No</th>
              <th>Model</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) =>
              editingId === appointment.id ? (
                <tr key={appointment.id}>
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.contact}
                      onChange={(e) =>
                        setEditData({ ...editData, contact: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.vehicleNo}
                      onChange={(e) =>
                        setEditData({ ...editData, vehicleNo: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.vehicleModel}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          vehicleModel: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editData.serviceType}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          serviceType: e.target.value,
                        })
                      }
                    >
                      <option>General Service</option>
                      <option>Oil Change</option>
                      <option>Brake Service</option>
                      <option>Engine Repair</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={editData.time}
                      onChange={(e) =>
                        setEditData({ ...editData, time: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={appointment.id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.contact}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.vehicleNo}</td>
                  <td>{appointment.vehicleModel}</td>
                  <td>{appointment.serviceType}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <button onClick={() => handleEdit(appointment)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(appointment.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
