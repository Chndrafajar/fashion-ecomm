import React, { useEffect, useState } from 'react';
import { lastItem } from '../../utils/data';
import axios from 'axios';
import swal from 'sweetalert';
import { useCart } from '../../context/cart';
import { NavLink } from 'react-router-dom';

const LastItem = ({ products }) => {
  const [cart, setCart] = useCart();

  return (
    <>
      <div className="last-item">
        <div className="container">
          <div className="row">
            <div className="title">
              <h1>Our last Item</h1>
              <p>search and get various products that you like here, get the best products here</p>
            </div>
          </div>
          <div className="row mt-4">
            <>
              <div className="col-md-6" key={products[0]?._id}>
                <div className="card">
                  <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${products[0]?._id}`} alt={products[0]?.title} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-info">
                  <div className="name">
                    <h4>{products[0]?.title}</h4>
                  </div>
                  <div className="price">
                    <span>${products[0]?.price}</span>
                  </div>
                  <div className="desc">
                    <p>{products[0]?.desc}</p>
                  </div>
                  <NavLink to={`/detail/${products[0]?.slug}`}>
                    <button>Buy Product</button>
                  </NavLink>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastItem;
