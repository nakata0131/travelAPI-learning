import { useState, useEffect } from 'react';

export default function Form({ onSearch }) {
  const [areaData, setAreaData] = useState({});
  const [prefecture, setPrefecture] = useState('');
  const [smallClass, setSmallClass] = useState('');

  useEffect(() => {
    // areaData.json を fetch で取得
    fetch('/areaData.json')
      .then((res) => res.json())
      .then((data) => setAreaData(data))
      .catch((err) => console.error('エリアデータの取得に失敗:', err));
  }, []);

  const handlePrefectureChange = (event) => {
    setPrefecture(event.target.value);
    setSmallClass(''); // 県が変わったら小分類をリセット
  };

  const handleSmallClassChange = (event) => {
    setSmallClass(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!prefecture || !smallClass) {
      alert('都道府県と小分類を選択してください');
      return;
    }
    const selectedPrefectureData = areaData[prefecture];
    const middleClassCode = selectedPrefectureData?.code;
    const smallClassCode = selectedPrefectureData?.smallClasses.find(sc => sc.smallClassName === smallClass)?.smallClassCode;
    
    if (!middleClassCode || !smallClassCode) {
      alert('選択されたエリアのコードが取得できませんでした');
      return;
    }

    onSearch(middleClassCode, smallClassCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prefecture">都道府県：</label>
      <select id="prefecture" value={prefecture} onChange={handlePrefectureChange}>
        <option value="">選択してください</option>
        {Object.keys(areaData).map((pref) => (
          <option key={pref} value={pref}>
            {pref}
          </option>
        ))}
      </select>

      <label htmlFor="smallClass">小分類：</label>
      <select id="smallClass" value={smallClass} onChange={handleSmallClassChange} disabled={!prefecture}>
        <option value="">選択してください</option>
        {areaData[prefecture]?.smallClasses.map((sc) => (
          <option key={sc.smallClassCode} value={sc.smallClassName}>
            {sc.smallClassName}
          </option>
        ))}
      </select>

      <button type="submit">検索</button>
    </form>
  );
}
