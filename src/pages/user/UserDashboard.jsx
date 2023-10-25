import React from 'react';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import NavbarUser from './NavbarUser';
const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <NavbarUser auth={auth} />

      <div className="container user">
        <div className="row">
          <div className="col-md-4">
            <SidebarMenu />
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

export default UserDashboard;
