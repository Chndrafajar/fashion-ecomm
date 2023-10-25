import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(['Not Process', 'Processing', 'Delivery', 'Cancel', 'Success']);
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/auth/all-orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`https://fashion-ecom-back.cyclic.app/api/v1/auth/order-status/${orderId}`, { status: value });
      getAllOrders();
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
          <div className="col-md-8 userProfile">
            <h1>Admin Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="table-orders">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Payments</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">{i + 1}</td>
                        <td>
                          <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.username}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      {o?.products?.map((p, i) => (
                        <tr>
                          <td key={p._id}>
                            <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${p._id}`} alt={p.title} width="50px" />
                          </td>
                          <td>{p.title}</td>
                          <td>{o?.buyer?.username}</td>
                          <td>${p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
