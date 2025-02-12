export default function HotelList({ hotels }) {
  return (
    <div>
      <h2>ホテル一覧</h2>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index}>
              <h3>{hotel.hotelName}</h3>
              <p>{hotel.hotelInformationUrl}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>ホテルが見つかりませんでした。</p>
      )}
    </div>
  );
}
