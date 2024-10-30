import React, { useCallback } from "react";
import Slider from "@mui/material/Slider";
import './FilterPanel.css';

const FilterPanel = ({ filters, setFilters, debounceFilter }) => {
  const handleCategoryChange = (e) =>
    debounceFilter({ ...filters, category: e.target.value });

  const handleBrandChange = (e) =>
    debounceFilter({ ...filters, brand: e.target.value });

  const handlePriceChange = (e, newValue) => 
    debounceFilter({ ...filters, priceRange: newValue });

  const handleRatingChange = (e) =>
    debounceFilter({ ...filters, rating: Number(e.target.value) });

  return (
    <div className="filter-panel">
      <div>
        <label>Category:</label>
        <select onChange={handleCategoryChange} value={filters.category}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      <div>
        <label>Brand:</label>
        <select onChange={handleBrandChange} value={filters.brand}>
          <option value="">All</option>
          <option value="Brand A">Brand A</option>
          <option value="Brand B">Brand B</option>
          <option value="Brand C">Brand C</option>
          <option value="Brand D">Brand D</option>
          <option value="Brand E">Brand E</option>
        </select>
      </div>

      <div>
        <label>Price Range:</label>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500}
        />
      </div>

      <div>
        <label>Minimum Rating:</label>
        <select onChange={handleRatingChange} value={filters.rating}>
          <option value="0">All</option>
          <option value="3">3 Stars & Up</option>
          <option value="4">4 Stars & Up</option>
          <option value="4.5">4.5 Stars & Up</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
