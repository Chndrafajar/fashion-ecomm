import React, { useEffect, useState } from 'react';
import { HeroSection, Join, LastItem, PopularItems } from '../components/home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import axios from 'axios';

const HomePages = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //getAll product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/product/get');
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

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
      <HeroSection />
      <PopularItems products={products} />
      <LastItem products={products} />
      <Join />

      <Footer />
    </>
  );
};

export default HomePages;
