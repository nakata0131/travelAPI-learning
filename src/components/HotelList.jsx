'use client';

import { useState, useEffect } from 'react';

const applicationId = "1099156325921818167";

export default function HotelList({ searchParams }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 検索条件が揃っていない場合は処理しない
    if (!searchParams || !searchParams.destination || !searchParams.checkInDate || !searchParams.checkOutDate) {
      console.warn("検索条件が不足しています:", searchParams);
      return;
    }

    const fetchHotels = async () => {
      setLoading(true);
      setError("");
    
      try {
        const apiKey = "1099156325921818167"; // 楽天トラベルAPIのアプリケーションID
        const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?applicationId=${apiKey}&format=json&keyword=${encodeURIComponent(searchParams.destination)}&checkinDate=${searchParams.checkInDate}&checkoutDate=${searchParams.checkOutDate}&page=1&hits=10`;
        
        console.log("Fetching URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data);
    
        if (data.error) {
          setError(data.error_description || "不明なエラー");
        } else if (data.hotels) {
          setHotels(data.hotels);
        } else {
          setError("ホテル情報が見つかりませんでした。");
        }
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchHotels();
  }, [searchParams]);

  return (
    <div>
      <h2>宿泊施設リスト</h2>
      {loading && <p>検索中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && hotels.length === 0 && <p>検索結果がありません</p>}
      <ul>
        {hotels.map((hotel, index) => (
          // レスポンスの構造に合わせて表示内容を調整してください。
          <li key={index}>
            <h3>{hotel.hotel[0].hotelBasicInfo.hotelName}</h3>
            <p>住所: {hotel.hotel[0].hotelBasicInfo.hotelInformationUrl}</p>
            <p>料金: {hotel.hotel[0].hotelBasicInfo.hotelMinCharge}円〜</p>
            <a href={`/hotel/${hotel.hotel[0].hotelBasicInfo.hotelNo}`}>詳細を見る</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
