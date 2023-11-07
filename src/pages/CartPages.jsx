import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import { BsX } from 'react-icons/bs';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPages = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //total price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + +item.price;
      });
      return total.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      swal('Good Job!', 'Deleted product cart completed', 'success');

      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get('https://fashion-ecom-back.cyclic.app/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('https://fashion-ecom-back.cyclic.app/api/v1/product/braintree/payment', { nonce, cart });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/orders');
      swal('Good Job!', 'Payment completed successfully', 'success');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {cart?.map((p) => (
                <>
                  <div className="cartItem" key={p?._id}>
                    {/* <div className="iconX" onClick={() => removeCartItem(p._id)}>
                    <BsX />
                  </div> */}
                    <div className="imgItem">
                      <img src={`https://fashion-ecom-back.cyclic.app/api/v1/product/image/${p?._id}`} alt={p?.title} />
                    </div>

                    <div className="info">
                      <h4>{p?.title}</h4>
                      <p>{p?.desc?.substring(0, 95)}..</p>
                      <h5>${p?.price}</h5>
                      <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>
                        Remove Product
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card shadow p-4 border-0">
                <div className="checkout">
                  <span className="total">Total: {totalPrice()}</span>
                  {/* <button className="btnCheckout">Checkout</button> */}
                </div>
                {auth?.user?.adress ? (
                  <>
                    <div className="mt-3">
                      <h5>Current Adress</h5>
                      <h6>{auth?.user?.adress}</h6>
                      <button style={{ width: '100%' }} className="btn btn-outline-warning" onClick={() => navigate('/dashboard/profile')} data-bs-dismiss="offcanvas" aria-label="Close" type="button">
                        Update Adress
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3">
                      {auth?.token ? (
                        <button className="btn btn-outline-warning" data-bs-dismiss="offcanvas" aria-label="Close" type="button" onClick={() => navigate('/dashboard/user/profile')}>
                          Update Adress
                        </button>
                      ) : (
                        <button
                          style={{ width: '100%' }}
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate('/login', {
                              state: '/cart',
                            })
                          }
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                          type="button"
                        >
                          Please login to checkout
                        </button>
                      )}
                    </div>
                  </>
                )}
                <div className="mt-2">
                  {!clientToken || !cart?.length ? (
                    ''
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: 'vault',
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button className="btn btn-success" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.adress}>
                        {loading ? 'Processing ....' : 'Make Payment'}
                      </button>
                    </>
                  )}
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

export default CartPages;
