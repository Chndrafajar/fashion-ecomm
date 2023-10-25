import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

const { Option } = Select;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fashion-ecom-back.cyclic.app/api/v1/auth/register', {
        username,
        email,
        password,
        phone,
        adress,
        answer,
      });
      if (res && res.data.success) {
        swal('Good Job!', res.data.message, 'success');
        navigate('/login');
      } else {
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth">
        <div className="authItem">
          <form action="" onSubmit={handleSubmit}>
            <div className="title">
              <h4>Sign Up Pages</h4>
            </div>
            <div className="formItem">
              <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} />
            </div>
            <div className="formItem">
              <input type="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="formItem">
              <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </div>
            <div className="formItem">
              <input type="number" placeholder="phone" onChange={(e) => setPhone(e.target.value)} value={phone} required />
            </div>
            <div className="formItem">
              <input type="text" placeholder="adress" onChange={(e) => setAdress(e.target.value)} value={adress} required />
            </div>
            <div className="formItem">
              <input type="text" placeholder="answer" onChange={(e) => setAnswer(e.target.value)} value={answer} required />
            </div>

            <button className="authBtn" type="submit">
              Create Account
            </button>
            <div className="createLogin">
              <span>
                Have an account? <NavLink to="/login">Log in! </NavLink>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
