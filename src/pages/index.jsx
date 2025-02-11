// pages/index.jsx
'use client';

import { useState } from "react";
import FilterForm from "../components/FilterForm";

const IndexPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHotels = async ({ area, minPrice, maxPrice }) => {
    setLoading(true);
    const url = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=1099156325921818167&format=json&middleClassCode=${area}&minCharge=${minPrice}&maxCharge=${maxPrice}`;
    const response = await fetch(url);
    const data = await response.json();
    setHotels(data.Hotels || []);
    setLoading(false);
  };

  return (
    <div>
      <h1>ホテル検索</h1>
      
      <FilterForm onSubmit={fetchHotels} />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>検索結果</h2>
          {hotels.length === 0 ? (
            <p>該当するホテルはありませんでした。</p>
          ) : (
            <ul>
              {hotels.map((hotel, index) => (
                <li key={index}>
                  <p>ホテル名: {hotel.Hotel[0].HotelBasicInfo.HotelName}</p>
                  <p>URL: <a href={hotel.Hotel[0].HotelBasicInfo.HotelInformationURL} target="_blank" rel="noopener noreferrer">詳細</a></p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default IndexPage;
