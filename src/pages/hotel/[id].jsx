// src/pages/hotel/[id].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HotelDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URLのIDパラメータを取得
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchHotelDetail = async () => {
        try {
          const response = await axios.get(`https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?hotelNo=${id}&format=json`);
          setHotel(response.data.hotels[0]?.hotel[0]?.hotelBasicInfo);
        } catch (error) {
          console.error('ホテル詳細の取得に失敗しました', error);
        }
      };
      fetchHotelDetail();
    }
  }, [id]);

  if (!hotel) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>{hotel.hotelName}</h1>
      <img src={hotel.hotelInformationUrl} alt={hotel.hotelName} />
      <p>{hotel.hotelAddress}</p>
      <p>{hotel.hotelDescription}</p>
      {/* 他のホテル詳細情報もここに追加 */}
    </div>
  );
};

export default HotelDetail;
