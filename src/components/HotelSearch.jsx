'use client';

import { useState } from 'react';

const areaOptions = [
  { areaCode: '130', areaName: '東京都' },
  { areaCode: '140', areaName: '神奈川県' },
  { areaCode: '150', areaName: '埼玉県' },
  { areaCode: '160', areaName: '千葉県' },
  { areaCode: '100', areaName: '茨城県' },
  { areaCode: '110', areaName: '栃木県' },
  { areaCode: '120', areaName: '群馬県' }
];

const API_KEY = '1099156325921818167';

const fetchHotelData = async (areaCode) => {
  const url = `https://app.rakuten.co.jp/services/api/Travel/HotelSearch/20170426?format=json&applicationId=${API_KEY}&areaCode=${areaCode}&hits=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hotels || [];
  } catch (error) {
    console.error('APIリクエストエラー:', error);
    return [];
  }
};

export default function HotelSearch() {
  const [areaCode, setAreaCode] = useState('');
  const [hotelList, setHotelList] = useState([]);

  // 検索ボタンを押した際の処理
  const handleSearch = async () => {
    if (!areaCode) {
      console.warn('エリアを選択してください');
      return;
    }

    // APIからデータを取得
    const hotels = await fetchHotelData(areaCode);
    setHotelList(hotels);
  };

  return (
    <div>
      {/* エリアコード選択 */}
      <select value={areaCode} onChange={(e) => setAreaCode(e.target.value)} required>
        <option value="">エリアを選択</option>
        {areaOptions.map((area) => (
          <option key={area.areaCode} value={area.areaCode}>
            {area.areaName}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>検索</button>

      {/* 検索結果表示 */}
      {hotelList.length > 0 && (
        <div>
          <h2>検索結果:</h2>
          <ul>
            {hotelList.map((hotel, index) => (
              <li key={index}>
                <h3>{hotel.hotelName}</h3>
                <p>{hotel.hotelInfo}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
