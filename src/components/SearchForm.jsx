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
    console.log('Destination:', destination);
    console.log('Check-in Date:', checkInDate);

    const fetchDestinations = async () => {
      const apiKey = '1099156325921818167'; // 実際のAPIキーを使用
      const endpoint = 'https://app.rakuten.co.jp/services/api/Travel/HotelSearch/20170426';
      const params = new URLSearchParams({
        applicationId: apiKey,
        format: 'json',
        keyword: '東京',  // 検索したいキーワード（例: '東京'）
        checkinDate: '2025-02-11', // 日付は正しい形式に
        checkoutDate: '2025-02-12', // 同様に
        minCost: '10000',
        maxCost: '20000',
      });
    
      try {
        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();
        if (data.items) {
          setDestinations(data.items); // データがあれば表示
        } else {
          setDestinations([]);
        }
      } catch (error) {
        setError('データの取得に失敗しました。');
        console.error('Error fetching destinations:', error);
      }
    };
    

    fetchDestinations();
  }, [destination, checkInDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!destination || !checkInDate || !checkOutDate) {
      setError('すべての検索条件を入力してください');
      return;  // 空の入力があれば送信を中止
    }
  
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
          {destinations.length > 0 ? (
            destinations.map((dest, index) => (
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
