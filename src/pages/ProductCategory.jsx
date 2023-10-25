import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Select } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cart';
import swal from 'sweetalert';
import Loading from '../components/Loading';

import { Prices } from '../context/Prices';
import FilterOffcanvas from '../components/FilterOffcanvas';

const { Option } = Select;

const ProductCategory = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [loading, setLoading] = useState(false);

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

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://fashion-ecom-back.cyclic.app/api/v1/product/p-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //by category
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);

  //by price
  useEffect(() => {
    if (!checked.length || !radio.length) getProductByCategory();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (!checked.length || !radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post('https://fashion-ecom-back.cyclic.app/api/v1/product/product-filter', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="popular-item">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Product Category by {category?.name}</h2>
              <div className="line"></div>
              <p>search and get various products that you like here, get the best products here</p>
            </div>
            {/* <div className="filter">
              <h4>Category by {category?.name}</h4>
              <div className="filterOption" data-bs-toggle="offcanvas" data-bs-target="#filter" aria-controls="filter">
                filter
              </div>
            </div> */}
          </div>
          <div className="row mt-3">
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
      <FilterOffcanvas categories={categories} Prices={Prices} setRadio={setRadio} />

      <Footer />
    </>
  );
};

export default ProductCategory;
