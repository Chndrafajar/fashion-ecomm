import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { NavLink } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import NavbarUser from './NavbarUser';
import axios from 'axios';
import moment from 'moment';

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/auth/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <NavbarUser auth={auth} />

      <div className="container user">
        <div className="row">
          <div className="col-md-4">
            <SidebarMenu />
          </div>
          <div className="col-md-8 userProfile">
            <h1>Orders</h1>
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
                        <th scope="row">{i + 1}</th>
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
                          <td>
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

export default Orders;
