import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { useAuth } from '../context/auth';
import { Badge } from 'antd';

import swal from 'sweetalert';
import axios from 'axios';

import SearchInput from './SearchInput';
import { useCart } from '../context/cart';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <span>FashionEcom</span>
          </NavLink>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/p/${categories[0]?.slug}`} className="nav-link">
                {categories[0]?.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/p/${categories[1]?.slug}`} className="nav-link">
                {categories[1]?.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/women" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/women" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="icons">
            <SearchInput />
            <div className="account">
              {!auth.user ? (
                <>
                  <NavLink to="/login" className="link">
                    <BsFillPersonFill />
                  </NavLink>
                </>
              ) : (
                <>
                  <ul className="dropdownUser">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.username}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <span onClick={handleLogout} className="dropdown-item" style={{ cursor: 'pointer' }}>
                            Logout
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className="cart">
              <NavLink to="/cart" className="link">
                <Badge count={cart?.length} showZero style={{ width: '10px' }}>
                  <FaShoppingCart />
                </Badge>
              </NavLink>
            </div>
          </div>
          <div className="bars">
            <HiBars3 data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" />
          </div>
        </div>
      </nav>

      {/* mobile */}
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <NavLink to="/" className="navbar-brand">
            <span>FashionEcom</span>
          </NavLink>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            <NavLink to="/" className="list-group-item">
              Home
            </NavLink>
            <NavLink to={`/p/${categories[0]?.slug}`} className="list-group-item">
              {categories[0]?.name}
            </NavLink>
            <NavLink to={`/p/${categories[1]?.slug}`} className="list-group-item">
              {categories[1]?.name}
            </NavLink>
            <NavLink to="/women" className="list-group-item">
              About
            </NavLink>
            <NavLink to="/women" className="list-group-item">
              Contact
            </NavLink>
          </ul>
        </div>
      </div>

      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div> */}
            <div className="modal-body">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="mobileItems">
          <div className="iconsItem">
            <div className="icons">
              {!auth.user ? (
                <>
                  <NavLink to="/login" className="link">
                    <BsFillPersonFill />
                  </NavLink>
                </>
              ) : (
                <>
                  <ul className="dropdownUser">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.username}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <span onClick={handleLogout} className="dropdown-item" style={{ cursor: 'pointer' }}>
                            Logout
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className="search" data-bs-toggle="modal" data-bs-target="#searchModal">
              <BiSearch />
            </div>
            <div className="icons">
              <NavLink to="/cart" className="link">
                <Badge count={cart?.length} showZero style={{ width: '10px' }}>
                  <FaShoppingCart />
                </Badge>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
