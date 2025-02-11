'use client';

import { useState, useEffect } from "react";

const FilterForm = ({ onSubmit, areaData }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 県選択時に市町村を更新する
  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedCity(""); // 県が変更されたら市町村もリセット
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      area: selectedArea,
      city: selectedCity, // 市町村も渡す
      minPrice,
      maxPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>県名:</label>
        <select value={selectedArea} onChange={handleAreaChange}>
          <option value="">選択してください</option>
          {Object.keys(areaData).map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>市町村:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedArea}
        >
          <option value="">選択してください</option>
          {selectedArea &&
            areaData[selectedArea].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>最小価格:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="5000"
        />
      </div>

      <div>
        <label>最大価格:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="15000"
        />
      </div>

      <button type="submit">検索</button>
    </form>
  );
};

export default FilterForm;
