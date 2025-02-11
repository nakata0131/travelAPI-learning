'use client';

import { useState } from 'react';

export default function HotelSearch({ onSearch }) {
  // 入力状態を管理するための useState
  const [areaCode, setAreaCode] = useState('');
  const [hotelName, setHotelName] = useState('');

  // 検索ボタンが押されたときの処理
  const handleSearch = () => {
    // 必須パラメータのバリデーション
    if (!areaCode && !hotelName) {
      alert('エリアコードまたはホテル名を入力してください');
      return;
    }

    // 検索パラメータを設定
    onSearch({ areaCode, hotelName });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <label className="block text-sm font-medium text-gray-700">エリアコード</label>
      <select
        className="w-full p-2 border rounded-md mb-4"
        value={areaCode}
        onChange={(e) => setAreaCode(e.target.value)}
      >
        <option value="">エリアを選択</option>
        <option value="130">東京都</option>
        <option value="270">大阪府</option>
        <option value="010">北海道</option>
      </select>

      <label className="block text-sm font-medium text-gray-700">ホテル名</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="ホテル名を入力"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleSearch}
      >
        検索
      </button>
    </div>
  );
}
