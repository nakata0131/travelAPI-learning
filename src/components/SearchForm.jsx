import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [areaCode, setAreaCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (areaCode) {
      onSearch(areaCode);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>エリアを選択:</label>
      <select value={areaCode} onChange={(e) => setAreaCode(e.target.value)}>
        <option value="">選択してください</option>
        <option value="130000">東京</option>
        <option value="270000">大阪</option>
        <option value="010000">北海道</option>
      </select>
      <button type="submit">検索</button>
    </form>
  );
};

export default SearchForm;
