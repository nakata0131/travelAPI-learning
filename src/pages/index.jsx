'use client';

import { useState, useEffect } from "react";
import FilterForm from "../components/FilterForm";

const IndexPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [areaData, setAreaData] = useState({});

  const fetchAreaCode = async (prefecture, city) => {
    try {
      const response = await fetch('/areaData.json'); // ローカル or APIからデータ取得
      const areaData = await response.json();
  
      console.log("取得したエリアデータ:", areaData); // 確認
  
      if (!(prefecture in areaData)) {
        console.error("該当する都道府県が見つかりません:", prefecture);
        return null;
      }
  
      // 都道府県のローマ字コード取得
      const middleClassCode = areaData[prefecture].code;
  
      // 市町村のローマ字コード取得（指定なしなら都道府県コードのみ）
      let smallClassCode = null;
      if (city && areaData[prefecture].cities[city]) {
        smallClassCode = areaData[prefecture].cities[city];
      }
  
      return { middleClassCode, smallClassCode };
    } catch (error) {
      console.error("エリアコード取得エラー:", error);
      return null;
    }
  };
  
  

  // JSONファイルをフェッチしてデータを取得する関数
  const fetchAreaData = async () => {
    const response = await fetch('/areaData.json') // パスを修正して正しい場所にファイルを配置
    const data = await response.json();
    setAreaData(data); // データをstateにセット
  };

  useEffect(() => {
    fetchAreaData();
  }, []);

  const fetchHotels = async (prefecture, city) => {
    try {
      const areaCodes = await fetchAreaCode(prefecture, city);
      if (!areaCodes) return;
  
      const { middleClassCode, smallClassCode } = areaCodes;
      const apiUrl = `https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=1099156325921818167&format=json&largeClassCode=japan&middleClassCode=${middleClassCode}${smallClassCode ? `&smallClassCode=${smallClassCode}` : ''}`;
  
      console.log("リクエストURL:", apiUrl); // 確認用
  
      const response = await fetch(apiUrl);
      const hotelData = await response.json();
  
      console.log("取得したホテル情報:", hotelData);
      return hotelData;
// 取得したデータを `setHotels` に保存（抜けていた）
setHotels(hotelData.hotels || []);

    } catch (error) {
      console.error("ホテル情報の取得に失敗:", error);
      return null;
    }
  };
  

  

  return (
    <div>
      <h1>ホテル検索</h1>

      <FilterForm 
        areaData={areaData} // areaDataをFilterFormに渡す
        onSubmit={fetchHotels} 
      />

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
