// src/components/HotelList.jsx
import HotelCard from './HotelCard';

const HotelList = ({ hotels }) => {
  return (
    <div>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.hotelBasicInfo.hotelNo} hotel={hotel.hotelBasicInfo} />
      ))}
    </div>
  );
};

export default HotelList;
