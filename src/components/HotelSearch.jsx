'use client';

import { useState } from 'react';

// 例として、関東主要県のエリア（※エリアコードは例です）
const areaOptions = [
  { areaCode: '130010', areaName: '東京都' },
  { areaCode: '140010', areaName: '神奈川県' },
  { areaCode: '150010', areaName: '埼玉県' },
  { areaCode: '160010', areaName: '千葉県' }
];

// 有名ホテルの選択肢（施設コード：hotelNo）は、実際の楽天トラベルAPIのコードを使う必要があります。
// ここでは例として仮の値を使用しています。
const hotelOptions = [
  { hotelNo: '1001', hotelName: 'ルートイン' },
  { hotelNo: '1002', hotelName: 'ニューオータニ' },
  { hotelNo: '1003', hotelName: 'アパホテル' },
  { hotelNo: '1004', hotelName: 'ホテルオークラ' }
];

export default function HotelSearch({ onSearch }) {
  // 各入力値の状態管理
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedHotelNo, setSelectedHotelNo] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // 必須チェック
    if (!selectedArea || !selectedHotelNo) {
      alert('エリアとホテルを選択してください');
      return;
    }
    // 検索条件を上位コンポーネントへ渡す
    // ※ここでは、楽天APIで施設検索に必要なパラメータとして「hotelNo」を使用します。
    onSearch({
      areaCode: selectedArea, // エリアは参考用。実際のリクエストでは「largeClassCode」と「middleClassCode」を使う場合もあります。
      hotelNo: selectedHotelNo
    });
  };

  return (
    <form onSubmit={handleSearch} className="p-4 border rounded-md">
      <div className="mb-4">
        <label htmlFor="areaSelect" className="block font-medium">
          エリアを選択:
        </label>
        <select
          id="areaSelect"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">エリアを選択</option>
          {areaOptions.map((area) => (
            <option key={area.areaCode} value={area.areaCode}>
              {area.areaName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="hotelSelect" className="block font-medium">
          ホテルを選択:
        </label>
        <select
          id="hotelSelect"
          value={selectedHotelNo}
          onChange={(e) => setSelectedHotelNo(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">ホテルを選択</option>
          {hotelOptions.map((hotel) => (
            <option key={hotel.hotelNo} value={hotel.hotelNo}>
              {hotel.hotelName}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        検索する
      </button>
    </form>
  );
}
