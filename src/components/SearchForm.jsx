'use client';

import { useState } from 'react';

// 関東地方の都県とエリアコードのマッピング（例）
const areaMapping = {
  "東京": "130010",
  "神奈川": "140010",
  "埼玉": "110010",
  "千葉": "120010",
  "茨城": "080010",
  "栃木": "090010",
  "群馬": "100010",
};

export default function SearchForm({ onSearch }) {
  // ユーザーが選択する都県の表示名を保持
  const [areaName, setAreaName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!areaName || !checkInDate || !checkOutDate) {
      setError('すべての検索条件を入力してください');
      return;
    }
    // マッピングからエリアコードに変換
    const areaCode = areaMapping[areaName];
    if (!areaCode) {
      setError('入力されたエリアに対応するコードが見つかりません');
      return;
    }
    // エリアコードを含めた検索条件を渡す
    onSearch({ destination: areaCode, checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="areaName">エリア:</label>
        <select
          id="areaName"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
          required
        >
          <option value="">選択してください</option>
          {Object.keys(areaMapping).map((pref, index) => (
            <option key={index} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="checkInDate">チェックイン日:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="checkOutDate">チェックアウト日:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">検索</button>
    </form>
  );
}
