"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../context/App.context";

export default function HotelList() {
  const { searchParams } = useAppContext();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams || !searchParams.destination || !searchParams.checkInDate) {
      console.error("Destination or check-in date is missing");
      return;
    }

    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = "http://jws.jalan.net/APIAdvance/HotelSearch/V1/";
        const response = await fetch(
          `https://jws.jalan.net/APICommon/HotelSearch/V1/?key=${apiKey}&s_area=${searchParams.destination}&checkin=${searchParams.checkInDate}&count=10&format=json`
        );

        if (!response.ok) throw new Error("データの取得に失敗しました");

        const data = await response.json();
        setHotels(data.hotels || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]); // searchParamsの変更をトリガーにしてAPI呼び出し

  return (
    <div>
      <h2>宿泊施設リスト</h2>
      {loading && <p>検索中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && hotels.length === 0 && <p>検索結果がありません</p>}

      <ul>
        {hotels.map((hotel, index) => (
          <li key={index}>
            <h3>{hotel.hotelName}</h3>
            <p>住所: {hotel.address1} {hotel.address2}</p>
            <p>料金: {hotel.sampleRate}円〜</p>
            <img src={hotel.hotelImageUrl} alt={hotel.hotelName} width="150" />
            <p>
              <a href={`/hotel/${hotel.hotelNo}`}>詳細を見る</a> 
            </p>
            <button>⭐ お気に入り追加</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
