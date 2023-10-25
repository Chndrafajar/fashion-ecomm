import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fashion-ecom-back.cyclic.app/api/v1/auth/login', {
        email,
        password,
      });
      if (res && res.data.success) {
        swal('Good Job!', res.data.message, 'success');
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
      swal('Miss!', 'Login error', 'error');
    }
  };

  return (
    <div className="auth">
      <div className="authItem">
        <form action="" onSubmit={handleSubmit}>
          <div className="title">
            <h4>Login Pages</h4>
          </div>
          <div className="formItem">
            <input type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formItem">
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>
          <button className="authBtn" type="submit">
            Login Account
          </button>
          <div className="createLogin">
            <span>
              Don't have account yet? <NavLink to="/signup">Sign Up!</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
