import { Route, Routes } from 'react-router-dom';

//pages

//components

import HomePages from './pages/HomePages';
import { Login, SignUp } from './pages/auth';

import PrivateRoute from './components/routes/PrivateRoute';
import { AddProduct, Orders, Profile, UserDashboard } from './pages/user';

import { AdminRoute } from './components/routes/AdminRoute';
import { AdminDashboard, AdminOrders, AdminProduct, AdminProfile, UpdateAndDelete } from './pages/admin';
import ProductCategory from './pages/ProductCategory';
import SearchProduct from './pages/SearchProduct';
import DetailPages from './pages/DetailPages';
import CartPages from './pages/CartPages';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePages />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cart" element={<CartPages />} />
      <Route path="/p/:slug" element={<ProductCategory />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/detail/:slug" element={<DetailPages />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<UserDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="admin-orders" element={<AdminOrders />} />
        <Route path="admin-add-product" element={<AddProduct />} />
        <Route path="admin-product" element={<AdminProduct />} />
        <Route path="admin-product/:slug" element={<UpdateAndDelete />} />
      </Route>
    </Routes>
  );
}

export default App;
