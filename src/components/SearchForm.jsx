'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '../context/App.context';

export default function SearchForm() {
  const { setSearchParams } = useAppContext();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      const apiKey = '1099156325921818167'; 
      const endpoint = 'https://app.rakuten.co.jp/services/api/Travel/Search/SimpleHotel/20170426';
      const params = new URLSearchParams({
        format: 'json',
        applicationId: apiKey,
        keyword: '東京',  // ここで検索したいキーワードを指定する
      });

      try {
        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        // レスポンスを確認
        if (data.items) {
          setDestinations(data.items); // `data.items`にホテル情報が格納されている場合
        } else {
          setDestinations([]);
        }
      } catch (error) {
        setError('データの取得に失敗しました。');
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  // 追加する地名リスト
  const additionalDestinations = [
    { name: '大阪' },
    { name: '京都' },
    { name: '北海道' },
    { name: '沖縄' },
  ];

  // 既存の地名と追加の地名を結合
  const allDestinations = [...destinations, ...additionalDestinations];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ destination, checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          <option value="">Select a destination</option>
          {allDestinations.length > 0 ? (
            allDestinations.map((dest, index) => (
              <option key={index} value={dest.name}>
                {dest.name}
              </option>
            ))
          ) : (
            <option value="">No destinations available</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="checkInDate">Check-in Date:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="checkOutDate">Check-out Date:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
}