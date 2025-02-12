import Link from "next/link";

export default function HotelList({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return <p>ホテル情報が見つかりませんでした。</p>;
  }

  return (
    <ul>
      {hotels.map((hotelItem, index) => {
        const hotelInfo = hotelItem.hotel[0].hotelBasicInfo;

        return (
          <li key={index} style={{ marginBottom: "20px" }}>
            <h3>{hotelInfo.hotelName}</h3>
            <img src={hotelInfo.hotelImageUrl} alt={hotelInfo.hotelName} width="200" />
            <p>{hotelInfo.address1} {hotelInfo.address2}</p>
            <Link href={`/hotel/${hotelInfo.hotelNo}`}>
              <button>詳細を見る</button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
