import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <>
      <ul className="list-group">
        <NavLink className="list-group-item" to="/dashboard/user">
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/profile" className="list-group-item">
          Profile
        </NavLink>

        <NavLink to="/dashboard/orders" className="list-group-item">
          Orders
        </NavLink>
      </ul>
    </>
  );
};

export default SidebarMenu;
