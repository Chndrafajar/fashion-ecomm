import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { lastItem } from '../utils/data';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useCart } from '../context/cart';

const DetailPages = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //intital details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`https://fashion-ecom-back.cyclic.app/api/v1/product/get/${params.slug}`);
      setProducts(data?.products);
      getSmiliarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get smiliar products
  const getSmiliarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`https://fashion-ecom-back.cyclic.app/api/v1/product/related-p/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="detailPages">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${products?._id}`} alt={products?.title} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-info">
                <div className="name">
                  <h4>{products?.title}</h4>
                </div>

                <div className="price">
                  <span>${products?.price}</span>
                </div>
                <div className="desc">
                  <p>{products?.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setCart([...cart, products]);
                    localStorage.setItem('cart', JSON.stringify([...cart, products]));
                    swal('Good Job!', 'Item added to cart', 'success');
                  }}
                >
                  Add Product To Cart
                </button>
                <div className="category">
                  <span>
                    <b>category:</b> {products?.category?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPages;
