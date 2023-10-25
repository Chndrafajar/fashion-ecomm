import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';
const { Option } = Select;
import swal from 'sweetalert';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';

const UpdateAndDelete = () => {
  const [auth] = useAuth();
  const [category, setCategory] = useState('');
  const [shipping, setShipping] = useState('');
  const [quantity, setQuantity] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`https://fashion-ecom-back.cyclic.app/api/v1/product/get/${params.slug}`);
      setTitle(data.products.title);
      setId(data.products._id);
      setDesc(data.products.desc);
      setPrice(data.products.price);
      setQuantity(data.products.quantity);
      setShipping(data.products.shipping);
      setCategory(data.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint- disable - next - line
  }, []);

  //get category
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

  //create
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('title', title);
      productData.append('desc', desc);
      productData.append('price', price);
      productData.append('quantity', quantity);
      image && productData.append('image', image);
      productData.append('category', category);
      const { data } = axios.put(`https://fashion-ecom-back.cyclic.app/api/v1/product/update/${id}`, productData);
      if (data?.success) {
        swal('Miss!', data?.message, 'error');
      } else {
        swal('Good Job!', 'Update product successfully', 'success');
        navigate('/dashboard/admin-product');
      }
    } catch (error) {
      console.log(error);
      swal('Miss!', 'Create product error', 'error');
    }
  };

  //delete
  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(`https://fashion-ecom-back.cyclic.app/api/v1/product/delete/${id}`);
      if (data?.success) {
        swal('Good Job!', data?.message, 'success');
      } else {
        navigate('/dashboard/admin-product');
        swal('Good Job!', 'Delete product successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarAdmin auth={auth} />

      <div className="container admin">
        <div className="row">
          <div className="col-md-4">
            <SidebarAdmin />
          </div>
          <div className="col-md-8 addProduct">
            <h3>Create Product</h3>
            <div className="form">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : 'Upload Image'}
                  <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
                </label>
              </div>
              <div className="mb-3">
                {image && (
                  <div className="text-center">
                    <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${id}`} alt="product_image" height={'200px'} className="img img-responsive" />
                  </div>
                )}
              </div>
              <div className="formItem">
                <label htmlFor="">Title Product</label>
                <input type="text" placeholder="name product" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="formItem">
                <label htmlFor="">Descrpition Product</label>
                <textarea name="" id="" cols="30" rows="10" placeholder="description product" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
              <div className="formItem">
                <label htmlFor="">Price Product</label>
                <input type="number" placeholder="price product" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="formItem">
                <label htmlFor="">Category Product</label>
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="formItem">
                <label htmlFor="">Quantity Product</label>
                <input type="number" placeholder="quantity product" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="formItem">
                <label htmlFor="">Shipping Product</label>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <button onClick={handleUpdate} className="btn" style={{ backgroundColor: 'orange' }}>
                Update Product
              </button>
              <button className="btn btn-danger mt-4" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAndDelete;
