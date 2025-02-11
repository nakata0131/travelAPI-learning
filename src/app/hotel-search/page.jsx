'use client';

import { useState } from 'react';
import HotelSearch from '@/components/HotelSearch';
import HotelList from '@/components/HotelList';

export default function HotelSearchPage() {
  const [searchParams, setSearchParams] = useState(null);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ホテル検索</h1>
      {/* 検索フォーム：検索条件を入力すると searchParams が更新される */}
      <HotelSearch onSearch={setSearchParams} />

      {/* 検索結果：searchParams に値がある場合のみ表示 */}
      {searchParams ? (
        <HotelList searchParams={searchParams} />
      ) : (
        <p className="text-gray-500">検索条件を入力してください</p>
      )}
    </main>
  );
}
