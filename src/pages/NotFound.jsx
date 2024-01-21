import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="container">
        <h3>Hmmm Sepertinya Halaman</h3>
        <h3>Yang Anda Cari Tidak Ada!!!!</h3>
        <NavLink to="/">Back To Home</NavLink>
      </div>
    </div>
  );
};

export default NotFound;
