import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/search';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://fashion-ecom-back.cyclic.app/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="searchInput">
        <form onSubmit={handleSearch} className="searchInputItem">
          <input type="text" placeholder="Search" value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
          <BiSearch onClick={handleSearch} style={{ cursor: 'pointer' }} data-bs-dismiss="modal" />
        </form>
      </div>
    </>
  );
};

export default SearchInput;
