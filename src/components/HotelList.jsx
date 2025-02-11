'use client';

import { useState, useEffect } from 'react';

const API_KEY = "1099156325921818167"; // ご自分の楽天APIのアプリIDを設定

export default function HotelList({ searchParams }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (
      !searchParams ||
      !searchParams.hotelNo
    ) {
      console.warn("検索条件が不足しています:", searchParams);
      return;
    }

    setLoading(true);
    setError('');

    const fetchHotels = async () => {
      try {
        // 施設番号(hotelNo)を使った検索（SimpleHotelSearch/20131024）
        const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?applicationId=${API_KEY}&format=json&hotelNo=${searchParams.hotelNo}&hits=5`;
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">宿泊施設詳細</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>検索中...</p>
      ) : hotels.length === 0 ? (
        <p>検索結果がありません</p>
      ) : (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index} className="border p-4 mt-2 rounded">
              <h3 className="font-semibold">{hotel.hotel[0].hotelBasicInfo.hotelName}</h3>
              <p>住所: {hotel.hotel[0].hotelBasicInfo.hotelInformationUrl}</p>
              <p>料金: {hotel.hotel[0].hotelBasicInfo.hotelMinCharge}円〜</p>
              <a href={`/hotel-detail?id=${hotel.hotel[0].hotelBasicInfo.hotelNo}`}>
                詳細を見る
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
