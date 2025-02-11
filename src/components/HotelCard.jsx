// src/components/HotelCard.jsx
import Link from 'next/link';

const HotelCard = ({ hotel }) => {
  return (
    <div>
      <h2>{hotel.hotelName}</h2>
      <img src={hotel.hotelInformationUrl} alt={hotel.hotelName} />
      <Link href={`/hotel/${hotel.hotelNo}`}>
        <a>詳細を見る</a>
      </Link>
    </div>
  );
};

export default HotelCard;
