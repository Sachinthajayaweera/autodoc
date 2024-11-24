import React from 'react';
import './Dashboard.css';
import {Link} from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <ul>
      
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/PetList">Pets</Link></li>
        <li><Link to="/DocList">Doctors</Link></li>
        <li><Link to="/AppointmentList">Appointments</Link></li>
        <li><Link to="/NoticeBoard">Notice Board</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
