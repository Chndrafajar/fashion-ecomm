import React from 'react';
import { Checkbox, Radio } from 'antd';

const FilterOffcanvas = ({ categories, Prices, setRadio }) => {
  return (
    <>
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="filter" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <div className="navbar-brand">
            <span>FashionEcom</span>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <div>
            <h5>Categories</h5>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <div className="mt-2">
            <h5>Prices</h5>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterOffcanvas;
