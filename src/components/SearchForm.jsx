import React, { useState } from 'react';
import { useAppContext } from '../context/App.context';

export default function SearchForm() {
  const { setSearchParams } = useAppContext();
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ destination, checkInDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
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
      <button type="submit">Search</button>
    </form>
  );
}
