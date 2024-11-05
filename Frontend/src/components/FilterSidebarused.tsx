import React from 'react';
import '../styles/filterBar.css';

interface FilterSidebarUsedProps {
  minBudget: number;
  setMinBudget: (value: number) => void;
  maxBudget: number;
  setMaxBudget: (value: number) => void;
  modelYear: string;
  setModelYear: (value: string) => void;
  kmsDriven: string;
  setKmsDriven: (value: string) => void;
}

const FilterSidebarUsed: React.FC<FilterSidebarUsedProps> = ({
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  modelYear,
  setModelYear,
  kmsDriven,
  setKmsDriven,
}) => {
  const modelYears = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
  const kmsDrivenOptions = [
    'Under 10,000 km',
    '10,000 - 30,000 km',
    '30,000 - 50,000 km',
    'Above 50,000 km',
  ];

  // Function to reset filters
  const resetFilters = () => {
    setMinBudget(100000); // Set to default minimum budget
    setMaxBudget(10000000); // Set to default maximum budget
    setModelYear(''); // Reset model year selection
    setKmsDriven(''); // Reset kms driven selection
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
            max={10000000}
            value={minBudget}
            onChange={(e) => setMinBudget(Number(e.target.value))}
          />
          <input
            type="range"
            min={100000}
            max={10000000}
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

      {/* Reset Filters Button */}
      <div className="filter-section">
        <button onClick={resetFilters} className="reset-button-used">Reset Filters</button>
      </div>
    </div>
  );
};

export default FilterSidebarUsed;
