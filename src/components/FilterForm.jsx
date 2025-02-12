// 'use client';

// import { useState } from "react";

// const FilterForm = ({ onSubmit, areaData }) => {
//   const [prefecture, setPrefecture] = useState("");
//   const [city, setCity] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(prefecture, city, minPrice, maxPrice); // 親コンポーネントに送信
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>都道府県:</label>
//         <select onChange={(e) => setPrefecture(e.target.value)} value={prefecture}>
//           <option value="">選択してください</option>
//           {Object.keys(areaData).map((pref, index) => (
//             <option key={index} value={areaData[pref].code}>
//               {pref}
//             </option>
//           ))}
//         </select>
//       </div>

//       {prefecture && (
//         <div>
//           <label>市区町村:</label>
//           <select onChange={(e) => setCity(e.target.value)} value={city}>
//             <option value="">選択してください</option>
//             {areaData[prefecture] &&
//               areaData[prefecture].smallClasses.map((city, index) => (
//                 <option key={index} value={city.smallClassCode}>
//                   {city.smallClassName}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}

//       <div>
//         <label>最小価格:</label>
//         <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
//       </div>

//       <div>
//         <label>最大価格:</label>
//         <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
//       </div>

//       <button type="submit">検索</button>
//     </form>
//   );
// };

// export default FilterForm;
