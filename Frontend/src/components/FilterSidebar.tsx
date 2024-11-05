import React from 'react';
import '../styles/filterBar.css';

interface FilterSidebarProps {
  minBudget: number;
  setMinBudget: React.Dispatch<React.SetStateAction<number>>;
  maxBudget: number;
  setMaxBudget: React.Dispatch<React.SetStateAction<number>>;
  fuelType: string;
  setFuelType: React.Dispatch<React.SetStateAction<string>>;
  bodyType: string;
  setBodyType: React.Dispatch<React.SetStateAction<string>>;
  transmission: string;
  setTransmission: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  fuelType,
  setFuelType,
  bodyType,
  setBodyType,
  transmission,
  setTransmission,
}) => {
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Convertible'];
  const transmissions = ['Manual', 'Automatic'];

  // Function to reset all filters to their initial values
  const resetFilters = () => {
    setMinBudget(100000); // or any default minimum budget you want
    setMaxBudget(50000000); // or any default maximum budget you want
    setFuelType('');
    setBodyType('');
    setTransmission('');
  };

  return (
    <div className="filter-sidebar">
      {/* Budget Filter */}
      <div className="filter-section">
        <h5>Budget</h5>
        <div className="slider-container">
          <input
            type="range"
            min={100000}
            max={50000000}
            value={minBudget}
            onChange={(e) => setMinBudget(Number(e.target.value))}
          />
          <input
            type="range"
            min={100000}
            max={50000000}
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
          />
        </div>
        <div className="budget-values">
          <span>{`₹ ${minBudget.toLocaleString()}`}</span>
          <span>{`₹ ${maxBudget.toLocaleString()}`}</span>
        </div>
        <div className="suggestions">
          <button onClick={() => { setMinBudget(300000); setMaxBudget(1000000); }}>From 3 lakh - 10 lakh</button>
          <button onClick={() => { setMinBudget(1000000); setMaxBudget(7000000); }}>From 10 lakh - 70 lakh</button>
          <button onClick={() => { setMinBudget(7000000); setMaxBudget(20000000); }}>From 70 lakh - 2 crore</button>
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="filter-section">
        <h5>Fuel</h5>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="">Select Fuel Type</option>
          {fuelTypes.map((fuel) => (
            <option key={fuel} value={fuel}>{fuel}</option>
          ))}
        </select>
      </div>

      {/* Body Type Filter */}
      <div className="filter-section">
        <h5>Body Type</h5>
        <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
          <option value="">Select Body Type</option>
          {bodyTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Transmission Filter */}
      <div className="filter-section">
        <h5>Transmission Type</h5>
        <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
          <option value="">Select Transmission Type</option>
          {transmissions.map((trans) => (
            <option key={trans} value={trans}>{trans}</option>
          ))}
        </select>
      </div>

      {/* Reset Filters Button */}
      <div className="reset-button-container">
        <button onClick={resetFilters} className="reset-button">Reset Filters</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
