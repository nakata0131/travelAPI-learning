'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_KEY = "1099156325921818167";

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchHotelDetail = async () => {
      try {
        const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?applicationId=${API_KEY}&format=json&hotelNo=${id}&hits=1`;
        console.log("Detail Fetch URL:", url);
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          setError(data.error_description || "不明なエラー");
        } else if (data.hotels && data.hotels.length > 0) {
          setHotel(data.hotels[0]);
        } else {
          setError("ホテル情報が見つかりませんでした。");
        }
      } catch (err) {
        setError("データの取得に失敗しました。");
        console.error("Detail Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotelDetail();
  }, [id]);

  if (loading) return <p>ロード中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!hotel) return <p>ホテル情報がありません</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{hotel.hotel[0].hotelBasicInfo.hotelName}</h1>
      <p>住所: {hotel.hotel[0].hotelBasicInfo.hotelInformationUrl}</p>
      <p>料金: {hotel.hotel[0].hotelBasicInfo.hotelMinCharge}円〜</p>
      {/* その他の詳細情報 */}
    </div>
  );
}
