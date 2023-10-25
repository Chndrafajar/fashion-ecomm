import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <>
      <ul className="list-group">
        <NavLink className="list-group-item" to="/dashboard/admin">
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/admin-profile" className="list-group-item">
          Profile
        </NavLink>
        <NavLink to="/dashboard/admin-add-product" className="list-group-item">
          Add Product
        </NavLink>
        <NavLink to="/dashboard/admin-product" className="list-group-item">
          Admin Product
        </NavLink>
        <NavLink to="/dashboard/admin-orders" className="list-group-item">
          Orders
        </NavLink>
      </ul>
    </>
  );
};

export default SidebarAdmin;
