// /src/components/HotelSearch.jsx
'use client';

import { useState } from 'react';

export default function HotelSearch({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !checkInDate || !checkOutDate) {
      setError('すべての検索条件を入力してください');
      return;
    }
    // エラーメッセージをクリアして、上位コンポーネントへ検索条件を渡す
    setError('');
    onSearch({ destination, checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <div>
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          placeholder="例: 東京"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="checkInDate">Check-in Date:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        検索する
      </button>
    </form>
  );
}
