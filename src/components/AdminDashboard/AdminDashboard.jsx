import React from 'react';
import './Dashboard.css';
import {Link} from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <ul>
      
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/PetList">User Management</Link></li>
        <li><Link to="/DocList">Bill</Link></li>
        <li><Link to="/AppointmentList">Appointments Management</Link></li>
        <li><Link to="/NoticeBoard">Reviews Management</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
