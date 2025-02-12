import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const HotelDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchHotel = async () => {
      try {
        const response = await fetch(
          `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=1099156325921818167&format=json&hotelNo=${id}`
        );
        const data = await response.json();

        if (data.hotels && data.hotels.length > 0) {
          setHotel(data.hotels[0].hotel[0].hotelBasicInfo);
        }
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) return <p>ホテル情報を読み込み中...</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100vh', textAlign: 'center', overflowY: 'auto' }}>
      <h2>{hotel.hotelName}</h2>
      <img src={hotel.hotelImageUrl} alt={hotel.hotelName} width="400" style={{ display: 'block', margin: '0 auto' }}/>
      <p>{hotel.address1} {hotel.address2}</p>
      <p>最寄駅: {hotel.nearestStation || "情報なし"}</p>
      <p>電話番号: {hotel.telephoneNo || "情報なし"}</p>
      <a href={hotel.hotelInformationUrl} target="_blank" rel="noopener noreferrer">
        <button>楽天トラベルでもっと詳しく！</button>
      </a>
      <br />
      <Link href="/">← ホームへ戻る</Link>
    </div>
  );
};

export default HotelDetail;
