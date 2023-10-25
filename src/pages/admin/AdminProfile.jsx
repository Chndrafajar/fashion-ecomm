import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';
import swal from 'sweetalert';

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  //get user
  useEffect(() => {
    const { username, email, phone, adress, answer } = auth.user;
    setUsername(username);
    setEmail(email);
    setPhone(phone);
    setAdress(adress);
    setAnswer(answer);
  }, []);

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('https://fashion-ecom-back.cyclic.app/api/v1/auth/update-profile', {
        username,
        email,
        password,
        phone,
        adress,
        answer,
      });
      if (data?.error) {
        swal('Miss!', data?.error, 'error');
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem('auth', JSON.stringify(ls));
        navigate('/dashboard/user');
        swal('Good Job!', 'Profil Updated successfully', 'success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarAdmin auth={auth} />

      <div className="container admin ">
        <div className="row">
          <div className="col-md-4">
            <SidebarAdmin />
          </div>
          <div className="col-md-8 userProfile">
            <div className="userProfileItem">
              <form action="" onSubmit={handleSubmit}>
                <div className="title">
                  <h4>User Profile</h4>
                </div>
                <div className="formItem">
                  <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="formItem">
                  <input type="email" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="formItem">
                  <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="formItem">
                  <input type="text" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="formItem">
                  <input type="text" placeholder="adress" value={adress} onChange={(e) => setAdress(e.target.value)} />
                </div>
                <div className="formItem">
                  <input type="text" placeholder="adress" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <button className="authBtn" type="submit">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
