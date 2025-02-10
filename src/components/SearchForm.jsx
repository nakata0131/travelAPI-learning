'use client';

import { useState } from 'react';

export default function SearchForm({ onSearch }) {
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
    // 入力された値を上位コンポーネントに渡す
    onSearch({ destination, checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          placeholder="例: 東京"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
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
