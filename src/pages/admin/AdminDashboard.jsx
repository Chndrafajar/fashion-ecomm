import React from 'react';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <NavbarAdmin auth={auth} />

      <div className="container admin ">
        <div className="row">
          <div className="col-md-4">
            <SidebarAdmin />
          </div>
          <div className="col-md-8 userProfile">
            <div className="info">
              <h5>Username</h5>
              <h6>:</h6>
              <span>{auth?.user.username}</span>
            </div>
            <div className="info">
              <h5>Email</h5>
              <h6>:</h6>
              <span>{auth?.user.email}</span>
            </div>
            <div className="info">
              <h5>Phone</h5>
              <h6>:</h6>
              <span>{auth?.user.phone}</span>
            </div>
            <div className="info">
              <h5>Adress</h5>
              <h6>:</h6>
              <span>{auth?.user.adress}</span>
            </div>
            <div className="info">
              <h5>Answer</h5>
              <h6>:</h6>
              <span>{auth?.user.answer}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
