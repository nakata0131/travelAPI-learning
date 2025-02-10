"use client";
import { useState, useEffect } from "react";

const applicationId = "1099156325921818167"; // 楽天APIのアプリIDを入れる

const HotelList = ({ areaCode }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!areaCode) return; // エリアが未選択なら処理しない
    setLoading(true);
    setError("");

    const fetchHotels = async () => {
      try {
        console.log("Fetching hotels for areaCode:", areaCode);
    
        // 必要なパラメータを追加
        const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?format=json&applicationId=${applicationId}&largeClassCode=13&middleClassCode=${areaCode}&page=1&hits=10`;
        
        console.log("Fetching URL:", url); // 確認用ログ
    
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data); // 確認用ログ
    
        if (data.error) {
          console.error("API Error:", data.error);
          setError(`APIエラー: ${data.error_description || "不明なエラー"}`);
        } else if (data.hotels) {
          setHotels(data.hotels);
        } else {
          setError("ホテル情報が見つかりませんでした。");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    

    fetchHotels();
  }, [areaCode]); // areaCodeが変わるたびにデータ取得

  return (
    <div>
      <h2>宿泊施設一覧</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? <p>ロード中...</p> : (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index}>{hotel.hotel[0].hotelBasicInfo.hotelName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelList;
