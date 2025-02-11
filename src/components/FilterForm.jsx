// components/FilterForm.jsx

'use client';

import { useState } from "react";

const FilterForm = ({ onSubmit }) => {
  // 県名（middleClassCode）の選択肢
  const areaOptions = [
    { label: "徳島県", value: "tokushima" },
    { label: "香川県", value: "kagawa" },
    { label: "愛媛県", value: "ehime" },
    { label: "高知県", value: "kochi" },
  ];

  // フォームの状態
  const [selectedArea, setSelectedArea] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      area: selectedArea,
      minPrice,
      maxPrice,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>県名:</label>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">選択してください</option>
          {areaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
