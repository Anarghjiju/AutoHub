// src/components/FilterSidebar.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterSidebar: React.FC = () => {
  return (
    <div className="filter-sidebar p-3 border rounded bg-light">
      <h5 className="mb-3">Filters</h5>

      {/* Sort by Section */}
      <div className="mb-4">
        <h6 
          className="collapse-toggle" 
          data-bs-toggle="collapse" 
          data-bs-target="#sortCollapse" 
          role="button" 
          aria-expanded="false" 
          aria-controls="sortCollapse"
        >
          Sort by
        </h6>
        <div className="collapse show" id="sortCollapse">
          <div className="form-check">
            <input type="radio" name="sort" id="sortName" className="form-check-input" />
            <label className="form-check-label" htmlFor="sortName">Name</label>
          </div>
          <div className="form-check">
            <input type="radio" name="sort" id="sortPrice" className="form-check-input" />
            <label className="form-check-label" htmlFor="sortPrice">Price</label>
          </div>
          <div className="form-check">
            <input type="radio" name="sort" id="sortModel" className="form-check-input" />
            <label className="form-check-label" htmlFor="sortModel">Model</label>
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-4">
        <h6 
          className="collapse-toggle" 
          data-bs-toggle="collapse" 
          data-bs-target="#priceCollapse" 
          role="button" 
          aria-expanded="false" 
          aria-controls="priceCollapse"
        >
          Price Range
        </h6>
        <div className="collapse show" id="priceCollapse">
          <div className="form-check">
            <input type="checkbox" id="priceLow" className="form-check-input" />
            <label className="form-check-label" htmlFor="priceLow">Below $20,000</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="priceMid" className="form-check-input" />
            <label className="form-check-label" htmlFor="priceMid">$20,000 - $50,000</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="priceHigh" className="form-check-input" />
            <label className="form-check-label" htmlFor="priceHigh">Above $50,000</label>
          </div>
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-4">
        <h6 
          className="collapse-toggle" 
          data-bs-toggle="collapse" 
          data-bs-target="#brandCollapse" 
          role="button" 
          aria-expanded="false" 
          aria-controls="brandCollapse"
        >
          Brand
        </h6>
        <div className="collapse show" id="brandCollapse">
          <div className="form-check">
            <input type="checkbox" id="brandAudi" className="form-check-input" />
            <label className="form-check-label" htmlFor="brandAudi">Audi</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="brandBMW" className="form-check-input" />
            <label className="form-check-label" htmlFor="brandBMW">BMW</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="brandToyota" className="form-check-input" />
            <label className="form-check-label" htmlFor="brandToyota">Toyota</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
