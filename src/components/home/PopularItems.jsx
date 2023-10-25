import React from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PopularItems = ({ products }) => {
  return (
    <>
      <div className="popular-item">
        <div className="container">
          <div className="row">
            <div className="title">
              <h1>Popular Items</h1>
              <div className="line"></div>
              <p>search and get various products that you like here, get the best products here</p>
            </div>
          </div>
          <div className="row mt-4">
            {products?.map((p) => (
              <div className="col-md-4 col-sm-6 col-lg-3 mb-5" key={p._id}>
                <div className="card">
                  <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${p?._id}`} alt={p.name} />
                  <div className="title">
                    <div className="items">
                      <h4>{p.title.substring(0, 25)}...</h4>
                      <div className="icons">
                        <NavLink to={`/detail/${p?.slug}`} className="link">
                          <div className="iconsItem">
                            <FaEye />
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h4>{p.name}</h4>
                  <div className="price">
                    <span>${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularItems;
