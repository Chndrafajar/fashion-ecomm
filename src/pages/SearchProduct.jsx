import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ItemPopular } from '../utils/data';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Select } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search';

const { Option } = Select;

const SearchProduct = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="popular-item">
        <div className="container">
          <div className="row">
            <div className="filter">
              <h4 className="text-center">{values?.results.length < 1 ? 'No product founds' : `Search Product Found ${values?.results.length}`}</h4>
              <div className="filterOption">
                <Select bordered={false} placeholder="Select a role" size="large" showSearch className="form-select mb-3">
                  {/* <Option>Women</Option>
                  <Option>Mens</Option> */}
                </Select>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            {values?.results.map((p) => (
              <div className="col-md-4 col-sm-6 col-lg-3 mb-5" key={p.id}>
                <div className="card">
                  <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${p._id}`} alt={p.title} />
                  <div className="icons">
                    <div className="iconsItem">
                      <FaEye data-bs-toggle="modal" data-bs-target="#exampleModal" />
                    </div>
                    <div className="iconsItem">
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h4>{p.title}</h4>
                  <div className="price">
                    <span>${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchProduct;
