import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { NavLink, useParams } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';

import { BsFillPenFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import swal from 'sweetalert';

const AdminProduct = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/product/get');
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <NavbarAdmin auth={auth} />

      <div className="container admin ">
        <div className="row">
          <div className="col-md-4">
            <SidebarAdmin />
          </div>
          <div className="col-md-8 adminProduct">
            <h3>Admin Product</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">image</th>
                  <th scope="col">title</th>
                  <th scope="col">price</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((p) => (
                  <tr key={p._id}>
                    <td>-</td>
                    <th scope="row" key={p._id}>
                      <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${p._id}`} alt={p.title} className="tableProduct" />
                    </th>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>
                      <div className="action">
                        <NavLink to={`/dashboard/admin-product/${p.slug}`}>
                          <button className="btn btn-success">
                            <BsFillPenFill />
                          </button>
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
