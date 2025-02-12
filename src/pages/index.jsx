import { useState } from 'react';
import Form from '../components/Form';
import HotelList from '../components/HotelList';
import '../styles/base.css';

import { AppId } from "../config";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = async (middleClassCode, smallClassCode) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
`https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=${AppId}&format=json&largeClassCode=japan&middleClassCode=${middleClassCode}&smallClassCode=${smallClassCode}`
      );
  
      if (!response.ok) throw new Error("ホテル情報の取得に失敗しました");
  
      const data = await response.json();
      console.log("取得したホテル情報:", data);
  
      if (data.hotels) {
        setHotels(data.hotels);
      } else {
        console.error("ホテル情報が存在しません");
      }
    } catch (err) {
      console.error("データの取得に失敗しました", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="centered-container">
      <h1>四国ホテル検索</h1>
      <Form onSearch={fetchHotels} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>検索中...</p> : <HotelList hotels={hotels} />}
    </div>
  );
}
