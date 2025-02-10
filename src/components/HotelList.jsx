"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "../context/App.context";

export default function HotelList() {
  const { searchParams } = useAppContext();
  const [hotels, setHotels] = useState([]);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams?.destination || !searchParams?.checkInDate || !searchParams?.checkOutDate) {
      console.warn("検索条件が不足しています:", searchParams);
      return; // 必要な情報がない場合は何もしない
    }
  
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const apiKey = "1099156325921818167";
        const url = `https://app.rakuten.co.jp/services/api/Travel/HotelSearch/20170426?applicationId=${apiKey}&format=json&area=${searchParams.destination}&checkinDate=${searchParams.checkInDate}&checkoutDate=${searchParams.checkOutDate}&minCost=10000&maxCost=20000`;


        const areaUrl = `https://app.rakuten.co.jp/services/api/Travel/GetAreaClass/20131024?format=json&applicationId=${apiKey}`;

fetch(areaUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
        const response = await fetch(url);
        if (!response.ok) throw new Error("データの取得に失敗しました");
  
        const data = await response.json();
        console.log("APIレスポンス:", data);
        setHotels(data.hotels || []);
      } catch (err) {
        setError(err.message);
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
      {!loading && hotels === null && <p>検索結果を取得中...</p>}
      {!loading && hotels !== null && hotels.length === 0 && <p>検索結果がありません</p>}


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
