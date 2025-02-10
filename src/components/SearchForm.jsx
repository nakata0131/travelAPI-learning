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
      const apiKey = '1099156325921818167';
      const endpoint = 'https://app.rakuten.co.jp/services/api/Travel/HotelSearch/20170426';
      const params = new URLSearchParams({
        format: 'json',
        applicationId: apiKey,
        keyword: '東京',
        checkinDate: checkInDate,
        checkoutDate: checkOutDate
      });
      
    
      try {
        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();
        
        if (response.ok) {
          console.log('Response Data:', data);  // 成功した場合
        } else {
          console.error('API Error:', data);  // エラー内容を確認
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
    console.log('destination:', destination);
    console.log('checkInDate:', checkInDate);
    console.log('checkOutDate:', checkOutDate);
    
    // ここでsetSearchParamsを呼び出してAPIリクエストに必要なパラメータをセット
    setSearchParams({ destination, checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="destination">Destination:</label>
      <input
        id="destination"
        type="text"
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
