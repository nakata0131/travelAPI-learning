import { useState, useEffect } from "react";

const applicationId = "YOUR_APPLICATION_ID"; // ここに楽天APIのアプリIDを入れる

const HotelList = ({ areaCode }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!areaCode) return; // エリアコードがない場合は処理しない
    setLoading(true);
    setError("");

    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20131024?applicationId=${applicationId}&largeClassCode=${areaCode}`
        );
        const data = await response.json();

        if (data.hotels) {
          setHotels(data.hotels);
        } else {
          setError("ホテル情報が見つかりませんでした。");
        }
      } catch (err) {
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [areaCode]); // areaCodeが変わったら実行

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
