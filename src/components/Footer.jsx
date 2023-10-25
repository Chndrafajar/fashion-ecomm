import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footerItem">
            <div className="left">
              <ul className="footerLink">
                <li className="footerLinkItem">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="footerLinkItem">
                  <NavLink to="/">Women</NavLink>
                </li>
                <li className="footerLinkItem">
                  <NavLink to="/">Mens</NavLink>
                </li>
                <li className="footerLinkItem">
                  <NavLink to="/">About</NavLink>
                </li>
                <li className="footerLinkItem">
                  <NavLink to="/">Contact</NavLink>
                </li>
              </ul>
            </div>
            <div className="right">
              <span>© 2023 FashionEcom, All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
