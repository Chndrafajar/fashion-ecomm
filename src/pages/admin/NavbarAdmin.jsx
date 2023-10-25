import React from 'react';
import './index.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import swal from 'sweetalert';

const NavbarAdmin = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    });
    navigate('/login');
    localStorage.removeItem('auth');
    swal('Good Job!', 'Logout successfully', 'success');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="item">
            <NavLink to="/">{auth?.user?.username}</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
