import React, { useState } from 'react';
import '../styles/filterBar.css'

const FilterSidebar: React.FC = () => {
  const [minBudget, setMinBudget] = useState<number>(100000);
  const [maxBudget, setMaxBudget] = useState<number>(1200000);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [modelYear, setModelYear] = useState<string>('');
  const [kmsDriven, setKmsDriven] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const modelYears = ['2023', '2022', '2021', '2020', '2019'];
  const kmsDrivenOptions = ['Under 10,000 km', '10,000 - 30,000 km', '30,000 - 50,000 km', 'Above 50,000 km'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Convertible'];
  const transmissions = ['Manual', 'Automatic'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Gray'];

  const handleCheckboxChange = (make: string) => {
    setSelectedMakes((prev) =>
      prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]
    );
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
            max={1200000}
            value={minBudget}
            onChange={(e) => setMinBudget(Number(e.target.value))}
          />
          <input
            type="range"
            min={100000}
            max={1200000}
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
          />
        </div>
        <div className="budget-values">
          <span>{`₹ ${minBudget.toLocaleString()}`}</span>
          <span>{`₹ ${maxBudget.toLocaleString()}`}</span>
        </div>
        <div className="suggestions">
          <button onClick={() => { setMinBudget(300000); setMaxBudget(500000); }}>From 3 lakh - 5 lakh</button>
          <button onClick={() => { setMinBudget(500000); setMaxBudget(700000); }}>From 5 lakh - 7 lakh</button>
          <button onClick={() => { setMinBudget(700000); setMaxBudget(1000000); }}>From 7 lakh - 10 lakh</button>
        </div>
      </div>

      {/* Make & Model Filter */}
      <div className="filter-section">
        <h5>Make & Model</h5>
        <input type="text" placeholder="Search a brand or model" className="search-input" />
      </div>

      {/* Model Year Filter */}
      <div className="filter-section">
        <h5>Model Year</h5>
        <select value={modelYear} onChange={(e) => setModelYear(e.target.value)}>
          <option value="">Select Year</option>
          {modelYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Kms Driven Filter */}
      <div className="filter-section">
        <h5>Kms Driven</h5>
        <select value={kmsDriven} onChange={(e) => setKmsDriven(e.target.value)}>
          <option value="">Select Range</option>
          {kmsDrivenOptions.map((kms) => (
            <option key={kms} value={kms}>{kms}</option>
          ))}
        </select>
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
        <h5>Transmission</h5>
        <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
          <option value="">Select Transmission</option>
          {transmissions.map((trans) => (
            <option key={trans} value={trans}>{trans}</option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <h5>Color</h5>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select Color</option>
          {colors.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
