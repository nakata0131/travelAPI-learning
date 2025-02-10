'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function HotelDetailPage() {
  const { id } = useParams(); // URLの id を取得
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const apiKey = "YOUR_JALAN_API_KEY"; // じゃらんAPIのキー
        const response = await fetch(
          `https://jws.jalan.net/APICommon/HotelSearch/V1/?key=${apiKey}&h_id=${id}&format=json`
        );

        if (!response.ok) throw new Error("データの取得に失敗しました");

        const data = await response.json();
        setHotel(data.hotels[0]); // 取得したホテル情報をセット
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetail();
    }
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!hotel) return <p>ホテル情報が見つかりません。</p>;

  return (
    <div>
      <h2>{hotel.hotelName}</h2>
      <p>住所: {hotel.address1} {hotel.address2}</p>
      <p>料金: {hotel.sampleRate}円〜</p>
      <p><a href={hotel.hotelInformationUrl} target="_blank">公式サイト</a></p>
      <img src={hotel.hotelImageUrl} alt={hotel.hotelName} width="300" />
    </div>
  );
}
